import React, { Component } from "react";
import profile from "../../Assets/img/user-profile.png";
import img1 from "../../Assets/img/img-1.jpeg";
import like from "../../Assets/img/like-2.png";
import interaction from "../../Assets/img/interaction-2.png";
import icon_search from "../../Assets/img/icon_search.png";
import profile2 from "../../Assets/img/profile-2.jpg";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import constants from "../constants/Constants.js";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import $ from "jquery";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "moment";

const login_user_id = localStorage.getItem("login_user_id")
  ? localStorage.getItem("login_user_id")
  : "0";
const isLogin = localStorage.getItem("isLoggedIn")
  ? localStorage.getItem("isLoggedIn")
  : "false";
const user_type = localStorage.getItem("user_type");

class Message extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.state = {
      messageData: [],
      messageHistory: [],
      totalpage: "",
      page: "1",
      userDetails: { id: "", full_name: "", profile_picture: "" },
      fields: {},
      errors: {},
      errorClassName: {},
      selectId: 0,
      hasMore: true,
    };
  }

  getUserDetail() {
    let dataObj = {};
    dataObj["login_id"] = login_user_id;
    dataObj["user_id"] = this.props.match.params.user_id;

    const data = JSON.stringify(dataObj);
    fetch(constants.baseUrl + "users/otherUserProfile", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        response.json().then((json) => {
          //console.log(json);
          if (json.success === "yes") {
            let row = json.data;
            this.setState({ userDetails: json.data });
          } else {
            NotificationManager.error(
              "Error",
              this.jsUcfirst(json.message),
              3000
            );
          }
        });
      })
      .catch((err) => err);
  }

  getData() {
    let dataObj = {};
    dataObj["user_id"] = login_user_id;

    const data = JSON.stringify(dataObj);
    fetch(constants.baseUrl + "messages/getUserChatList", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        response.json().then((json) => {
          console.log(json);
          if (json.success === "yes") {
            let row = json.data;
            this.setState({ messageData: json.data });
            if (this.state.messageData.length != 0) {
              if (json.data[0].sender_id != undefined) {
                var sId = json.data[0].sender_id;
                var rId = json.data[0].receiver_id;

                if (rId == login_user_id) {
                  var id = sId;
                } else {
                  var id = rId;
                }
                if (this.props.match.params.user_id == undefined) {
                  window.location.href = "/message/" + id;
                }
                this.setState({ selectId: rId });
              }
            }
          } else {
            NotificationManager.error(
              "Error",
              this.jsUcfirst(json.message),
              3000
            );
          }
        });
      })
      .catch((err) => err);
  }
  getPostMessages() {
    let dataObj = {};
    dataObj["sender_id"] = this.props.match.params.user_id;
    dataObj["user_id"] = login_user_id;
    dataObj["page"] = 1;

    const data = JSON.stringify(dataObj);
    fetch(constants.baseUrl + "messages/get_post_messages", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        response.json().then((json) => {
          console.log(json);
          if (json.success === "yes") {
            let row = json.data;
            this.setState({ totalpage: json.total_page });
            this.setState({ page: json.page });
            this.setState({ messageHistory: json.data });
          } else {
            NotificationManager.error(
              "Error",
              this.jsUcfirst(json.message),
              3000
            );
            this.setState({ messageHistory: json.data });
            this.setState({ totalpage: 0 });
            this.setState({ page: 0 });
          }
        });
      })
      .catch((err) => err);
  }

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentWillMount() {
    if (isLogin === "false") {
      window.location.href = "/";
    }
  }

  componentDidMount() {
    document.title = "Message | " + constants.siteName;

    $("#myDiv").removeClass("register");
    $("#myDiv").removeClass("steps");
    $("#myDiv").removeClass("animate-bottom");
    $("#myDiv").removeClass("my-lg-0");

    $("#myDiv").addClass("message-sec");
    $("#myDiv").addClass("my-lg-3");
    $("#myDiv").addClass("pt-3");
    $("#myDiv").addClass("pb-5");

    $(".toggle-2").click(function () {
      console.log("toggling sidebar-2");
      $(".sidebar-2").toggleClass("active");
    });

    $(".cancel-2").click(function () {
      console.log("toggling sidebar-2");
      $(".sidebar-2").toggleClass("active");
    });
    this.getData();
    this.getUserDetail();
    this.getPostMessages();
  }
  fetchMoreData() {
    if (this.state.page < this.state.totalpage) {
      let dataObj = {};
      dataObj["sender_id"] = this.props.match.params.user_id;
      dataObj["user_id"] = login_user_id;
      dataObj["page"] = Number(this.state.page) + 1;

      const data = JSON.stringify(dataObj);
      fetch(constants.baseUrl + "messages/get_post_messages", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
        body: data,
      })
        .then((response) => {
          response.json().then((json) => {
            console.log(json);
            if (json.success === "yes") {
              let row = json.data;
              this.setState({ totalpage: json.total_page });
              this.setState({ page: json.page });
              this.setState({
                messageHistory: this.state.messageHistory.concat(json.data),
              });
            } else {
              NotificationManager.error(
                "Error",
                this.jsUcfirst(json.message),
                3000
              );
            }
          });
        })
        .catch((err) => err);
    } else {
      this.setState({ hasMore: false });
      return;
    }
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let errorClassName = {};
    let formIsValid = true;

    console.log(fields);
    var message = $("#message").val();
    if (message == "") {
      formIsValid = false;
      errors["message"] = "Please enter message.";
      errorClassName["message"] = "has-error";
      $("#message-error").html(errors["message"]);
    }
    return formIsValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      const form = event.target;
      const formData = new FormData(form);
      formData.append("message_type", 0);
      fetch(constants.baseUrl + "messages/post_message", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.success);
              if (json.success === "yes") {
                this.getPostMessages();
                this.getData();
                $("#message").val("");
              } else {
                NotificationManager.error(
                  "Error",
                  this.jsUcfirst(json.message),
                  3000
                );
              }
            });
          } else {
            NotificationManager.error(
              "Error",
              "Somthing happened wrong.",
              3000
            );
          }
        })
        .catch((err) => err);
    }
  }

  handleChange(field, e) {
    if (e.target.value != "") {
      $("#" + field + "-error").html("");
    }

    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  uploadImg(field, e) {
    if (field == "image") {
      if (e.target.files[0] != undefined) {
        var formData = new FormData();
        formData.append("message_type", 1);
        formData.append("sender_id", login_user_id);
        formData.append("receiver_id", $("#receiver_id").val());
        formData.append("message", e.target.files[0]);

        fetch(constants.baseUrl + "messages/post_message", {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                console.log(json.success);
                if (json.success === "yes") {
                  this.getPostMessages();
                  this.getData();
                  $("#message").val("");
                } else {
                  NotificationManager.error(
                    "Error",
                    this.jsUcfirst(json.message),
                    3000
                  );
                }
              });
            } else {
              NotificationManager.error(
                "Error",
                "Somthing happened wrong.",
                3000
              );
            }
          })
          .catch((err) => err);
      }
    }
  }

  uploadVideo(field, e) {
    if (field == "video") {
      if (e.target.files[0] != undefined) {
        var formData = new FormData();
        formData.append("message_type", 2);
        formData.append("sender_id", login_user_id);
        formData.append("receiver_id", $("#receiver_id").val());
        formData.append("message", e.target.files[0]);

        fetch(constants.baseUrl + "messages/post_message", {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                console.log(json.success);
                if (json.success === "yes") {
                  this.getPostMessages();
                  this.getData();
                  $("#message").val("");
                } else {
                  NotificationManager.error(
                    "Error",
                    this.jsUcfirst(json.message),
                    3000
                  );
                }
              });
            } else {
              NotificationManager.error(
                "Error",
                "Somthing happened wrong.",
                3000
              );
            }
          })
          .catch((err) => err);
      }
    }
  }

  deleteMessage(id) {
    confirmAlert({
      title: "Confimation",
      message: "Are you sure you want to delete this message?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let dataObj = {};
            dataObj["message_id"] = id;
            dataObj["user_id"] = login_user_id;

            const data = JSON.stringify(dataObj);
            // alert(data)
            fetch(constants.baseUrl + "messages/messageDelete", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
              },
              body: data,
            })
              .then((response) => {
                response.json().then((json) => {
                  if (json.success === "yes") {
                    //NotificationManager.success('Success', json.message, 3000);
                    this.getPostMessages();
                    this.getData();
                  } else {
                    NotificationManager.error("Error", json.message, 3000);
                  }
                });
              })
              .catch((err) => err);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  blockUser(id, status) {
    if (status == 1) {
      var message = "Are you sure you would like to block this user?";
    } else {
      var message = "Are you sure you would like to unblock this user?";
    }
    confirmAlert({
      title: "Confimation",
      message: message,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let dataObj = {};
            dataObj["block_id"] = id;
            dataObj["user_id"] = login_user_id;

            const data = JSON.stringify(dataObj);
            // alert(data)
            fetch(constants.baseUrl + "authentication/addblockUsers", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
              },
              body: data,
            })
              .then((response) => {
                response.json().then((json) => {
                  if (json.success === "yes") {
                    window.location.reload();
                  } else {
                    NotificationManager.error("Error", json.message, 3000);
                  }
                });
              })
              .catch((err) => err);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  conversationDelete(id) {
    confirmAlert({
      title: "Confimation",
      message: "Are you sure you would like to delete this conversation?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let dataObj = {};
            dataObj["delete_id"] = id;
            dataObj["user_id"] = login_user_id;

            const data = JSON.stringify(dataObj);
            // alert(data)
            fetch(constants.baseUrl + "messages/conversationDelete", {
              method: "POST",
              mode: "cors",
              headers: {
                Accept: "application/json",
              },
              body: data,
            })
              .then((response) => {
                response.json().then((json) => {
                  if (json.success === "yes") {
                    window.location.href = "/message";
                  } else {
                    NotificationManager.error("Error", json.message, 3000);
                  }
                });
              })
              .catch((err) => err);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  render() {
    return (
      <>
        <div className="container">
          {this.props.match.params.user_id != undefined ? (
            <div className="row justify-content-start tabs my-2 px-2 px-sm-0 px-md-0 px-lg-0">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 d-none d-sm-none d-md-none d-lg-block pe-sm-0 pe-md-0 pe-lg-0 ">
                <div className="user-list hide-scrollbar">
                  <div className="sidebar-header sticky-top p-2">
                    <div className="m-2">
                      <h5 className="fw-bold mb-0">Chats</h5>
                      <div className="search-sec mt-2">
                        <form className="d-flex input-group">
                          <input
                            type="text"
                            id="example-input1-group1"
                            name="example-input1-group1"
                            className="form-control"
                            placeholder="Search User"
                          />
                          <span className="input-group-addon">
                            <img src={icon_search} className="input-img" />
                          </span>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="contacts-list">
                    {this.state.messageData.map((row, index) => {
                      if (row.receiver_id == login_user_id) {
                        var id = row.sender_id;
                      } else {
                        var id = row.receiver_id;
                      }
                      var classname = "";
                      if (id == this.props.match.params.user_id) {
                        classname = "message-active";
                      }
                      return (
                        <div className="contacts-item">
                          <a href={"/message/" + id}>
                            <button
                              type="button"
                              id={classname}
                              className="col-12 col-sm-12 col-md-12 col-lg-12 text-center btn  btn-lg message-btn"
                            >
                              <div className="row">
                                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-2 my-auto">
                                  <div className="profile-img" data-badge="100">
                                    <img src={row.profile_picture} />
                                  </div>
                                </div>
                                <div className="col-7 col-sm-5 col-md-7 col-lg-9 col-xl-10 text-start my-auto contacts-content ps-3">
                                  <div className="contacts-info">
                                    <h6 className="chat-name text-truncate">
                                      {row.full_name}
                                    </h6>
                                    <div className="chat-time">
                                      {row.date_time}
                                    </div>
                                  </div>
                                  <div className="contacts-texts">
                                    {row.message_type == 0 ? (
                                      <p className="text-truncate">
                                        {row.message}
                                      </p>
                                    ) : row.message_type == 1 ? (
                                      <p className="text-truncate">
                                        <i
                                          className="fa fa-camera"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Image
                                      </p>
                                    ) : (
                                      <p className="text-truncate">
                                        <i className="fas fa-video"></i> Video
                                      </p>
                                    )}
                                    {row.total_unread_message != 0 ? (
                                      <div className="badge badge-rounded badge-primary ml-1">
                                        {row.total_unread_message}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {row.is_block_by_user == 1 ? (
                                      <i
                                        className="fa fa-user-times"
                                        title="Block"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-8  ps-sm-0 ps-md-0 ps-lg-0 ">
                <div id="message-1" className="tabcontent1 tabcontent1-active">
                  <div className="message-heading chat-header">
                    <div className="media chat-name align-items-center text-truncate d-flex">
                      <div className="arrow toggle-2 text-center d-block d-sm-block d-md-block d-lg-none ">
                        <i className="fas fa-chevron-left "></i>
                      </div>
                      <div className=" profile-container text-start me-3 me-sm-3 me-md-3 me-lg-3 my-auto d-inline-block">
                        <div className="profile-img">
                          <img src={this.state.userDetails.profile_picture} />
                        </div>
                      </div>
                      <div className=" name text-start my-auto media-body align-self-center ">
                        <h6 className="text-truncate mb-0">
                          {this.state.userDetails.full_name}
                        </h6>
                      </div>
                    </div>
                    <div className=" text-end my-auto">
                      <div className="dropdown my-auto ">
                        <a
                          type="button"
                          className="btn dropdown-toggle text-end"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </a>

                        <div className="dropdown-menu">
                          {this.state.userDetails.is_block_by_user == 0 ? (
                            <a
                              className="dropdown-item cursor"
                              onClick={this.blockUser.bind(
                                this,
                                this.state.userDetails.user_id,
                                1
                              )}
                            >
                              <i className="fas fa-ban me-2"></i>
                              <span>Block</span>
                            </a>
                          ) : (
                            <a
                              className="dropdown-item cursor"
                              onClick={this.blockUser.bind(
                                this,
                                this.state.userDetails.user_id,
                                0
                              )}
                            >
                              <i className="fas fa-ban me-2"></i>
                              <span>Unblock</span>
                            </a>
                          )}
                          {this.state.messageHistory.length != 0 ? (
                            <a
                              className="dropdown-item cursor"
                              onClick={this.conversationDelete.bind(
                                this,
                                this.state.userDetails.user_id
                              )}
                            >
                              <i className="far fa-trash-alt me-2"></i>
                              <span>Delete</span>
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    id="message-form"
                    autoComplete="off"
                    method="post"
                    acceptCharset="utf-8"
                    onSubmit={this.handleSubmit}
                  >
                    <input
                      type="hidden"
                      id="sender_id"
                      name="sender_id"
                      value={login_user_id}
                    />
                    <input
                      type="hidden"
                      id="receiver_id"
                      name="receiver_id"
                      value={this.state.userDetails.user_id}
                    />

                    <div className="message-container p-2">
                      <div
                        id="scrollableDiv"
                        style={{
                          height: 650,
                          overflow: "auto",
                          display: "flex",
                          flexDirection: "column-reverse",
                        }}
                      >
                        {/*Put the scroll bar always on the bottom*/}
                        <InfiniteScroll
                          dataLength={this.state.messageHistory.length}
                          next={this.fetchMoreData}
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }} //To put endMessage and loader to the top.
                          inverse={true} //
                          hasMore={this.state.hasMore}
                          loader={<h4>Loading...</h4>}
                          scrollableTarget="scrollableDiv"
                        >
                          {this.state.messageHistory.map((row, index) => {
                            return row.sender_id != login_user_id ? 
                            (
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-start message-content">
                                <div className="message-wrapper">
                                  <div className="message-popup">
                                    {row.message_type == 0 ? (
                                      <h4 className="mb-0">{row.message}</h4>
                                    ) : row.message_type == 1 ? (
                                      <div className="message-img">
                                        <img src={row.message} />
                                      </div>
                                    ) : (
                                      <div className="message-img">
                                        <video controls>
                                          <source
                                            src={row.message}
                                            type="video/mp4"
                                          />
                                        </video>
                                      </div>
                                    )}
                                  </div>
                                  <div className="message-content-time w-100">
                                    <div className="profile-img">
                                      <img src={row.profile_thumb} />
                                    </div>
                                    <span>
                                      <p className="mb-0">
                                        {Moment(row.created_date).format(
                                          "d MMMM YYYY h:mm a"
                                        )}
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
                                          onClick={this.deleteMessage.bind(
                                            this,
                                            row.id
                                          )}
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
                                  {row.message_type == 0 ? (
                                    <h4 className="mb-0">{row.message}</h4>
                                  ) : row.message_type == 1 ? (
                                    <div className="message-img">
                                      <img src={row.message} />
                                    </div>
                                  ) : (
                                    <div className="message-img">
                                      <video controls>
                                        <source
                                          src={row.message}
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  )}
                                </div>
                                <div className="message-content-time w-100">
                                  <div className="profile-img">
                                    <img src={row.profile_thumb} />
                                  </div>
                                  <span>
                                    <p className="mb-0">
                                      {Moment(row.created_date).format(
                                        "d MMMM YYYY h:mm a"
                                      )}
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
                                        onClick={this.deleteMessage.bind(
                                          this,
                                          row.id
                                        )}
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
                      <div className="chat-finish"></div>
                    </div>

                    {this.state.userDetails.is_block_by_user == 0 ? (
                      <div className="write-message mx-auto">
                        <div className="row align-items-center">
                          <div className="col px-0">
                            <div className="input-group py-2">
                              <div className="attach-pin text-end ms-auto d-inline-block me-2">
                                <div className="dropdown">
                                  <button
                                    className="dropbtn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="fas fa-plus-circle"></i>
                                  </button>
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">
                                      <i className="fas fa-images me-2"></i>
                                      <span
                                        onClick={() => {
                                          $("#image").click();
                                        }}
                                      >
                                        Picture
                                      </span>
                                      <input
                                        type="file"
                                        onChange={this.uploadImg.bind(
                                          this,
                                          "image"
                                        )}
                                        className="form-control"
                                        hidden
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                      />
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      <i className="fas fa-video me-2"></i>
                                      <span
                                        onClick={() => {
                                          $("#video").click();
                                        }}
                                      >
                                        Video
                                      </span>
                                      <input
                                        type="file"
                                        onChange={this.uploadVideo.bind(
                                          this,
                                          "video"
                                        )}
                                        className="form-control"
                                        hidden
                                        accept="video/*"
                                        id="video"
                                        name="video"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <input
                                type="text"
                                id="message"
                                autoComplete="off"
                                name="message"
                                className="form-control p-0"
                                placeholder="Write your message..."
                                onChange={this.handleChange.bind(
                                  this,
                                  "message"
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-auto my-auto text-end px-0">
                            <button
                              type="submit"
                              style={{ border: "0", background: "none" }}
                            >
                              <div className="btn send-icon text-center ms-auto">
                                <i className="fas fa-paper-plane"></i>
                              </div>
                            </button>
                          </div>

                          <div
                            id="message-error"
                            className="help-block animation-slideUp text-left red"
                          >
                            {this.state.errors["message"]}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p>No record found :(</p>
            </>
          )}
        </div>

        <div className="sidebar-2 message-sec d-block d-sm-block d-md-block d-lg-none">
          <div className="container my-5">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                <div className="cancel-2">✕</div>
              </div>
              <div className="user-list hide-scrollbar">
                <div className="sidebar-header sticky-top p-2">
                  <div className="m-2">
                    <h5 className="fw-bold mb-0">Chats</h5>
                    <div className="search-sec mt-2">
                      <form className="d-flex input-group">
                        <input
                          type="text"
                          id="example-input1-group1"
                          name="example-input1-group1"
                          className="form-control"
                          placeholder="Search User"
                        />
                        <span className="input-group-addon">
                          <img src={icon_search} className="input-img" />
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="contacts-list">
                  {this.state.messageData.map((row, index) => {
                    if (row.receiver_id == login_user_id) {
                      var id = row.sender_id;
                    } else {
                      var id = row.receiver_id;
                    }
                    var classname = "";
                    if (id == this.props.match.params.user_id) {
                      classname = "message-active";
                    }
                    return (
                      <div className="contacts-item">
                        <a href={"/message/" + id}>
                          <button
                            type="button"
                            id={classname}
                            className="col-12 col-sm-12 col-md-12 col-lg-12 text-center btn   btn-lg message-btn message-active"
                          >
                            <div className="row">
                              <div className="col-3 col-sm-2 col-md-2 col-lg-3 col-xl-2 my-auto">
                                <div className="profile-img" data-badge="100">
                                  <img src={row.profile_picture} />
                                </div>
                              </div>
                              <div className="col-9 col-sm-10 col-md-10 col-lg-9 col-xl-10 text-start my-auto contacts-content ps-3">
                                <div className="contacts-info">
                                  <h6 className="chat-name text-truncate">
                                    {row.full_name}
                                  </h6>
                                  <div className="chat-time">
                                    {row.date_time}
                                  </div>
                                </div>
                                <div className="contacts-texts">
                                  {row.message_type == 0 ? (
                                    <p className="text-truncate">
                                      {row.message}
                                    </p>
                                  ) : row.message_type == 1 ? (
                                    <p className="text-truncate">
                                      <i
                                        className="fa fa-camera"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      Image
                                    </p>
                                  ) : (
                                    <p className="text-truncate">
                                      <i className="fas fa-video"></i> Video
                                    </p>
                                  )}

                                  {row.total_unread_message != 0 ? (
                                    <div className="badge badge-rounded badge-primary ml-1">
                                      {row.total_unread_message}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {row.is_block_by_user == 1 ? (
                                    <i
                                      className="fa fa-user-times"
                                      aria-hidden="true"
                                    ></i>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </>
    );
  }
}
export default Message;
