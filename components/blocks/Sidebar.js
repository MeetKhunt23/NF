import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const isLogin = localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : "false"
const admin_user_id = localStorage.getItem('admin_user_id')?localStorage.getItem('admin_user_id'):"0"

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        
    }

    componentWillMount() {
        
    }

    render() {
        return (
              <div>
               
              </div>
        );
    }
}

export default Sidebar