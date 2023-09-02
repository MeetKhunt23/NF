import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
// import "./header2.css"
import logo from "../../assets/logo.png"

import $ from "jquery"
import "../../style.css"



const Header2 = () =>{
  $('.header-menu a[href="#"]').on('click', function(event) {
    event.preventDefault();
});



var mainHeader = $('.main-header');

if($(window).scrollTop() > 100) $('.main-header').addClass('sticky fadeInDown')
$(window).on('scroll', function(e){
    if($(this).scrollTop() < 100){
        $('.main-header').removeClass('sticky fadeInDown')
    }else
        $('.main-header').addClass('sticky fadeInDown')        
    });
    return(
        <>
        <div className="header">
          <div className="main-header inner-header">
            <div className="main-menu-wrap">
               <div className="container">
                   <div className="row align-items-center">
                      <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <div className="logo">
                          <a href="/features">
                            <img src={logo} data-rjs = "2" alt="nearfold"/>
                          </a>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
                        <div className="menu--inner-area clearfix">
                          <div className="menu-wraper">
                            <nav>
                              <div className="header-menu dosis">
                                <div id="menu-button">
                                  <i className="fa fa-bars"></i>
                                </div>
                                <ul>
                                  <li>
                                    <a href="/features">Home</a>
                                  </li>
                                  <li className="has-sub-item">
                                    <span class="submenu-button"></span>
                                    <a href="#">App</a>
                                    <ul>
                                      <li>
                                        <a href="/features">Features</a>
                                      </li>
                                      <li>
                                        <a href="/features">App Screens</a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="has-sub-item">
                                     <span class="submenu-button"></span>
                                     <a href="#">Company</a>
                                     <ul>
                                      <li>
                                        <a href="/aboutus">About Us</a>
                                      </li>
                                      <li>
                                        <a href="/tearmsandcondition">Terms of use</a>
                                      </li>
                                      <li>
                                        <a href="/privacypoliciy">Privacy Policy</a>
                                      </li>
                                     </ul>
                                  </li>
                                  <li className="has-sub-item">
                                    <span className="submenu-button"></span>
                                    <a href="#">Support</a>
                                    <ul>
                                      <li>
                                        <a href="#">Help</a>
                                      </li>
                                      <li>
                                        <a href="/contactus">Contact Us</a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="has-sub-item">
                                  <span className="submenu-button"></span>
                                    <a href="#">Languages</a>
                                    <ul>
                                      <li>
                                        <a href="#">English</a>
                                      </li>
                                      <li>
                                        <a href="#">العربية</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>
                   </div>
               </div>
            </div>
          </div>
        </div>
         {/* <div className="mainheader">
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
    <div className="logout">Logout</div>
    </div> */}
        </>
    )
}
export default Header2