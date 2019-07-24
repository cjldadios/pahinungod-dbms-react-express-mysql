import React, { Component }  from 'react';

import Navbar from './../Navigations/Navbar';
import Sidebar from './../Navigations/Sidebar';
import ActivityForm from './ActivityForm';

class ManageActivities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      
      displayViewActivities: false, // this should be the default true
      displayAddParticipants: false,
      displayEditActivity: false,
      displayAddActivity: true,

      activityCount: 0,
      activityArray: [],
    };

    this.getAllActivities = this.getAllActivities.bind(this);
    this.handleViewActivities = this.handleViewActivities.bind(this);
    this.handleAddActivity = this.handleAddActivity.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/login'); // redirect to home/login page if not logged
    }
    // if user is not logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/user/' + this.props.username) // redirect to user home page if not admin
    }
    localStorage.setItem("asAdmin", true);

    // get all activities and set the state
    this.getAllActivities();
  }

  getAllActivities = async e => {
    const response = await fetch('/get-all-activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'getting all the activities'
      })
    });
    const body = await response.text();
    this.setState({ activityArray: JSON.parse(body) });
    this.setState({ activityCount: Object.keys(this.state.activityArray).length }) ;
  }

  handleViewActivities() { // toggles to display a table of activities
    this.setState({ displayViewActivities: true });
    this.setState({ displayAddParticipants: false });
    this.setState({ displayEditActivity: false });
    this.setState({ displayAddActivity: false });
  }

  handleAddActivity() {
    this.setState({ displayViewActivities: false });
    this.setState({ displayAddParticipants: false });
    this.setState({ displayEditActivity: false });
    this.setState({ displayAddActivity: true });
  }
  
  render() {
    
    return (
      <div> {
        // check if the account is an admin, show a message that redirects back to user page
        !localStorage.getItem('isAdmin') === true ? (
          <div>
            <p>Not an administrator. <a href="/user/activity">Go back</a></p>
          </div>
        ): 
        ( // this is the content of the actual admin page
          <div>
            <Navbar history={this.props.history}/>

            {/* this is how to include the sidebar */}
            <div className="ui grid">

              {/* This is the side menu, integrated as a three wide column on the left */}
              <div className="three wide column">
                <Sidebar {...this.props} asAdmin={true} showManageActivities={true} /> {/** this is the side bar */}
              </div>
              

              <div className="eleven wide column">
                <div className="center aligned two column row">{/** this is  a space between the center and the navbar */}</div>
                
                {/* this is the middle segment div */}
                  <div className="ui segment">
                  
                  { // conditional rendering
                    this.state.displayViewActivities ?
                    (
                      <div>
                        <div className="ui center aligned two row">
                          <div className="column">
                            <h3>Manage Activities Page</h3>
                          </div>
                        </div>

                        <div className="ui center aligned two row">
                          <div className="ui secondary  menu">
                            <div className="ui item">
                              <strong>View:</strong>
                            </div>
                            <a className="active item">
                              All
                            </a>
                            <a className="item">
                              
                            </a>
                            <a className="item">
                              
                            </a>
                            <div className="right menu">
                              <div>
                                <div className="ui item">Total: {this.state.activityCount }</div>
                              </div>
                              <div className="item">
                                <div className="ui icon input">
                                  <input type="text" placeholder="Search..."/>
                                  <i className="search link icon"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="column">
                          <table className="ui celled table">
                            <thead>
                              <tr>
                                <th>Activity ID</th>
                                <th>Name</th> 
                                <th>Start Date</th>
                                <th>Participants</th>
                                <th>Coordinator-in-charge</th>
                                <th>
                                <button className="ui teal button" onClick={this.handleAddActivity}>Add New Activity</button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.activityArray.map(activity => 
                                  <tr key={activity.activityId}>
                                    <td>{activity.activityId}</td>
                                    <td>{activity.activityname}</td>
                                    <td>{activity.startdate}</td>
                                    <td>{activity.participants}</td>
                                    <td>{activity.coordinatorincharge}</td>
                                    <td>
                                      <strong>Edit: </strong><br/>
                                      <button value={activity.activityId} onClick={this.handleEditUser} >Details</button>
                                      <button value={activity.activityId} onClick={this.handleEditUser} >Volunteers</button>
                                    </td>
                                  </tr>
                                ) 
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      // else if
                      this.state.displayEditActivity ?
                      (
                        <div>
                          <br/>
                          {/* <ManageProfile userid={this.state.tempUserIdForFetching}  heading="Editing Volunteer Profile"  */}
                          />
                        </div>
                      ) : (
                        this.state.displayAddActivity ? (
                          // here rendered is a create activity form
                          <div>
                            <ActivityForm />
                          </div>
                        ) : (
                          <div>
                            <p>Oops. Something's wrong. Go to user <a href="/user/activity">home</a>?</p>
                          </div>
                        )
                      )
                    )
                  }

                </div>
              </div>

              {/* This is the sticky (or fixed) right side options  containing optional option buttons, integrated as a two wide column on the left */}
              { // show only when this component's home view is not hidden
                !this.state.displayViewActivities ? (
                  <div className="two wide column">
                    <div className="">
                      <br></br>
                      <button onClick={this.handleViewActivities} className="ui negative button">Back</button>
                    </div>
                  </div> 
                ) : (null)
              }
              
              
            </div>          
          </div>
        )
      }</div>
    );
  }
}

export default ManageActivities;
