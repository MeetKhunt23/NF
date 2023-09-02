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
// import MarkerClusterer from "@google/markerclusterer";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import distance from "../../assets/google-maps-car-icon-15.jpg";

const Change_location = (props) => {
  Geocode.setApiKey("AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI");
  Geocode.enableDebug();
  var str_replace = require("str_replace");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [markerPosition, setmarkerPosition] = useState({
    lat: "",
    lng: "",
  });
  const [startingpoint, setstartingpoint] = useState({
    lat: props.markerlat,
    lng: props.markerlat,
  });
  // console.log("markerPosition",markerPosition);
  const [sort_address, setsort_address] = "";
  const [infoBoxVisible, setInfoBoxVisible] = useState(true);
  const [infoBoxContent, setInfoBoxContent] = useState("Welcome to India");
  const [userdetail, setUserdetail] = useState({});
  var [cordnates, setcordnates] = useState({ lat: "", lng: "" });
  const [mapPosition, setmapPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });
  console.log("mappos", mapPosition);

  const changemylocation = () => {
    var user_id = localStorage.getItem("user_id");
    var obj = {};
    obj["user_id"] = user_id;
    obj["latitude"] = markerPosition.lat;
    obj["longitude"] = markerPosition.lng;
    obj["city"] = city;
    obj["address"] = address;

    var data = JSON.stringify(obj);

    fetch(
      "http://192.168.1.100/nearfold_test/app/authentication/change_current_location",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
        body: data,
      }
    )
      .then(
        NotificationManager.success("success"),
        localStorage.setItem("markerlat",markerPosition.lat),
        localStorage.setItem("markerlong",markerPosition.lng),
        localStorage.setItem("adress",address),
        ).catch((error) => error);
  };

  const InfoBox = ({ show, lat, lng, content }) => {
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          top: lat,
          left: lng,
          width: "100px",
        }}
      >
        {address}
      </div>
    );
  };

  var onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setmarkerPosition({ lat: newLat, lng: newLng });
    setmapPosition({ lat: newLat, lng: newLng });
  };
  const renderMarkers = (map, maps) => {
    // refereance : https://stackoverflow.com/questions/11390453/google-maps-drag-and-dragend-event-listeners-wont-work-if-marker-created-by-cli
    let marker = new maps.Marker({
      position: { lat: props.markerlat, lng: props.markerlng },
      draggable: true,
      map,
      title: `${markerPosition.lat} ${markerPosition.lng}`,
    });
    // alert(props.markerlat)
    console.log("props",props);
    marker.addListener("dragend", onMarkerDragEnd);
    // var mrkrlat = props.markerlat;
    // var originlat = mrkrlat.toFixed(7);
    // var mrkrlng = props.markerlng;
    // var originlng = mrkrlng.toFixed(7);
    // console.log("cordinates", originlat, originlng);
    return marker;
  };

  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_3" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const getcountry = (addressArray) => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  };

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  const getpostal_code = (addressArray) => {
    let postal_code = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "postal_code" === addressArray[i].types[0]
      ) {
        postal_code = addressArray[i].long_name;
        return postal_code;
      }
    }
  };

  const Geolocation = () => {
    Geocode.fromLatLng(
      markerPosition.lat === "" ? props.lat : markerPosition.lat,
      markerPosition.lng === "" ? props.lng : markerPosition.lng
    ).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray),
        country = getcountry(addressArray);
      setInfoBoxContent(area);
      // alert([...area]);
      // console.log(address.split(", ")[1] == city?"":"hiii");
      console.log("lat", markerPosition.lat, markerPosition.lng);
      // alert("heyy")

      setaddress(address ? address : "");
      setarea(area ? area : "");
      setcity(city ? city : "");
      setstate(state ? state : "");
      setcountry(country ? country : "");
    });
    // alert(area)
  };

  const onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng(),
      country = getcountry(addressArray),
      postal_code = getpostal_code(addressArray);

    var ad = str_replace(city, "", address);
    ad = str_replace(state, "", ad);
    ad = str_replace(country, "", ad);
    ad = str_replace(postal_code, "", ad);
    ad = str_replace(",,,", "", ad);
    ad = str_replace(", ,  ,", "", ad);
    ad = str_replace(",  ,", "", ad);
    var sort_address = str_replace(", ,", "", ad);

    setaddress(address ? address : "");
    setarea(area ? area : "");
    setcity(city ? city : "");
    setstate(state ? state : "");
    setcountry(country ? country : "");
    setlatitude(latValue);
    setlongitude(lngValue);
    setpostal_code(postal_code);
    setsort_address(sort_address);
    setmarkerPosition({
      lat: latValue,
      lng: lngValue,
    });
    setmapPosition({
      lat: latValue,
      lng: lngValue,
    });
  };

  const onMarkerClick = () => {
    // Fetch address using reverse geocoding
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: { lat: markerPosition.lat, lng: markerPosition.lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            console.log("Address:", results[0].formatted_address);
            // Update the content of the InfoBox with the new address
            setInfoBoxContent(results[0].formatted_address);
          } else {
            console.log("Address not found");
            setInfoBoxContent("Address not found");
          }
        } else {
          console.log("Geocoder failed due to:", status);
          setInfoBoxContent("Geocoder failed");
        }
      }
    );

    // Toggle the visibility of the InfoBox when the marker is clicked
    setInfoBoxVisible(!infoBoxVisible);
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
      minZoom: 11,
      maxZoom: 18,

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

  useEffect(() => {
    Geolocation();
  }, [markerPosition.lat, markerPosition.lng]);

  let map;
  if (props.lat !== undefined) {
    map = (
      <>
        <div
          style={{
            height: "80vh",
            width: "80%",
            marginLeft: "10%",
            marginTop: "2%",
          }}
        >
          <div style={{ height: "90%", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyA2DSQWdb9Yr3pAsIgy6JP7UAN3WodZepI",
              }}
              defaultCenter={mapPosition}
              defaultZoom={16}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              options={getMapOptions}
            >
              {/* <InfoBox
              show={infoBoxVisible}
              lat={markerPosition.lat}
              lng={markerPosition.lng}
              content={address}
            /> */}
              <div>
                {/* <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              position:"relative",
              top:"150px",
              right:"30vw"
            }}
            onPlaceSelected={()=>onPlaceSelected()}
            types={["(regions)"]}
          /> */}
              </div>
            </GoogleMapReact>
          </div>
          <br />
          <h3 style={{ color: "#d76258" }}>Your Selected Address</h3>
          <br />
          <div style={props.upprsection}>
            <div className="form-group mb-4" style={{ display: "flex" }}>
              <input
                type="text"
                name="address"
                className="form-control"
                // onChange={onChange}
                readOnly="readOnly"
                value={markerPosition.lat === "" ? props.address : address}
                style={{ width: "80%" }}
              />
              <Button
                style={{
                  width: "20%",
                  marginLeft: "3%",
                  border: "none",
                  backgroundColor: "#d76258",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
                onClick={() => {
                  changemylocation();
                }}
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </>
    );
  } else {
    map = <div style={{ height: props.height }} />;
  }
  return map;
};

export default Change_location;
