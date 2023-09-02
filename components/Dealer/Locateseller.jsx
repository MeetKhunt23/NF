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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import distance from "../../assets/google-maps-car-icon-15.jpg";

const Locateseller = (props) => {
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
  const [mapPosition, setmapPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });
  const [markerPosition, setmarkerPosition] = useState({
    lat: "",
    lng: "",
  });
  const [startingpoint, setstartingpoint] = useState({
    lat: props.markerlat,
    lng: props.markerlat,
  });
  // console.log("markerPosition",markerPosition);

  const [userdetail, setUserdetail] = useState({});
  var [cordnates, setcordnates] = useState({ lat:"", lng:""});
  
  const renderMarkers = (map, maps) => {
    // refereance : https://stackoverflow.com/questions/11390453/google-maps-drag-and-dragend-event-listeners-wont-work-if-marker-created-by-cli
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = { lat: props.sellerlat, lng: props.sellerlng };
    console.log("origin",origin);
    const destination = { lat: 22.2954414, lng: 70.7810246 };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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

  let map;
  if (props.lat !== undefined) {
    map = (
      <>
        <div
          style={{
            height: "80vh",
            width: "100%"
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>
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
            </GoogleMapReact>
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

export default Locateseller;
