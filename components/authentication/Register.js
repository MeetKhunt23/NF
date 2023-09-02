import React, { useEffect, useState } from "react";
import "./register.css"
import $ from "jquery"
import axios from "axios";
import { Link } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import sha512 from "js-sha512"
import Constance from "../constants/Constance";

const Register = () => {
  const [fullname, setfullname] = useState("")
  const [email, setemail] = useState("")

  const [phone, setphone] = useState("")
  const [profile_picture, setprofile_picture] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpass, setconfirmpass] = useState("")
  const [fieldsup, setfieldsup] = useState({})
  const [errors, setErrors] = useState({})
  const [errorClassName, seterrorClassName] = useState({})
  const [code, setcode] = useState('')
  const [email_phone, setemail_phone] = useState('')
  console.log("email_phone", email_phone);
  const [type, settype] = useState('')
  const [country_code, setcountry_code] = useState('')
  const [device_token, setdevice_token] = useState('')
  const [device_type, setdevice_type] = useState('')
  const [device_id, setdevice_id] = useState('')
  const [redirectToReferrer, setredirectToReferrer] = useState(false)

  const user_id = localStorage.getItem("user_id")
  const Withemail = () => {
    $("#phoneform").css("display", "none");
    $("#emailform").css("display", "block");
    $("#withemail").css("background", "#d76258");
    $("#withemail").css("color", "white");
    $("#withphone").css("background", "white");
    $("#withphone").css("color", "black");
  }
  const Withphone = () => {
    $("#emailform").css("display", "none");
    $("#phoneform").css("display", "block");
    $("#withphone").css("background", "#d76258");
    $("#withphone").css("color", "white");
    $("#withemail").css("background", "white");
    $("#withemail").css("color", "black");
  }

  const hidemsg = (hide) => {
    $("#" + hide).hide();
  }

  // useEffect(() => {
  //   if (user_id) {
  //     window.location.href = "/"
  //   }
  // })

  const handleValidation = () => {
    let fields = fieldsup;
    let errors = {};
    let errorClassName = {};
    let formIsValid = true;
    var passw = /^[A-Za-z]\w{7,14}$/;

    //Name
    if ($("#reminder-name").val() == "") {
      formIsValid = false;
      errors["full_name"] = "Please enter your full name.";
      errorClassName["full_name"] = "has-error";
      $("#login-name-error").show();
    }

    //Email
    if ($("#email").val() == "") {
      formIsValid = false;
      errors["email"] = "Please enter your account's email.";
      errorClassName["email"] = "has-error";
      $("#login-email-error").show();
    }

    else if ($("#email").val() !== "undefined") {
      let lastAtPos = $("#email").val().lastIndexOf('@');
      let lastDotPos = $("#email").val().lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && $("#email").val().indexOf('@@') === -1 && lastDotPos > 2 && ($("#email").val().length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email address.";
        errorClassName["email"] = "has-error";
        $("#login-email-error").show();
      }
    }

    //Password
    if ($("#reminder-password").val() == "") {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
      errorClassName["password"] = "has-error";
      $("#login-password-error").show();
    }

    //profile_picture
    if ($("#profile_picture").val() == "") {
      formIsValid = false;
      errors["profile_picture"] = "Please select profile picture.";
      errorClassName["profile_picture"] = "has-error";
      $("#login-profile-pic-error").show();
    }

    //Confrim Password
    if ($("#reminder-confirm-password").val() == "") {
      formIsValid = false;
      errors["confirm-password"] = "Please enter your confirm password.";
      errorClassName["confirm-password"] = "has-error";
      $("#login-confirm-password-error").show();
    }
    else if ($("#reminder-confirm-password").val() !== $("#reminder-password").val()) {
      formIsValid = false;
      errors["confirm-password"] = "Passwords don't match.";
      errorClassName["confirm-password"] = "has-error";
      $("#login-confirm-password-error").show();
    }

    setErrors(errors);
    seterrorClassName(errorClassName);
    return formIsValid;
  }

  const handlephoneValidation = () => {
    let fields = fieldsup;
    let errors = {};
    let errorClassName = {};
    let formIsValid = true;
    var passw = /^[A-Za-z]\w{7,14}$/;

    //Name
    if ($("#reminder-name").val() == "") {
      formIsValid = false;
      errors["full_name"] = "Please enter your full name.";
      errorClassName["full_name"] = "has-error";
      $("#login-name-error").show();
    }

    //phone
    if ($("#phone").val() == "") {
      formIsValid = false;
      errors["phone"] = "Please enter your phone number.";
      errorClassName["phone"] = "has-error";
      $("#login-phone-error").show();
    }

    else if (typeof $("#phone").val() !== "undefined") {

      var pattern = new RegExp(/^\d*$/);
      if (!pattern.test($("#phone").val())) {
        formIsValid = false;
        errors["phone"] = "Please enter only number.";
        errorClassName["phone"] = "has-error";
        $("#login-phone-error").show();
      } else if ($("#phone").val().length != 10) {
        formIsValid = false;
        errors["phone"] = "Please enter valid phone number.";
        errorClassName["phone"] = "has-error";
        $("#login-phone-error").show();
      }
    }

    //Password
    if ($("#reminder-password").val() == "") {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
      errorClassName["password"] = "has-error";
      $("#login-password-error").show();
    }

    //profile_picture
    if ($("#profile_picture").val() == "") {
      formIsValid = false;
      errors["profile_picture"] = "Please select profile picture.";
      errorClassName["profile_picture"] = "has-error";
      $("#login-profile-pic-error").show();
    }


    //Confrim Password
    if ($("#reminder-confirm-password").val() == "") {
      formIsValid = false;
      errors["confirm-password"] = "Please enter your confirm password.";
      errorClassName["confirm-password"] = "has-error";
      $("#login-confirm-password-error").show();
    }
    else if ($("#reminder-confirm-password").val() !== $("#reminder-password").val()) {
      formIsValid = false;
      errors["confirm-password"] = "Passwords don't match.";
      errorClassName["confirm-password"] = "has-error";
      $("#login-confirm-password-error").show();
    }

    setErrors(errors);
    seterrorClassName(errorClassName);
    return formIsValid;
  }

  const codeValidation = () => {
    let fields = fieldsup;
    let errors = {};
    let errorClassName = {};
    let formIsValid = true;

    if ($("#vcode").val() == "") {
      formIsValid = false;
      errors["vcode"] = "Please enter the verification code.";
      errorClassName["full_name"] = "has-error";
      $("#login-code-error").show();
    }

    setErrors(errors);
    seterrorClassName(errorClassName);
    return formIsValid;
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    if (handleValidation) {
      let dataObj = {};
      dataObj["email_phone"] = email;
      dataObj["type"] = "2";
      dataObj["country_code"] = "";

      const data = JSON.stringify(dataObj);
      /* alert(data)*/

      fetch(Constance.baseUrl + 'authentication/send_otp', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        body: data
      }).then(response => {

        response.json().then(json => {

          if (json.success === "yes") {
            NotificationManager.success('success', (json.message), 3000);
            $("#phoneform").css("display", "none");
            $("#emailform").css("display", "none");
            $("#codeform").css("display", "block");

          } else {
            NotificationManager.error('Error', (json.message), 3000);
          }
        });
      }).catch(err => err);
    }
  }

  const handleSubmitphone = (e) => {
    e.preventDefault()
    if (handlephoneValidation()) {
      let dataObj = {};
      dataObj["email_phone"] = phone;
      dataObj["type"] = "1";
      dataObj["country_code"] = "91";

      const data = JSON.stringify(dataObj);
      /* alert(data)*/

      fetch(Constance.baseUrl + 'authentication/send_otp', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        body: data
      }).then(response => {

        response.json().then(json => {

          if (json.success === "yes") {
            NotificationManager.success('success', (json.message), 3000);
            $("#phoneform").css("display", "none");
            $("#emailform").css("display", "none");
            $("#codeform").css("display", "block");
          } else {
            NotificationManager.error('Error', (json.message), 3000);
          }
        });
      }).catch(err => err);
    }

  }

  const handleSubmitCode = (e) => {
    e.preventDefault()
    if (codeValidation) {

      const formdata = new FormData()
      formdata.append("email_phone", email == "" ? phone : email)
      formdata.append("type", email == "" ? "1" : "2")
      formdata.append("verification_code", code)
      formdata.append("full_name", fullname)
      formdata.append("latitude", "22.2894694")
      formdata.append("longitude", "70.7730229")
      formdata.append("device_token", "")
      formdata.append("device_type", "0")
      formdata.append("device_id", "abcxyz")
      formdata.append("profile_picture", profile_picture)
      formdata.append("password", sha512(password))
      formdata.append("country_code", phone == "" ? "" : "91")
      formdata.append("city", "rajkot")
      formdata.append("address", "indira circle")
      let dataObj = {};
      for (const [key, value] of formdata.entries()) {
        dataObj[key] = value;
      }
      const data = JSON.stringify(dataObj);


      fetch(Constance.baseUrl + 'authentication/sign_up', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        body: formdata
      }).then(response => {

        response.json().then(json => {
          //  console.log("js",json); return false
          if (json.success === "yes") {
            NotificationManager.success('success', (json.message), 3000);
            sessionStorage.setItem("authorization_token", json?.data?.authorization_token)
            localStorage.setItem("user_id", json?.data?.id)
            localStorage.setItem("full_name", json?.data?.full_name)
            localStorage.setItem("is_loggedin", "true")
            window.location.href = "/dashboard"
          } else {
            NotificationManager.error('Error', (json.message), 3000);
          }
        });
      }).catch(err => err);
    }
  }

  return (
    <>
      <div>
        <div className="register">
          <div class="card">
            <div className="left">
              <h1>NEARFOLD</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                alias totam numquam ipsa exercitationem dignissimos, error nam,
                consequatur.
              </p>
              <span>Do you have an account?</span>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
            <div className="right">
              <div className="mainemailphone">
                <button value="with email" id="withemail" className="withemail" onClick={() => Withemail()}>Use email</button>
                <button value="with phone" id="withphone" className="withphone" onClick={() => Withphone()}>Use phone</button>
              </div>


              <form action="#" id="emailform">
                <input type="hidden" value="" name="email_phone" onChange={(e) => setemail_phone(e.target.value)} />
                <input type="hidden" value="" name="type" onChange={(e) => settype(e.target.value)} />
                <input type="hidden" value="" name="country_code" onChange={(e) => setcountry_code(e.target.value)} />
                <input type="hidden" value="" name="device_token" onChange={(e) => setdevice_token(e.target.value)} />
                <input type="hidden" value="0" name="device_type" onChange={(e) => setdevice_type(e.target.value)} />
                <input type="hidden" value="abcxyz" name="device_id" onChange={(e) => setdevice_id(e.target.value)} />
                <div class="input_box">
                  <input type="text" id="reminder-name" name="full_name" placeholder="full name" onKeyPress={() => hidemsg("login-name-error")} onChange={(e) => setfullname(e.target.value)} required />
                  <div id="login-name-error" className="error">{errors["full_name"]}</div>
                </div>
                <div class="input_box">
                  <input type="email" id="email" placeholder="Email" name="email" onKeyPress={() => hidemsg("login-email-error")} onChange={(e) => setemail(e.target.value)} required />
                  <div id="login-email-error" className="error">{errors["email"]}</div>
                </div>
                <div class="input_box">
                  <input type="file" id="profile_picture" placeholder="profile_picture" name="profile_picture" onKeyPress={() => hidemsg("login-profile-pic-error")} onChange={(e) => setprofile_picture(e.target.files[0])} required />
                  <div id="login-profile-pic-error" className="error">{errors["profile_picture"]}</div>
                </div>
                <div class="input_box">
                  <input type="password" id="reminder-password" placeholder="Password" name="password" onKeyPress={() => hidemsg("login-password-error")} onChange={(e) => setpassword(e.target.value)} required />
                  <div id="login-password-error" className="error">{errors["password"]}</div>
                </div>
                <div class="input_box">
                  <input type="password" id="reminder-confirm-password" placeholder="Confirm password" onKeyPress={() => hidemsg("login-confirm-password-error")} name="confirm-password" onChange={(e) => setconfirmpass(e.target.value)} required />
                  <div id="login-confirm-password-error" className="error">{errors["confirm-password"]}</div>
                </div>

                <div class="option_div">
                  <div class="check_box">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </div>
                  {/* <div class="forget_div">
          <a href="#">Forgot password?</a>
        </div> */}
                </div>
                <div >
                  <button type="submit" value="Submit" onClick={(e) => handlesubmit(e)}>Submit</button>
                </div>
                <div class="social_icons">
                 
                </div>
              </form>


              <form action="#" id="phoneform" style={{ display: "none" }} >
                <div class="input_box">
                  <input type="text" id="reminder-name" name="full_name" placeholder="full name" onKeyPress={() => hidemsg("login-name-error")} onChange={(e) => setfullname(e.target.value)} />
                  <div id="login-name-error" className="error">{errors["full_name"]}</div>
                </div>
                <div class="input_box">
                  <input type="number" id="phone" name="phone" placeholder="Phone" onKeyPress={() => hidemsg("login-phone-error")} onChange={(e) => setphone(e.target.value)} />
                  <div id="login-phone-error" className="error">{errors["phone"]}</div>
                </div>
                <div class="input_box">
                  <input type="file" placeholder="profile_picture" id="profile_picture" name="profile_picture" onKeyPress={() => hidemsg("login-profile-pic-error")} onChange={(e) => setprofile_picture(e.target.files[0])} />
                  <div id="login-profile-pic-error" className="error">{errors["profile_picture"]}</div>
                </div>
                <div class="input_box">
                  <input type="password" id="reminder-password" placeholder="Password" name="password" onKeyPress={() => hidemsg("login-password-error")} onChange={(e) => setpassword(e.target.value)} />
                  <div id="login-password-error" className="error">{errors["password"]}</div>

                </div>
                <div class="input_box">
                  <input type="password" id="reminder-confirm-password" placeholder="confirm-password" name="confirm-password" onKeyPress={() => hidemsg("login-confirm-password-error")} onChange={(e) => setconfirmpass(e.target.value)} required />
                  <div id="login-confirm-password-error" className="error">{errors["confirm-password"]}</div>
                </div>

                <div class="option_div">
                  <div class="check_box">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </div>
                  {/* <div class="forget_div">
          <a href="#">Forgot password?</a>
        </div> */}
                </div>
                <div >
                  <button type="submit" value="Submit" onClick={(e) => handleSubmitphone(e)}>Submit</button>
                </div>
                <div class="social_icons">
                  <a href="#"><i class="fab fa-facebook-f"></i> <span>Facebook</span></a>
                  <a href="#"><i class="fab fa-google"></i><span>Google</span></a>
                </div>
              </form>


              <form action="#" id="codeform" style={{ display: "none" }}>
                <div class="input_box">
                  <input type="text" id="vcode" name="vcode" placeholder="enter verification code" onKeyPress={() => hidemsg("login-code-error")} onChange={(e) => setcode(e.target.value)} />
                  <div id="login-code-error" className="error">{errors["vcode"]}</div>
                </div>
                <div>
                  <button type="submit" value="Submit" onClick={(e) => handleSubmitCode(e)}>Submit</button>
                </div>
              </form>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </div>
    </>
  )
}
// 402425
export default Register;