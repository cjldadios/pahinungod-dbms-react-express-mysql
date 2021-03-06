import React, { Component }  from 'react';

// The Login component is imported from Login.js in ../Login directory
// import Login from './../Login/Login'

import Navbar from './../Navigations/Navbar'
import Sidebar from './../Navigations/Sidebar';

import ManageVolunteers from './ManageVolunteers';
import ManageActivities from './ManageActivities';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: localStorage.getItem("authenticated"),
      message: localStorage.getItem("message"),

      username: localStorage.getItem("username"),

      manageVolunteersIsActive: true, // show this by default
      manageActivitiesIsActive: false,
      manageProgramsIsActive: false,
      manageAdministratorsIsActive: false,
    };
    
    this.showManageVolunteers = this.showManageVolunteers.bind(this);
    this.showManageActivities = this.showManageActivities.bind(this);
    this.showManagePrograms = this.showManagePrograms.bind(this);
    this.showManageAdministrators = this.showManageAdministrators.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/'); // redirect to home/login page if not logged
    }

    // if user is not logged in
    if(!localStorage.getItem('authenticated')) {
      this.props.history.push('/user/' + this.props.username) // redirect to user home page if not admin
    }
  }

  showManageVolunteers (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: true});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-volunteers');
  }
  showManageActivities (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: true});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-activities');
  }
  showManagePrograms (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: true});
    this.setState({ manageAdministratorsIsActive: false});
    // this.props.history.push('/manage-programs');
  }
  showManageAdministrators (e) {
    // this.setState({ profileIsActive: false});
    // this.setState({ activityIsActive: false});
    this.setState({ manageVolunteersIsActive: false});
    this.setState({ manageActivitiesIsActive: false});
    this.setState({ manageProgramsIsActive: false});
    this.setState({ manageAdministratorsIsActive: true});
    // this.props.history.push('/manage-administrators');
  }
  
  render() {
    
    return (
      <div> {
        // check if the account is an admin, show a message that redirects back to user page
        !localStorage.getItem('isAdmin') === true ? (
        <div>
          <p>Not an administrator. <a href="/user">Go back</a></p>
        </div>
        ): 
        ( // this is the content of the actual admin page
        <div>
          <Navbar {...this.props} asAdmin={true} isAdmin={true}/>
          {/* this is how to include the sidebar */}
          <div className="ui grid">
            <div className="three wide column">
              <Sidebar {...this.props} asAdmin={true}
                showManageVolunteers={this.showManageVolunteers}
                showManageActivities={this.showManageActivities}
                showManagePrograms={this.showManagePrograms}
                showManageAdministrators={this.showManageAdministrators}
                
                manageVolunteersIsActive={true}
                manageActivitiesIsActive={true}
                manageProgramsIsActive={true}
                manageAdministratorsIsActive={true}
              />
               {/** this is the side bar */}
            </div>
            <div className="eleven wide column">    {/** this is where the ADMIN Page contents should be declared */}
              {/* <h2>Admin homepage</h2> */}

              {/** main page content */}

              <div className="center aligned two column row">
                { // Render whichever component is clicked
                  this.state.manageVolunteersIsActive === true ? (
                    <div>
                      <ManageVolunteers {...this.props} showManageVolunteers={this.showManageVolunteers}/> 
                    </div>
                  ) : ( 
                    this.state.manageActivitiesIsActive === true ? (
                      <div>
                        <ManageActivities {...this.props} showManageActivities={this.showManageActivities}/>
                      </div>
                    ) : ( // Else show this page with a simple heading
                      <div>
                        <h2>User homepagei</h2>
                      </div>
                    )
                  )
                }
              </div>
            </div>
          </div>
        </div>
        )
      }</div>
    );
  }
}

export default Admin;