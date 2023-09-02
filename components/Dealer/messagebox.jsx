import React, { useEffect, useState } from "react";
import "./messagebox.css";
import Form from "react-bootstrap/Form";
import { AiOutlineSend } from "react-icons/ai";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Moment from "moment";

var user_id = localStorage.getItem("user_id");

const Messagebox = (props) => {
  const [message, setmessage] = useState("");
  const [messagehistory, setmessagehistory] = useState([]);
  const [page, setpage] = useState("");
  const [totalpage, settotalpage] = useState("");
  const [hasmore, sethasmore] = useState(false);

  console.log("messagehistory", messagehistory);

  const sendmessage = async () => {
    var user_id = localStorage.getItem("user_id");
    var obj = {};
    obj["sender_id"] = user_id;
    obj["receiver_id"] = "171";
    obj["message"] = message;
    var data = JSON.stringify(obj);
    setmessage("")

    fetch("http://192.168.1.100/nearfold_test/app/messages/post_message", {
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
            NotificationManager.success("Message Sent");
          }
        });
      })
      .catch((error) => error);
  };

  const getpostmessages = async () => {
    var user_id = localStorage.getItem("user_id");
    var obj = {};
    obj["sender_id"] = "171";
    obj["user_id"] = user_id;
    obj["page"] = "1";
    var data = JSON.stringify(obj);

    fetch("http://192.168.1.100/nearfold_test/app/messages/get_post_messages", {
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
            setmessagehistory(res.data);
            setpage(res.page);
            settotalpage(res.total_page);
          }
        });
      })
      .catch((error) => error);
  };

//   const fetchMoreData = () => {
//     if (page < totalpage) {
//       let dataObj = {};
//       dataObj["sender_id"] = props.seller_id;
//       dataObj["user_id"] = user_id;
//       dataObj["page"] = Number(page) + 1;

//       const data = JSON.stringify(dataObj);
//       fetch(
//         "http://192.168.1.100/nearfold_test/app/messages/get_post_messages",
//         {
//           method: "POST",
//           mode: "cors",
//           headers: {
//             Accept: "application/json",
//           },
//           body: data,
//         }
//       )
//         .then((response) => {
//           response.json().then((json) => {
//             console.log(json);
//             if (json.success === "yes") {
//               let row = json.data;
//               settotalpage(json.total_page);
//               setpage(json.page);
//               setmessagehistory();
//               messagehistory.concat(json.data);
//             } else {
//               NotificationManager.error("Error");

//             }
//           });
//         })
//         .catch((err) => err);
//     } else {
//         sethasmore(false)
//       return;
//     }
//   };

  const handlesend = () => {
    sendmessage();
    getpostmessages();
  };

  useEffect(() => {
    getpostmessages();
  },[]);

  return (
    <div>
      <div className="chatbox">
        <InfiniteScroll
          dataLength={messagehistory.length}
        //   next={fetchMoreData()}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }} //To put endMessage and loader to the top.
          inverse={true} //
          //   hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {messagehistory.map((row, index) => {
            return row.sender_id != user_id ? (
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-start message-content">
                <div className="message-wrapper">
                  <div className="message-popup">
                    <h4 className="mb-0">{row.message}</h4>
                  </div>
                  <div className="message-content-time w-100">
                    <span>
                      <p className="mb-0">
                        {Moment(row.created_date).format("d MMMM YYYY h:mm a")}
                      </p>
                    </span>
                    <div className="dropdown my-auto ">
                      <a
                        type="button"
                        className="btn dropdown-toggle text-end"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu">
                        <a
                          className="dropdown-item cursor"
                          //   onClick={this.deleteMessage.bind(this, row.id)}
                        >
                          <i className="far fa-trash-alt me-2"></i>
                          <span>Delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-end message-content right">
                <div className="message-popup">
                  <h4 className="mb-0">{row.message}</h4>
                </div>
                <div className="message-content-time w-100">
                  <span>
                    <p className="mb-0">
                      {Moment(row.created_date).format("d MMMM YYYY h:mm a")}
                    </p>
                  </span>
                  <div className="dropdown my-auto ">
                    <a
                      type="button"
                      className="btn dropdown-toggle text-end"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a
                        className="dropdown-item cursor"
                        // onClick={this.deleteMessage.bind(this, row.id)}
                      >
                        <i className="far fa-trash-alt me-2"></i>
                        <span>Delete</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <div className="inputtext">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            value={message}
            className="msg"
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
        </Form.Group>
      </div>
      <div
        className="sendmsgicon"
        onClick={() => {
          handlesend();
        }}
      >
        <AiOutlineSend
          style={{ color: "white", fontSize: "32px", fontWeight: "600" }}
        />
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Messagebox;
