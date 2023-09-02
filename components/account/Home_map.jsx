// Better Ways
// https://jsfiddle.net/gh/get/library/pure/googlemaps/js-samples/tree/master/dist/samples/marker-remove/jsfiddle

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
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import car from "../../assets/istockphoto-186578902-612x612.jpg";
import viman from "../../assets/pencil-60.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import carimg from "../../assets/car img.png";
import distance from "../../assets/google-maps-car-icon-15.jpg";
import modelprofilepic from "../../assets/download.png";
import $ from "jquery";
import "./profile.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Home_map = (props) => {
  const [userdetail, setUserdetail] = useState({});
  // console.log("userdetails", userdetail);
  var [show, setShow] = useState(false);
  const [newlat, setnewlat] = useState(props.lat);
  const [live, setlive] = useState({
    glide: false,
  });
  // console.log("live", live.glide);

  const getuserdetails = async () => {
    var obj = {};
    obj["user_id"] = "170";
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

  var handleClose = () => setShow(false);
  var handleShow = (lat) => {
    setnewlat(lat);
    setShow(true);
  };

  const [locations, setlocations] = useState([]);
  console.log("locations", locations);
  var [markers, setmarkers] = useState([]);
  console.log("markers", markers);

  Geocode.setApiKey("AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI");
  Geocode.enableDebug();
  const [mapPosition, setmapPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });
  const [markerPosition, setmarkerPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });

  const [modelinfo, setmodelinfo] = useState({});
  console.log("modelinfo", modelinfo);

  const handlemodeldetails = (latitude, user_id) => {
    handleShow(latitude, user_id);
    locations.forEach((pro) => {
      if (pro.user_id === user_id) {
        setmodelinfo(pro);
      }
    });
  };

  const getMapOptions = (maps) => {
    return {
      streetViewControl: true,
      scaleControl: true,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,

      mapTypeControl: true,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID,
        ],
      },

      zoomControl: true,
      clickableIcons: true,
    };
  };

  const [mapobj, setmapobj] = useState({});
  const [mapcomp, setmapcomp] = useState({});

  //for handling multiple marker cluster
  const handleApiLoaded = (map, maps, livee) => {
    setmapobj(maps);
    setmapcomp(map);
    var user_idd = localStorage.getItem("user_id");
    // alert(user_id)
    var obj = {};
    obj["user_id"] = user_idd;
    var data = JSON.stringify(obj);

    fetch("http://192.168.1.100/nearfold_test/app/authentication/userDetails", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    }).then((response) => {
      response
        .json()
        .then((res) => {
          console.log("ressssssssssss", res);
          if (res.success === "yes") {
            setUserdetail(res.data);
            var lattt = userdetail.latitude;
            var lnggg = userdetail.longitude;
            var profile_image = userdetail.profile_picture;
            var user_id = userdetail.id;
            if (livee === true) {
              var obj = {};
              obj["Lat"] = lattt;
              obj["Lng"] = lnggg;
              obj["icon"] = profile_image;
              obj["user_id"] = user_id;
              locations.push(obj);
              console.log("markeradd", markers);
              console.log("locationadd", locations);
            }
          }
          // console.log("locationadd", locations);
        })
        .then(() => {
          if (livee === true) {
            locations.forEach((location, index) => {
              // alert(location.Lat);
              var allmarkers = new maps.Marker({
                position: {
                  lat: location.Lat,
                  lng: location.Lng,
                },
                map,
                // icon:location.icon
                icon: {
                  url: location.icon,
                  anchor: new google.maps.Point(17, 46),
                  scaledSize:
                    index == 0
                      ? new google.maps.Size(37, 37)
                      : new google.maps.Size(37, 45),
                },
                // options:{icon:location.icon}
              });
              markers.push(allmarkers);
              console.log("pushedmarker", markers);
              allmarkers.addListener("click", () =>
                handlemodeldetails(location.Lat, location.user_id)
              );
              if (index == 0) {
                allmarkers.setAnimation(google.maps.Animation.BOUNCE);
              }
            });
          }
          if (livee === false) {
            for (let i = 0; i < markers.length; i++) {
              markers[i].setMap(map);
            }
          }
          // console.log("callbacklocations", locations);
          return <div id="mymarker">{markers}</div>;
          new MarkerClusterer({ markers, map });
        })
        .catch((error) => error);
    });
    // referance : https://stackoverflow.com/questions/58664489/how-to-add-markerclusterer-to-google-map-react
  };

  const Goonline = () => {
    var obj = {};
    obj["user_id"] = "158";
    obj["status"] = "1";
    var data = JSON.stringify(obj);

    fetch(
      "http://192.168.1.100/nearfold_test/app/authentication/online_offline_status",
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
            NotificationManager.success("You are Online Now..!");
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

  const Gooffline = () => {
    var obj = {};
    obj["user_id"] = "158";
    obj["status"] = "0";
    var data = JSON.stringify(obj);

    fetch(
      "http://192.168.1.100/nearfold_test/app/authentication/online_offline_status",
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
            NotificationManager.success("You are Offline Now..!");
            //   setadmin(true);
          }
        });
      })
      .catch((error) => error);
  };

  const handlechange = (e, map) => {
    setlive({ ...live, [e.target.name]: e.target.checked });
    var livee = e.target.checked;
    console.log("update", e.target.checked);
    if (e.target.checked === true) {
      handleApiLoaded(mapcomp, mapobj, livee);
      Goonline();
    }
    if (e.target.checked === false) {
      Gooffline();
      markers.pop();
      locations.pop();
      markers = [];
      window.location.reload();
    }
  };

  let map;
  if (props.lat !== undefined) {
    map = (
      <>
        <div
          style={{
            height: "95vh",
            width: "90%",
            marginLeft: "5%",
            marginTop: "20px",
          }}
        >
          <div style={{ height: "90%", width: "100%", position: "relative" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI",
              }}
              defaultCenter={mapPosition}
              defaultZoom={16}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps, live }) => {
                handleApiLoaded(map, maps);
              }}
              options={getMapOptions}
            >
              <div className="golive">
                <h3>Go Live</h3>
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    onChange={(e) => handlechange(e, map)}
                    name="glide"
                  />
                </Form>
              </div>
            </GoogleMapReact>
          </div>
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <div className="modelgreentag">Seller : Dealer</div>
              </Modal.Header>
              <Modal.Body>
                <div
                  onClick={() => {
                    window.location.href =
                      "./Dealer_profile/" + modelinfo.user_id;
                  }}
                  className="modelbody"
                >
                  <br />
                  <div className="modellowerdiv">
                    <div className="modellowerdivleft">
                      <div>
                        <img src={car} className="profilecarimg" />
                      </div>
                      <div className="modelcontentsec">
                        <img src={carimg} className="modelvectors" />
                        <div>Total Cars : 1</div>
                      </div>
                      <div className="modelcontentsec">
                        <img src={distance} className="modelvectors" />
                        <div>0.0 km</div>
                      </div>
                    </div>
                    <div className="modellowerdivright">
                      <div className="modelpdiv">
                        <img src={modelprofilepic} className="profilepict" />
                      </div>
                      <div>KishuTest</div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <NotificationContainer />
        </div>
      </>
    );
  } else {
    map = <div style={{ height: props.height }} />;
  }
  return map;
};

export default Home_map;
