import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./header.css"
import Constance from "../constants/Constance";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const Header = (props) => {
  const user_id = localStorage.getItem("user_id")

  const handleLogout = (e) =>{
    e.preventDefault()
       let dataObj = {};
      dataObj["user_id"] = user_id;
  
    const data = JSON.stringify(dataObj);
    
    var url = Constance.baseUrl + "authentication/logout";
   
    fetch(url,{
        method: 'POST',
        mode : "cors",
        headers:{
            'Accept': 'application/json',
        },
        body: data,
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                
                if (json.success === 'yes') {
                    NotificationManager.success('Success', json.message, 3000);
                    localStorage.removeItem("user_id")
                    localStorage.removeItem("full_name")
                    localStorage.setItem("is_loggedin","false")
                    window.location.href = "/login"
                    
                } else {
                    NotificationManager.error('Error', json.message, 3000);
                }
            });
        }else{
            
            NotificationManager.error('Error', 'Somthing happened wrong.', 3000);
        }
 
}).catch(err => err);
    }

    const handleDeleteAccount = (e) =>{
      e.preventDefault()
         let dataObj = {};
        dataObj["user_id"] = user_id;
    
      const data = JSON.stringify(dataObj);
      
      var url = Constance.baseUrl + "authentication/delete_account";
     
      fetch(url,{
          method: 'POST',
          mode : "cors",
          headers:{
              'Accept': 'application/json',
          },
          body: data,
      }).then(response => {
          if (response.ok) {
              response.json().then(json => {
                  
                  if (json.success === 'yes') {
                      NotificationManager.success('Success', json.message, 3000);
                      localStorage.removeItem("user_id")
                      localStorage.removeItem("full_name")
                      localStorage.removeItem("is_loggedin")
                      window.location.href = "/"
                      
                  } else {
                      NotificationManager.error('Error', json.message, 3000);
                  }
              });
          }else{
              
              NotificationManager.error('Error', 'Somthing happened wrong.', 3000);
          }
   
  }).catch(err => err);
      }
  return (
    <>
    {
      (window.location.pathname == "/tearmsandcondition") ?
      <>
    <div className="mainheader">
    <div className="haederdiv">
    <div className="headers">Home</div>

      <div className="headers">
        <NavDropdown title="App" id="basic-nav-dropdown" className="navop">
          <NavDropdown.Item href="/features">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
             Features
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
             App Screens
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
        </NavDropdown>
      </div>
      <div className="headers">
        <NavDropdown title="Company" id="basic-nav-dropdown" className="navop">
          <NavDropdown.Item href="/Edit_ptofile">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
             About Us
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
            Terms of use
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
           Privacy Policy
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
        </NavDropdown>
      </div>
      <div className="headers">
        <NavDropdown title="Support" id="basic-nav-dropdown" className="navop">
          <NavDropdown.Item href="/Edit_ptofile">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
             Help
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
           Contact Us
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
        </NavDropdown>
      </div>
      <div className="headers">
        <NavDropdown title="Languages" id="basic-nav-dropdown" className="navop">
          <NavDropdown.Item href="/Edit_ptofile">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
             English
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
           Gujarati
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
        </NavDropdown>
      </div>
      
    </div>
    <div className="logout" >Logout</div>
    </div>
</>
:
<>

    <div className="mainheader">
    <div className="haederdiv">
      <div className="headers">
        <NavDropdown title="My Profile" id="basic-nav-dropdown" className="navop">
        <NavDropdown.Item href="/myprofile">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
              My Profile
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/profile">
            {" "}
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
              Edit Profile
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Change_location">
            <Button
            className="btns"
              variant="light"
              size="lg"
            >
              Change Location
            </Button>{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="/Messages">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={() => {
                window.location.href = "/Edit_ptofile";
              }}
            >
              Messages
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/Messages">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={() => {
                window.location.href = "/Edit_ptofile";
              }}
            >
              Purchase History
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/ChangePassword">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={() => {
                window.location.href = "/ChangePassword";
              }}
            >
              Change Password
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/tearmsandcondition">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={() => {
                window.location.href = "/tearmsandcondition";
              }}
            >
              Terms & Condition
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="/contactus">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={() => {
                window.location.href = "/contactus";
              }}
            >
              Contact Us
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="./Messages">
            <Button
            className="btns"
              variant="light"
              size="lg"
              onClick={(e) => 
                handleDeleteAccount(e)}
            >
              Delete Your Account 
            </Button>
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
        </NavDropdown>
      </div>
        <div className="headers">Favourite</div>
        <div className="headers" onClick={()=>{window.location.href="/myvehical"}}>My Vehicles</div>
      
    </div>
    <div className="logout" onClick={(e)=>handleLogout(e)}>Logout</div>
    <NotificationContainer />
    </div>
      <hr />
      </>
    }
    </>
  );
};


export default Header;
