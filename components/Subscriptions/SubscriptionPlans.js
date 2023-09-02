import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import turtle from "../../assets/slow_mode.png";
import "./subscriptionplan.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import carengine from "../../assets/car_engine.png";
import race_car from "../../assets/race_car_1.png";
import Constance from "../constants/Constance";

const Subscription_plans = () => {
  const navigate = useNavigate();
  const [packages,setpackages] = useState([])


  const getPlans = () =>{

    fetch(Constance.baseUrl + 'packages/packages_listing', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
      },
  }).then(response => {

      response.json().then(json => {
          console.log("res", json);
          if (json.success === "yes") {
            setpackages(json.data) 
          } else {
              NotificationManager.error('Error', (json.message), 3000);
          }
      });
  }).catch(err => err);
  }

  useEffect(()=>{
     getPlans()
  },[])

  return (
    <div>
      <div>
        <div className="upperheader">
         
          <div className="eidtprofileheader">My Vehicles</div>
        </div>
      </div>
      <div className="vehicleaddmaindiv">
        <div className="selectplandiv">
          <div className="packagecontainer-1" onClick={()=>{window.location.href="/addvehicle/"+ packages[0]?.id + "/" + packages[0]?.price + "/" + packages[0]?.plan_type
}}>
            <div className="packageselect">Select</div>
            <div className="packagecontainer1">
              <div>
                <img src={packages[0]?.package_image} className="packageimg" />
              </div>
              <div>{packages[0]?.package_name}</div>
            </div>
            <div className="packagecontainer2">
              <div className="packagevaladity">{packages[0]?.duration} Days</div>
              <div className="packagevaladity">{packages[0]?.number_of_vehicles} CARS</div>
            </div>
            <div className="packagecontainer3">FREE</div>
          </div>
        </div>
        <div className="selectplandiv">
          <div className="packagecontainer-2" onClick={()=>{window.location.href="/addvehicle/"+ packages[1]?.id + "/" + packages[1]?.price+ "/" + packages[1]?.plan_type}}>
          <div className="packageselect">Select</div>
            <div className="packagecontainer1">
              <div>
                <img src={packages[1]?.package_image} className="packageimg" />
              </div>
              <div>{packages[1]?.package_name}</div>
            </div>
            <div className="packagecontainer2">
              <div className="packagevaladity">{packages[1]?.duration} Days</div>
              <div className="packagevaladity">UNLIMITED CARS</div>
            </div>
            <div className="packagecontainer3">AED {packages[1]?.price}/DAY</div>
          </div>
        </div>
        <div className="selectplandiv">
          <div className="packagecontainer-3" onClick={()=>{window.location.href="/addvehicle/"+ packages[2]?.id + "/" + packages[2]?.price+ "/" + packages[2]?.plan_type}}>
          <div className="packageselect">Select</div>
            <div className="packagecontainer1">
              <div>
                <img src={packages[2]?.package_image} className="packageimg" />
              </div>
              <div>{packages[2]?.package_name}</div>
            </div>
            <div className="packagecontainer2">
              <div className="packagevaladity">{packages[2]?.duration} Days</div>
              <div className="packagevaladity">UNLIMITED CARS</div>
            </div>
            <div className="packagecontainer3">AED {packages[2]?.price}/DAY</div>
          </div>
        </div>
        <div style={{textAlign : "center"}}>
        <h3 className="h3placeadd">
          Place Your ad using any of the above options <br />
          <br />
          OR
          <br />
        </h3>
        </div>
        <div className="subsasdealerdiv">
          <div className="subsasdealerbtn" onClick={()=>{window.location.href = "/companydetails"}}>Subscribe as a Dealer</div>
        </div>
      </div>
  <NotificationContainer />
    </div>
  );
};

export default Subscription_plans;