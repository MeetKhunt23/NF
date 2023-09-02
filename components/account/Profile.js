import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./profile.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { AiFillEdit, AiFillBackward } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";

const Edit_profile = () => {
  const [userdetail, setUserdetail] = useState({});
  console.log("userdetail", userdetail);
  const navigate = useNavigate();
  const [name, setname] = useState("");
  console.log("name", name);

  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  console.log("email", email);
  console.log("city", city);
  const [current_img, setcurrent_img] = useState("");
  const [new_img, setnew_img] = useState("");
  console.log("new_img", new_img);

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

  const updateProfile = async () => {
    const formdata = new FormData();
    var user_id=localStorage.getItem("user_id")
    formdata.append("user_id", user_id);
    formdata.append("full_name", name ? name : userdetail.full_name);
    formdata.append("email_phone", email ? email : userdetail.email);
    formdata.append("type", "2");
    formdata.append("current_image", userdetail.profile_picture);
    formdata.append(
      "profile_picture",
      new_img ? new_img : userdetail.profile_picture
    );
    formdata.append("Country_code", "91");
    formdata.append("city", city ? city : userdetail.city);
    let dataObj = {};
    for (const [key, value] of formdata.entries()) {
      dataObj[key] = value;
    }

    const data = JSON.stringify(dataObj);

    fetch(
      "http://192.168.1.100/nearfold_test/app/authentication/updateProfile",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
        body: formdata,
      }
    )
      .then(NotificationManager.success("success"))
      .then(()=>getuserdetails())
      .catch((err) => err);
  };

  useEffect(() => {
    getuserdetails();
  }, []);
  return (
    <div>
      <div style={{ display: "flex",justifyContent:"center" }}>
     
        <div className="eidtprofileheader">Edit Profile</div>
      </div>
      <div className="profileimg">
        <div>
          <img src={userdetail.profile_picture} className="profileimage" />
          <div style={{ borderTop: "2px solid #d76258",display:"flex",alignItems : "center",justifyContent : "center"}}>
            <label for="file">
              <i class="ion-images">
                <AiFillEdit style={{ fontSize: "35px" }} />
              </i>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="image"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                multiple=""
                data-original-title="upload photos"
                onChange={(e) => {
                  setnew_img(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="editprofile">
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
          }}
        >
          <div className="fieldname">Name</div>
          <Form.Control
            size="lg"
            name="admin_id"
            type="text"
            id="admin_id"
            className="input-field"
            placeholder="John"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <span id="admin_id_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <div className="fieldname">Email</div>
          <Form.Control
            size="lg"
            name="admin_id"
            type="text"
            id="admin_id"
            className="input-field"
            placeholder="abc@gmail.com"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <span id="admin_id_error" className="text-danger"></span>
        </span>
        <span
          style={{
            width: "70%",
            fontSize: "16px",
            marginLeft: "15%",
            marginBottom: "15px",
          }}
        >
          <div className="fieldname">City</div>
          <Form.Control
            size="lg"
            name="admin_id"
            type="text"
            id="admin_id"
            //   onKeyDown={() => {
            //     hidemsg("admin_id_error");
            //   }}
            className="input-field"
            placeholder="Rajkot"
            onChange={(e) => {
              setcity(e.target.value);
            }}
          />
          <span id="admin_id_error" className="text-danger"></span>
        </span>
        <div style={{display : "flex",alignItems : "center",justifyContent : "center"}}>
        <Button
          className="updateprofile"
          onClick={() => {
            updateProfile();
          }}
        >
          Update
        </Button>
        </div>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default Edit_profile;