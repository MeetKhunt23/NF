import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Car_profile.css";
import dollar from "../../assets/dollar-coin-vector-1953442.png";
import calender from "../../assets/calender.png";
import car from "../../assets/istockphoto-186578902-612x612.jpg";


const Dealer_profile = () => {
  const { user_id, Lat, Lng } = useParams();
  const [userdetail, setUserdetail] = useState({});

  const getvehicledetails = async () => {
    var obj = {};
    obj["user_id"] = user_id;
    obj["latitude"] = Lat;
    obj["longitude"] = Lng;

    var data = JSON.stringify(obj);

    fetch(
      "http://192.168.1.100/nearfold_test/app/vehicles/dealer_vehicle_listing",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
        body: data,
      }
    )
      .then((response) => {
        response.json().then((res) => {
          console.log("res", res);
          if (res.success === "yes") {
            // setUserdetail(res.data);
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

  useEffect(() => {
    getvehicledetails();
  }, []);
  return (
    <div>
      <div className="dealerdetails">
        <div className="dealerdiv">
          <img src={userdetail.profile_picture} className="dealerimg" />
        </div>
        <h4>{userdetail.full_name}</h4>
        <div className="numberofcars">Total Cars : 01</div>
      </div>
      <div className="cardetails">
        <div className="dealervehiclecar_sec" onClick={()=>{window.location.href="/Car_profile/2"}}>
          <div className="dealervehiclecar_sec1">
            <div className="dealervehiclecar_sec1_sec1">
                <h4>Car Name : </h4>
                <h4>&nbsp; Ferrari</h4>
                </div>
            <div className="dealervehiclecar_sec1_sec2">
              <div>
                <img src={dollar} className="dealerpageicons" />
              </div>
              <div className="priceandyear">66688</div>
            </div>
            <div className="dealervehiclecar_sec1_sec3">
              <div>
                <img src={calender} className="dealerpageicons" />
              </div>
              <div className="priceandyear">2023</div>
            </div>
          </div>
          <div className="dealervehiclecar_sec2">
            <div>
              <img src={car} className="dealercarimg" />
            </div>
          </div>
        </div>
        <div className="dealervehiclecar_sec">
          <div className="dealervehiclecar_sec1">
            <div className="dealervehiclecar_sec1_sec1">
                <h4>Car Name : </h4>
                <h4>&nbsp; Ferrari</h4>
                </div>
            <div className="dealervehiclecar_sec1_sec2">
              <div>
                <img src={dollar} className="dealerpageicons" />
              </div>
              <div className="priceandyear">66688</div>
            </div>
            <div className="dealervehiclecar_sec1_sec3">
              <div>
                <img src={calender} className="dealerpageicons" />
              </div>
              <div className="priceandyear">2023</div>
            </div>
          </div>
          <div className="dealervehiclecar_sec2">
            <div>
              <img src={car} className="dealercarimg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dealer_profile;
