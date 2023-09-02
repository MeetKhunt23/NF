/*global google*/
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Button from "react-bootstrap/Button";
import Header from "../blocks/Header"
import Home_map from "../account/Home_map";

const GoogleMaps = (props) => {

  const user_id = localStorage.getItem("user_id")

  const [userdetail, setUserdetail] = useState({});

  const getuserdetails = async () => {
    var obj = {};
    obj["user_id"] = "158";
    var data = JSON.stringify(obj);

    fetch("http://192.168.1.100/nearfold_test/app/authentication/userDetails", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        response.json().then((res) => {
          console.log("res", res);
          if (res.success === "yes") {
            setUserdetail(res.data);
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

  useEffect(() => {
    getuserdetails();
  }, []);

 
  useEffect(()=>{
     if(!user_id){
       window.location.href = "/login"
     }
  },[])


  return(
      <>
      <Header/>
      <div style={{ height: "80vh", width: "90%",margin:"auto" }}>
        <div style={{ height: "100%", width: "100%" }}>
        <Home_map
        lat={22.2894694}
        lng={70.7730229}
        height="700px"
        width="100%"
        zoom={100}
        upprsection={{ display: "none" }}
        profile_pic={userdetail.profile_picture}
        markerlat={userdetail.latitude}
        markerlng={userdetail.longitude}
      />
        </div>
      </div>
      </>
  )
};

export default GoogleMaps;
