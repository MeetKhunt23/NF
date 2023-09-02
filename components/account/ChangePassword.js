import React,{useState} from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import sha512 from "js-sha512"
import $ from "jquery"
import axios from "axios";
import "./changepassword.css"
import Constance from "../constants/Constance";

const ChangePassword = () =>{
    const [password,setpassword] = useState("")
    const [new_pass,setnew_pass] = useState("")
    const [confirm_pass,setconfirm_pass] = useState("")
    const [fieldsup,setfieldsup] = useState({})
    const [errors,setErrors] = useState({})
    const [errorClassName,seterrorClassName] = useState({})
    const user_id = localStorage.getItem("user_id")
    const auth = sessionStorage.getItem("authorization_token")
    // console.log("auth",auth);
    const hidemsg = (hide) => {
        $("#" + hide).hide();
    }

   const handleValidation = () => {
        let fields = fieldsup;
        let errors = {};
        let errorClassName = {};
        let formIsValid = true;
        var passw = /^[A-Za-z]\w{7,14}$/;
       
        //Name
        if ($("#c_password").val() == "") {
            formIsValid = false;
            errors["c_password"] = "Please enter current password.";
            errorClassName["c_password"] = "has-error";
            $("#c_password-error").show();
            console.log("c_password");
        }

        //password
        if ($("#n_password").val() == "") {
            formIsValid = false;
            errors["n_password"] = "Please enter new password.";
            errorClassName["n_password"] = "has-error";
            $("#n_password-error").show();
            console.log("n_password");
        }
   
        //Confirm password
        if ($("#co_password").val() == "") {
            formIsValid = false;
            errors["co_password"] = "Please enter ConfirmPassword.";
            errorClassName["co_password"] = "has-error";
            $("#co_password-error").show();
            console.log("Confirm Password");
        }
        else if ($("#n_password").val() != $("#co_password").val()) {
            formIsValid = false;
            errors["co_password"] = "Please enter ConfirmPassword same as new password.";
            errorClassName["co_password"] = "has-error";
            $("#co_password-error").show();
        }
      
       setErrors(errors);
       seterrorClassName(errorClassName);
        return formIsValid;
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        if(handleValidation()){
           let dataObj = {};
          dataObj["user_id"] = user_id;
        dataObj["password"] = sha512(password);
        dataObj["new_password"] = sha512(new_pass);
       
        const data = JSON.stringify(dataObj);
        
        var url = Constance.baseUrl + "authentication/change_password";
       
        fetch(url,{
            method: 'POST',
            mode : "cors",
            headers:{
                'Accept': 'application/json',
            },
            body: data,
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    
                    if (json.success === 'yes') {
                        NotificationManager.success('Success', json.message, 3000);
                        
                    } else {
                        NotificationManager.error('Error', json.message, 3000);
                    }
                });
            }else{
                
                NotificationManager.error('Error', 'Somthing happened wrong.', 3000);
            }
    }).catch(err => err);
        /* alert(data)*/
     
        // fetch('http://192.168.1.100/nearfold/app/authentication/change_password/', {
        //     method: 'POST', 
          
        //     headers: {
        //         'Accept': 'application/json',
        //         "authorization-token" : "69656aa223dd6526178df09b1bc7f7d7b38222a66db5e1dd6f5af018f47136e2372f43301865178174327c52717db4ca55d25ecffce56d56470c9891326ff091"
        //     },
        //     body:data
        // }).then(response => {
        //   if(response.ok){
        //     response.json().then(json => {
             
        //         if (json.success === "yes") {
        //             NotificationManager.success('success', (json.message), 3000);

        //         } else {
        //             NotificationManager.error('Error', (json.message), 3000);
        //         }
        //     });
        // }
        // }).catch(err => err); 
        }
          
          
        }


    return(
        <>
        <div className="changepassbody">
      <div class="main_div">
    <div class="title">Change Password</div>   
    <form action="#" id="passformform">
      <div class="input_box">
        <input type="password" id= "c_password" placeholder="current pasword" name="c_password" onKeyPress={()=>hidemsg("c_password-error")} onChange={(e)=>setpassword(e.target.value)} required/>
        <div id="c_password-error" className="error">{errors["c_password"]}</div>
      </div>
      <div class="input_box">
        <input type="password" id="n_password" placeholder="New password" name="n_password" onKeyPress={()=>hidemsg("n_password-error")} onChange={(e)=>setnew_pass(e.target.value)} required/>
        <div id="n_password-error" className="error">{errors["n_password"]}</div>
      </div>
      <div class="input_box">
        <input type="password" id="co_password" placeholder="confirm password" name="co_password" onKeyPress={()=>hidemsg("co_password-error")} onChange={(e)=>setconfirm_pass(e.target.value)} required/>
        <div id="co_password-error" className="error">{errors["co_password"]}</div>
      </div>
      
      <div >
        <button className="update" type="submit" value="Update" onClick={(e) => handlesubmit(e)}>Update</button>
      </div>
    </form>

  </div>
  <NotificationContainer />
  </div>
        </>
    )
}

export default ChangePassword