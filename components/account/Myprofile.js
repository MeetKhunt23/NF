import React, { useEffect, useState } from "react";
// import "./profile.css";
import "./myprofile.css";
import axios from "axios";
import vehicle from "../../assets/Capture.PNG";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Myprofile = () => {
  const [userdetail, setUserdetail] = useState({});
  const navigate = useNavigate();

  const getuserdetails = async () => {
    var user_id=localStorage.getItem("user_id")
    var obj = {};
    obj["user_id"] = user_id;
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "10%",
            color: "#42c366",
            cursor: "pointer",
            border: "none",
            marginLeft: "20px",
            position: "relative",
            top: "80px",
            fontSize: "30px",
          }}
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack /> Back
        </div>
        <div className="eidtprofileheader">My Profile</div>
      </div>
      <div>
        <img src={userdetail.profile_picture} className="myprofilepic"/>
        <h2 style={{ marginTop: "30px",marginLeft:"28%" }}>Heyy {userdetail.full_name}...Have a Great day..!!</h2>
        <div className="detail-con">
          <div className="cont-1 con">
            <h3>{userdetail.city}</h3>
            <div>Location</div>
          </div>
          <div className="cont-22 con">
            <h3>{userdetail.total_vehicles}</h3>
            <div>Products</div>
          </div>
          <div className="cont-3 con" style={{ border: "none" }}>
            <h3>{userdetail.last_online}</h3>
            <div>Last seen</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
