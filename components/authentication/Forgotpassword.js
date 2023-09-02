import React,{useEffect, useState} from "react";
import $ from "jquery"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import sha512 from "js-sha512"
import "./forgot.css"
import Constance from "../constants/Constance";

const ForgotPassword = () =>{

    const [email,setemail] = useState("")
    const [phone,setphone] = useState("")
    const [fieldsup,setfieldsup] = useState({})
    const [errors,setErrors] = useState({})
    const [errorClassName,seterrorClassName] = useState({})
    const [email_phone,setemail_phone] = useState('')
    const [type,settype] = useState('')
    const [country_code,setcountry_code] = useState('')

    const Withemail = () => {
        $("#phoneform").css("display", "none");
        $("#emailform").css("display", "block");
        $("#withemail").css("background", "#d76258");
        $("#withemail").css("color","white");
        $("#withphone").css("background", "white");
        $("#withphone").css("color","black");
    
      }
    
      const Withphone = () => {
        $("#emailform").css("display", "none");
        $("#phoneform").css("display", "block");
        $("#withphone").css("background", "#d76258");
        $("#withphone").css("color","white");
        $("#withemail").css("background", "white");
        $("#withemail").css("color","black");
    
    
      }

    const hidemsg = (hide) => {
        $("#" + hide).hide();
    }

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

        setErrors(errors);
        seterrorClassName(errorClassName);
        return formIsValid;
    }

    const Phonevalidation = () =>{
        let fields = fieldsup;
        let errors = {};
        let errorClassName = {};
        let formIsValid = true;
        var passw = /^[A-Za-z]\w{7,14}$/;


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

    
        setErrors(errors);
        seterrorClassName(errorClassName);
        return formIsValid;
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        if(handleValidation()){
           let dataObj = {};
          dataObj["email_phone"] = email;
        dataObj["type"] = "2";
        dataObj["country_code"] = "";

       
        const data = JSON.stringify(dataObj);
        /* alert(data)*/
     
        fetch(Constance.baseUrl + 'authentication/forgotPassword', {
            method: 'POST', 
            mode:'cors',
            headers: {
                'Accept': 'application/json',
            },
            body:data
        }).then(response => {
        
            response.json().then(json => {
             
                if (json.success === "yes") {
                    NotificationManager.success('success',(json.message), 3000);
                    setTimeout(() => {
                      window.location.href = "/login"  
                    },1000);
                } else {
                    NotificationManager.error('Error', (json.message), 3000);
                }
            });
        }).catch(err => err); 
          }
          
          
        }

        const handleSubmitphone = (e) =>{
            e.preventDefault()
            if(Phonevalidation()){
               let dataObj = {};
              dataObj["email_phone"] = phone;
            dataObj["type"] = "1";
            dataObj["country_code"] = "91";
    
           
            const data = JSON.stringify(dataObj);
            /* alert(data)*/
         
            fetch(Constance.baseUrl + 'authentication/forgotPassword', {
                method: 'POST', 
                mode:'cors',
                headers: {
                    'Accept': 'application/json',
                },
                body:data
            }).then(response => {
            
                response.json().then(json => {
                 
                    if (json.success === "yes") {
                        NotificationManager.success('success',(json.message), 3000);
                   
                    } else {
                        NotificationManager.error('Error', (json.message), 3000);
                    }
                });
            }).catch(err => err); 
              }
              
              
            }
    return(
        <>
        <div className="forgotbody">
      <div class="main_div">
    <div class="title">Forgot Password</div>
    <div className="mainemailphone">
    <button  value="with email" id="withemail" className="withemail" onClick={() => Withemail()}>Use email</button>
     <button  value="with phone" id="withphone" className="withphone" onClick={() => Withphone()}>Use phone</button>
    </div>
   
    
    <form action="#" id="emailform" onSubmit={handlesubmit}>
       <input type="hidden" value="" name="email_phone" onChange={(e)=>setemail_phone(e.target.value)} />
    <input type="hidden" value= "" name="type" onChange={(e)=>settype(e.target.value)}/>
    <input type="hidden" value="" name="country_code"  onChange={(e)=>setcountry_code(e.target.value)}/>
      <div class="input_box">
        <input type="email" id= "email" placeholder="Email" name="email" onKeyPress={()=>hidemsg("login-email-error")} onChange={(e)=>setemail(e.target.value)} required/>
        <div id="login-email-error" className="error">{errors["email"]}</div>
      </div>   
      <div >
        <button class="button"  value="Submit">Submit</button>
      </div>
    </form>


    <form action="#" id="phoneform" style={{display : "none"}} onSubmit={handleSubmitphone}>
      <div class="input_box">
        <input type="number" id ="phone" name="phone" placeholder="Mobile Number" onKeyPress={()=>hidemsg("login-phone-error")} onChange={(e)=>setphone(e.target.value)} />
        <div id="login-phone-error" className="error">{errors["phone"]}</div>
      </div>

      <div >
        <button class="button" value="Submit">Submit</button>
      </div>
    </form>

  </div>
  <NotificationContainer />
  </div>
        </>
    )
}

export default ForgotPassword