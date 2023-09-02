import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from "../blocks/Header";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './company.css'
import location from "../../assets/prefered-location.png"
import roket from "../../assets/rocket.png"
import electric from "../../assets/electric_refueling.png"
import battery from "../../assets/battery_charging.png"
import meter from "../../assets/speedometer.png"

const Companydetails = () =>{
    return(
        <>
        <Header/>
        <div className="body" style={{display:"flex",alignItems : "center",justifyContent : "center"}}>
        <div class="mainmodel">
          <div class="title">Company Details & Subscription</div>
          <form action="#" id="emailform" >
            <div className="yearbrandselect">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="cars">Company Name</label><br />
                <input type="text" id="reminder-password" className="selectbrand" name="companyname" />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <label for="brand">Company Number</label><br />
                <input type="text" id="reminder-password" className="selectbrand" name="companynumber" />
              </div>
            </div>
            <div className="modelprice my-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
              <div className="mapselect">
                <div className="select">
                    <span>Select</span>
                </div>
                 <img src={location} className="locationimg"/>&nbsp;&nbsp;
                 <span className="text">Select Permanent & Fixed Location on Map</span>
                 <div>
                 {/* <input type="radio" id="vehicle1" name="vehicle1" value="Bike" /> */}
                 </div>
              </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
               <div className="mapselect">
               <div className="select">
                    <span>Select</span>
                </div>
                 <img src={location} className="locationimg"/>&nbsp;&nbsp;
                 <span className="text">Select location using move this marker</span>
               </div>
              </div>
            </div>
            <div style={{textAlign:"center"}}>
                <span style={{fontSize:"20px"}}>Select Your Package</span>
                </div>
                <div>
                <div className="row" style={{display : "flex",justifyContent : "center"}}>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="package">
               
                    <div style={{marginTop : "11px"}}>
                     <img src={roket} style={{height : "50px",marginLeft:"50px"}}/><br/>
                     <span style={{color : "black"}}>TURBO PACKAGE</span>
                     </div>
                     <div >
                     <span style={{color: "white",fontWeight : 'bold'}}>12 Months</span><br/>
                     <span style={{color: "white",fontWeight : 'bold'}}>UNLIMITED CARS</span>
                     </div>
                     <div>
                        <span style={{color: "white",fontWeight : 'bold'}}>AED 700/MONTH</span>
                     </div>
             
            </div>
            </div>
            <div className="col-lg-6">
            <div className="package2">
               
                    <div style={{marginTop : "11px"}}>
                     <img src={electric} style={{height : "50px",marginLeft:"50px"}}/><br/>
                     <span style={{color : "black"}}>DELUXE PACKAGE</span>
                     </div>
                     <div >
                     <span style={{color: "white",fontWeight : 'bold'}}>6 Months</span><br/>
                     <span style={{color: "white",fontWeight : 'bold'}}>47 CARS</span>
                     </div>
                     <div>
                        <span style={{color: "white",fontWeight : 'bold'}}>AED 470/MONTH</span>
                     </div>
              
            </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className="package3">
                
                    <div style={{marginTop : "11px"}}>
                     <img src={meter} style={{height : "50px",marginLeft:"50px"}}/><br/>
                     <span style={{color : "black"}}>EXECUTIVE PACKAGE</span>
                     </div>
                     <div>
                     <span style={{color: "white",fontWeight : 'bold'}}>3 Months</span><br/>
                     <span style={{color: "white",fontWeight : 'bold'}}>34 CARS</span>
                     </div>
                     <div>
                        <span style={{color: "white",fontWeight : 'bold'}}>AED 340/MONTH</span>
                     </div>
                </div>
            </div>
            <div className="col-lg-6">
            <div className="package4">
              
                    <div style={{marginTop : "11px"}}>
                     <img src={battery} style={{height : "50px",marginLeft:"50px"}}/><br/>
                     <span style={{color : "black"}}>ESSENTIAL PACKAGE</span>
                     </div>
                     <div>
                     <span style={{color: "white",fontWeight : 'bold'}}>1 Month</span><br/>
                     <span style={{color: "white",fontWeight : 'bold'}}>17 CARS</span>
                     </div>
                     <div>
                        <span style={{color: "white",fontWeight : 'bold'}}>AED 170/MONTH</span>
                     </div>
                </div>
           </div>
            </div>
            </div>
            <div style={{textAlign : "center"}}>
                <button className="subbutn">Subscribe as a Dealer</button>
            </div>
          </form>

        </div>
        <NotificationContainer />
      </div>

        </>
    )
}

export default Companydetails