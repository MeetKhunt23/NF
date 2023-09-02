import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import ChangePassword from "./components/account/ChangePassword";
import ForgotPassword from "./components/authentication/Forgotpassword";
import AddVehicle from "./components/vehical/Addvehical";
import Companydetails from "./components/company_details/Companydetails";
import Tearmsandcon from "./components/blocks/Tearmsandcon";
import Features from "./components/blocks/Fetures";
import Contactus from "./components/blocks/Contactus";
import Privacypoliciy from "./components/blocks/Privacypoliciy";
import Edit_profile from "./components/account/Profile";
import Subscription_plans from "./components/Subscriptions/SubscriptionPlans";
import My_vehicles from "./components/vehical/Myvehical";
import Allvehical from "./components/vehical/Allvehical";
import Myprofile from "./components/account/Myprofile";
import Change_location from "./components/account/Change_location";
import Dealer_profile from "./components/Dealer/Dealer_profile";
import Car_profile from "./components/Dealer/Car_profile";

const App = (props) => {
  const [userdetail, setUserdetail] = useState({});
  console.log("userdetails", userdetail.latitude);
  var [cordnates, setcordnates] = useState({ lat: "", lng: "" });
  // console.log("cords", cordnates);
  var markerlatitude = userdetail.latitude;
  var markerlongitude = userdetail.longitude;

  const getuserdetails = () => {
    var user_id = localStorage.getItem("user_id");
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
          console.log("resdata", res.data);
          if (res.success === "yes") {
            setUserdetail(res.data);
            var latitude = localStorage.setItem("markerlat", res.data.latitude);
            var longitude = localStorage.setItem(
              "markerlong",
              res.data.longitude
            );
            var adress = localStorage.setItem("adress", res.data.address);
            // markercordnates({ lat:res.data.latitude, lng:res.data.longitude})
            var latss = res.data.latitude.toFixed(7);
            var lati = parseFloat(latss);
            var langs = res.data.longitude.toFixed(7);
            var longi = parseFloat(langs);
            setcordnates({ lat: lati, lng: longi });
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
    <>
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard
              google={props.google}
              lat={22.2894694}
              lng={70.7730229}
              height="900px"
              width="100%"
              zoom={15}
            />
          }
        />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          exact
          path="/addvehicle/:id/:price/:plan_type"
          element={<AddVehicle />}
        />
        <Route exact path="/companydetails" element={<Companydetails />} />
        <Route exact path="/tearmsandcondition" element={<Tearmsandcon />} />
        <Route exact path="/features" element={<Features />} />
        <Route exact path="/contactus" element={<Contactus />} />
        <Route exact path="/privacypoliciy" element={<Privacypoliciy />} />
        <Route exact path="/profile" element={<Edit_profile />} />
        <Route
          exact
          path="/subscriptionplan"
          element={<Subscription_plans />}
        />
        <Route exact path="/myvehical" element={<My_vehicles />} />
        <Route exact path="/allvehicles" element={<Allvehical />} />
        <Route exact path="/myprofile" element={<Myprofile />} />
        <Route
          path="/Change_location"
          element={
            <Change_location
              google={props.google}
              lat={22.2862132}
              lng={70.7719071}
              markerlat={
                localStorage.getItem("markerlat")
                  ? parseFloat(localStorage.getItem("markerlat"))
                  : 22.2862132
              }
              markerlng={
                localStorage.getItem("markerlat")
                  ? parseFloat(localStorage.getItem("markerlong"))
                  : 70.7719071
              }
              height="900px"
              width="100%"
              zoom={15}
              address={localStorage.getItem("adress") ? localStorage.getItem("adress") : "Indira Circle"}
            />
          }
        />
        <Route path="/Dealer_profile/:user_id" element={<Dealer_profile />} />
        <Route path="/Car_profile/:vehicle_id" element={<Car_profile />} />
      </Routes>
    </>
  );
};

export default App;
