import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./myvehical.css";
import dolar from "../../assets/dollar-coin-vector-1953442.png";
import car from "../../assets/car img.png";
import calender from "../../assets/calender.png";
import modification from "../../assets/modification.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import orangecar from "../../assets/istockphoto-186578902-612x612.jpg";
import carengine from "../../assets/car_engine.png";
import Constance from "../constants/Constance";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const My_vehicles = () => {
  const navigate = useNavigate();
  const [array, setarray] = useState([1]);
  console.log("arr",array);
  const user_id = localStorage.getItem("user_id")


  const Vehiclelisting = () =>{
      let dataObj = {}
      dataObj['user_id']=user_id

      const data = JSON.stringify(dataObj)
      fetch(Constance.baseUrl + 'vehicles/my_vehicle_listing', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
        },
        body : data
    }).then(response => {
  
        response.json().then(json => {
            console.log("res", json);
            if (json.success === "yes") {
              setarray(json.data) 
            } else {
                NotificationManager.error('Error', (json.message), 3000);
            }
        });
    }).catch(err => err); 
  }

  useEffect(()=>{
    // Vehiclelisting()
  },[])

  return (
    <>
          <div>
            <div className="upperheadermyvehicles">
              <div onClick={() => navigate(-1)} className="backbtn">
                <IoIosArrowBack />
                Back
              </div>
              <div className="myvehiclesheader">My Vehicles</div>
              <div className="addveclebtn" onClick={()=>{window.location.href="./"}}>
                Add Vehicle
              </div>
            </div>
          </div>
      {array.length ? (
        <>
          <div className="vehiclecont">
            <div className="basicpackage">
              <img src={carengine} className="logoimgss" />
              <h4>BASIC PACKAGE</h4>
            </div>
            <div style={{ display: "flex" }}>
              <div className="cont-1">
                <h2 className="modelname">TestTiya</h2>
                <div className="logowithtextcont">
                  <div className="logowithtext">
                    <div className="box">
                      <img src={dolar} className="logoimgs" />
                    </div>
                    <div className="box">AED 666/Month</div>
                  </div>
                  <div className="logowithtext">
                    <div className="box">
                      <img src={car} className="logoimgs" />
                    </div>
                    <div className="box">1 OF 1 Cars</div>
                  </div>
                </div>
                <div className="logowithtextcont">
                  <div className="logowithtext">
                    <div className="box">
                      <img src={calender} className="logoimgs" />
                    </div>
                    <div className="box">60 Days Left</div>
                  </div>
                  <div className="logowithtext">
                    <div className="box">
                      <img src={modification} className="logoimgs" />
                    </div>
                    <div className="box">Awaiting Moderation</div>
                  </div>
                  <div></div>
                </div>
                <div className="logowithtextcontdown">
                  <div className="crud-1">
                    <img src={edit} className="logoimgs" />
                  </div>
                  <div className="crud-1">
                    <img src={deleted} className="logoimgs" />
                  </div>
                  <div className="crud-2">List For Sale</div>
                </div>
              </div>
              <div className="cont-2">
                <img src={orangecar} className="vehicleimg" />
                <div className="featured">Featured</div>
              </div>
            </div>
           <NotificationContainer />
          </div>
        </>
     
      ) : (
        <div className="addvehicle" onClick={()=>{window.location.href="/subscriptionplan"}}><h2>Add Vehicle</h2></div>
      )}
    </>
  );
};

export default My_vehicles;