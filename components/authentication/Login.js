import React, { useEffect, useState } from "react";
import $ from "jquery"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import sha512 from "js-sha512"
import "./login.css"
import Constance from "../constants/Constance";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import FacebookLogin from 'react-facebook-login';

const Login = () => {
    const [email, setemail] = useState("")

    const [phone, setphone] = useState("")

    const [password, setpassword] = useState("")

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
    const user_id = localStorage.getItem("user_id")
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [googledetail, setgoogledetail] = useState({})
    console.log("google", googledetail);


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

    useEffect(() => {
        if (user_id) {
            window.location.href = "/dashboard"
        }
    }, [])


    const handleValidation = () => {
        let fields = fieldsup;
        let errors = {};
        let errorClassName = {};
        let formIsValid = true;
        var passw = /^[A-Za-z]\w{7,14}$/;


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
        if (handleValidation()) {
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
        if (codeValidation()) {


            let dataObj = {};
            dataObj["email_phone"] = email == "" ? phone : email;
            dataObj["type"] = email == "" ? "1" : "2";
            dataObj["verification_code"] = code;
            dataObj["device_token"] = "hi";
            dataObj["device_type"] = "2";
            dataObj["device_id"] = "abcxyz";
            dataObj["password"] = sha512(password);
            dataObj["country_code"] = phone == "" ? "" : "91";


            const data = JSON.stringify(dataObj);
            /* alert(data)*/

            fetch(Constance.baseUrl + 'authentication/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                },
                body: data
            }).then(response => {

                response.json().then(json => {
                    console.log("res", json);
                    if (json.success === "yes") {
                        NotificationManager.success('success', (json.message), 3000);
                        sessionStorage.setItem("authorization_token", json.data.authorization_token)
                        localStorage.setItem("user_id", json.data.id)
                        localStorage.setItem("full_name", json.data.full_name)
                        localStorage.setItem("is_loggedin", "true")
                        window.location.href = "/dashboard"
                    } else {
                        NotificationManager.error('Error', (json.message), 3000);
                    }
                });
            }).catch(err => err);
        }


    }

    const Loginwithgoogle = (credentialResponse) => {
        console.log("cr", credentialResponse);
        var decoded = jwt_decode(credentialResponse.credential);
        setgoogledetail(decoded)
        console.log(decoded)

        let dataObj = {}
        dataObj['social_media_id'] = decoded.sub
        dataObj['email'] = decoded.email
        dataObj['type'] = "2"
        dataObj['full_name'] = decoded.name
        dataObj['device_type'] = "1"
        dataObj['latitude'] = ""
        dataObj['longitude'] = ""
        dataObj['device_token'] = ""
        dataObj['device_type'] = "0"
        dataObj['device_id'] = "rew565"
        dataObj['force_login'] = "0"
        dataObj['city'] = ""
        dataObj['address'] = ""
        dataObj['profile_picture'] = decoded.picture

        const data = JSON.stringify(dataObj);

        fetch(Constance.baseUrl + 'authentication/social_media_login', {
            method: 'POST',
            body: data
        }).then(response => {
            response.json().then(json => {

                NotificationManager.success('success', (json.message), 3000);
                sessionStorage.setItem("authorization_token", json?.data?.authorization_token)
                localStorage.setItem("user_id", json?.data?.id)
                localStorage.setItem("full_name", json?.data?.full_name)
                localStorage.setItem("is_loggedin", "true")
                window.location.href = "/dashboard"

            });
        }).catch(err => err);

    }

    const componentClicked = () => {
        console.log("clicked");
    }

    // const responseFacebook = (response) => {
    //     console.log(response);
    //     let dataObj = {}
    //     dataObj['social_media_id'] = response.id
    //     dataObj['email'] = ""
    //     dataObj['type'] = "1"
    //     dataObj['full_name'] = response.name
    //     dataObj['device_type'] = "1"
    //     dataObj['latitude'] = ""
    //     dataObj['longitude'] = ""
    //     dataObj['device_token'] = ""
    //     dataObj['device_type'] = "0"
    //     dataObj['device_id'] = "rew565"
    //     dataObj['force_login'] = "0"
    //     dataObj['city'] = ""
    //     dataObj['address'] = ""
    //     dataObj['profile_picture'] = response.picture.data.url


    //     const data = JSON.stringify(dataObj);

    //     fetch(Constance.baseUrl + 'authentication/social_media_login', {
    //         method: 'POST',
    //         body: data
    //     }).then(response => {
    //         response.json().then(json => {

    //             NotificationManager.success('success', (json.message), 3000);
    //             sessionStorage.setItem("authorization_token", json?.data?.authorization_token)
    //             localStorage.setItem("user_id", json?.data?.id)
    //             localStorage.setItem("full_name", json?.data?.full_name)
    //             localStorage.setItem("is_loggedin", "true")
    //             window.location.href = "/dashboard"

    //         });
    //     }).catch(err => err);
    // }

    // let fbContent;

    // if (isLoggedIn) {
    //     fbContent = null;
    // }
    // else {
    //     fbContent = (
    //         <FacebookLogin
    //             appId="272549242160219"
    //             autoLoad={true}
    //             fields="name,email,picture"
    //             onClick={componentClicked}
    //             callback={responseFacebook}
    //         />
    //     )
    // }


    return (
        <>
            <div className="login">
                <div class="card">
                    <div className="left">
                        <h1>NEARFOLD</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                            alias totam numquam ipsa exercitationem dignissimos, error nam,
                            consequatur.
                        </p>
                        <span>Don't you have an account?</span>
                        <Link to="/">
                            <button>Register</button>
                        </Link>
                    </div>
                    <div className="right">
                        <div className="mainemailphone">
                            <button value="with email" id="withemail" className="withemail" onClick={() => Withemail()}>Use email</button>
                            <button value="with phone" id="withphone" className="withphone" onClick={() => Withphone()}>Use phone</button>
                        </div>


                        <form action="#" id="emailform" onSubmit={handlesubmit}>
                            <input type="hidden" value="" name="email_phone" onChange={(e) => setemail_phone(e.target.value)} />
                            <input type="hidden" value="" name="type" onChange={(e) => settype(e.target.value)} />
                            <input type="hidden" value="" name="country_code" onChange={(e) => setcountry_code(e.target.value)} />
                            <input type="hidden" value="" name="device_token" onChange={(e) => setdevice_token(e.target.value)} />
                            <input type="hidden" value="0" name="device_type" onChange={(e) => setdevice_type(e.target.value)} />
                            <input type="hidden" value="0" name="device_id" onChange={(e) => setdevice_id(e.target.value)} />
                            <div class="input_box">
                                <input type="email" id="email" placeholder="Email" name="email" onKeyPress={() => hidemsg("login-email-error")} onChange={(e) => setemail(e.target.value)} required />
                                <div id="login-email-error" className="error">{errors["email"]}</div>
                            </div>
                            <div class="input_box">
                                <input type="password" id="reminder-password" placeholder="Password" name="password" onKeyPress={() => hidemsg("login-password-error")} onChange={(e) => setpassword(e.target.value)} required />
                                <div id="login-password-error" className="error">{errors["password"]}</div>
                            </div>

                            <div>
                                <button value="Submit">Login</button>
                            </div>
                            <div class="sign_upp">
                                <span><a href="/forgotpassword">forgot password</a></span>
                            </div>
                            <div class="social_icons">
                                {/* <div>{fbContent}</div> */}
                                <div>
                                <GoogleOAuthProvider clientId="593173091396-06aqd9jvejl77o0abtoqsuhps53al1pe.apps.googleusercontent.com">
                                    <GoogleLogin

                                        onSuccess={(credentialResponse) => { Loginwithgoogle(credentialResponse) }}

                                        onError={() => {
                                            console.log('Login Failed')
                                        }}
                                    />
                                </GoogleOAuthProvider>
                                </div>
                            </div>
                        </form>


                        <form action="#" id="phoneform" style={{ display: "none" }}  >
                            <div class="input_box">
                                <input type="number" id="phone" name="phone" placeholder="Phone" onKeyPress={() => hidemsg("login-phone-error")} onChange={(e) => setphone(e.target.value)} />
                                <div id="login-phone-error" className="error">{errors["phone"]}</div>
                            </div>
                            <div class="input_box">
                                <input type="password" id="reminder-password" placeholder="Password" name="password" onKeyPress={() => hidemsg("login-password-error")} onChange={(e) => setpassword(e.target.value)} />
                                <div id="login-password-error" className="error">{errors["password"]}</div>
                              
                            </div>
                            
                            <div>
                                <button value="Login" onClick={(e) => handleSubmitphone(e)}>Login</button>
                            </div>
                            <div class="sign_upp">
                                <span><a href="/forgotpassword">forgot password</a></span>
                            </div>
                            <div class="social_icons">
                                <a href="#"><i class="fab fa-facebook-f"></i> <span>Facebook</span></a>
                                <a href="#"><i class="fab fa-google"></i><span>Google</span></a>
                            </div>
                        </form>

                        <form action="#" id="codeform" style={{ display: "none" }}>
                            <div class="input_box">
                                <input type="text" id="vcode" name="vcode" placeholder="enter verification code" onKeyPress={() => hidemsg("login-code-error")} onChange={(e) => setcode(e.target.value)} required />
                                <div id="login-code-error" className="error">{errors["vcode"]}</div>
                            </div>
                            <div class="input_box button">
                                <input type="submit" value="Submit" onClick={(e) => handleSubmitCode(e)} />
                            </div>
                        </form>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        </>
    )
}

export default Login