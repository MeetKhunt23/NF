import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import car from "../../assets/istockphoto-186578902-612x612.jpg";
import "./Car_profile.css";
import racecar from "../../assets/auto-car-logo-template-vector-icon.jpg";
import speedcar from "../../assets/race_car_1.png";
import $ from "jquery";
import { GrPrevious, GrNext } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import seller from "../../assets/download.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import message from "../../assets/images (2).png";
import location from "../../assets/images (1).png";
import Locateseller from "./Locateseller";
import Messagebox from "./messagebox";

const Car_profile = () => {
  const { vehicle_id } = useParams();
  const [toggle, setToggle] = useState("1");
  const [cardetails, setCardetails] = useState({});
  const [lgShow, setLgShow] = useState(false);
  const [lg2Show, setLg2Show] = useState(false);
  const [lg3Show, setLg3Show] = useState(false);
  // const [carshowcase, setcarshowcase] = useState([]);
  var [cordnates, setcordnates] = useState({ lat: "", lng: "" });
  console.log("toggle", toggle);
  var carshowcase = [
    {
      id: "1",
      thumbnailimg: car,
      img: car,
    },
    {
      id: "2",
      thumbnailimg: racecar,
      img: racecar,
    },
    {
      id: "3",
      thumbnailimg: speedcar,
      img: speedcar,
    },
    {
      id: "4",
      thumbnailimg: car,
      img: car,
    },
    {
      id: "5",
      thumbnailimg: racecar,
      img: racecar,
    },
    {
      id: "6",
      thumbnailimg: speedcar,
      img: speedcar,
    },
  ];

  const setthumbnail = (id) => {
    setToggle("");
    setToggle(id);
  };

  const vehicledetails = async () => {
    var obj = {};
    obj["user_id"] = "158";
    obj["vehicle_id"] = vehicle_id;
    var data = JSON.stringify(obj);

    fetch("http://192.168.1.100/nearfold_test/app/vehicles/vehicle_detail", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        response.json().then((res) => {
          if (res.success === "yes") {
            setCardetails(res.data);
            // if (!carshowcase.length) {
            //   var detail = res.data.vehicle_images;
            //   detail.map((pro) => {
            //     var obj = {};
            //     obj["id"] = pro.id;
            //     obj["thumbnailimg"] = pro.vehicle_image_thumb;
            //     obj["img"] = pro.vehicle_image;
            //     carshowcase.push(obj);
            //     console.log("carshowcaseres", carshowcase);
            //   });
            // }
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

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
          // console.log("res", res);
          if (res.success === "yes") {
            // setUserdetail(res.data);
            var latssss = res.data.latitude;
            var lati = parseFloat(latssss);
            var langsss = res.data.longitude;
            var long = parseFloat(langsss);
            setcordnates({ lat: lati, lng: long });
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

  useEffect(() => {
    getuserdetails();
    vehicledetails();
  }, []);

  return (
    <div className="vehicledetailscont">
      <div className="container">
        <div className="mainimg" onClick={() => setLgShow(true)}>
          {carshowcase.map(({ id, thumbnailimg, img }) => {
            return (
              <>
                <div className="mainn">
                  <div className="img">
                    {toggle === id ? (
                      <>
                        <img src={img} key={id} className="photos" />
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="thumbnails">
          {carshowcase.map(({ id, thumbnailimg, img }) => {
            return (
              <>
                <div className="text">
                  <img
                    src={thumbnailimg}
                    className="photo"
                    onClick={() => setthumbnail(id)}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modelimagediv">
            {carshowcase.map(({ id, thumbnailimg, img }) => {
              return (
                <>
                  <div className="mainn">
                    <div className="img">
                      {toggle === id ? (
                        <>
                          <img src={img} key={id} className="bigphotos" />
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
      <div className="vehicldetail">
        <div className="titleandlike">
          <h4>Car Name</h4>
          {cardetails.is_favourite === 0 ? (
            <AiFillHeart style={{ fontSize: "50px", cursor: "pointer" }} />
          ) : (
            <AiOutlineHeart style={{ fontSize: "50px", cursor: "pointer" }} />
          )}
        </div>
        <div className="titleandlike">
          <h3>AED 66688</h3>
        </div>
        <div className="brandandmodeldiv">
          <div className="brandandmodel">
            <div className="brandandmodeltitle">Brand</div>
            <div>Suzuki</div>
          </div>
          <div className="brandandmodel">
            <div className="brandandmodeltitle">Model</div>
            <div>Sz145</div>
          </div>
        </div>
      </div>
      <div className="sellerdetails">
        <div>
          <div className="sellerandicons">
            <div>
              <img src={seller} className="seller" />
              <h4>Mike</h4>
            </div>
            <div className="bothboxofconnct">
              <div className="connctbox">
                <img
                  src={location}
                  className="connect"
                  onClick={() => setLg2Show(true)}
                />
                <h6>Locate Seller</h6>
              </div>
              <div className="connctbox">
                <img
                  src={message}
                  className="connect"
                  onClick={() => setLg3Show(true)}
                />
                <h6>Message Seller</h6>
              </div>
            </div>
          </div>
          <div>
            <FaMapMarkerAlt style={{ fontSize: "30px", cursor: "pointer" }} />
            <div>
              Kalakruti Complex, University Rd, Jala Ram Nagar, Rajkot, Gujarat
              360007, India
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lg2Show}
        onHide={() => setLg2Show(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div className="modelheaderlocate">B-Seller</div>
          <div className="modelheaderlocate">A-User</div>
        </Modal.Header>
        <Modal.Body>
          <div className="modelimagediv2">
            <Locateseller
              lat={22.2894694}
              lng={70.7730229}
              sellerlat={cordnates.lat}
              sellerlng={cordnates.lng}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lg3Show}
        onHide={() => setLg3Show(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="msgmodel"
      >
        <Modal.Header closeButton>
          <img src={seller} className="chatboximg"/>
          <h3>Mike</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="modelimagediv2">
            <Messagebox seller_id="170"/>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Car_profile;
