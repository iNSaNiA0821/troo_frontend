import React, { useState, useEffect, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";
import Loader from "react-loader-spinner";
import Switch from "react-switch";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import axios from "axios";
import api from "../utils/api";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import { notifysuccess, notifywarning, notifyerror } from '../components/notify';
const Password = () => {
  const { user } = useSelector((state) => state.auth); // here, indicate reducer
  const fileUpload = useRef(null);
  const fileUpload1 = useRef(null);
  const [fileUrl, updateFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const videoRef = useRef();
  const previousUrl = useRef(fileUrl);

  useEffect(() => {
    if (previousUrl.current === fileUrl) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousUrl.current = fileUrl;
  }, [fileUrl]);
  const keydown = (e) => {
    return e.keyCode;
  };

  //hastag
  const [content, setContent] = useState("");
  const onChange = (content) => setContent(content);

  function addContent(input) {
    if (input.length <= 350) {
      setContent(input);
    }
    let length = input.length;
    if (length <= 349) setContent(input);
    if (keydown === 8 || keydown === 46) setContent(input);
  }

  const Uploadsubmit = async (e) => {
    e.preventDefault();

    let newContent = content;

    if (newContent !== "" && fileUrl != null) {
      setUploading(true);
      let formData = new FormData();
      formData.append("file", fileUrl);

      //hash tag
      let body = newContent.trim();

      formData.append("desc", body);
      if (check) formData.append("saleoption", 0);
      else formData.append("saleoption", 1);
      axios
        .post("http://localhost:4000/api/blog", formData, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        })
        .then(function (res) {
          if (res.data === "invalid") {
            notifyerror("This file is invalid so that you can't upload.");
            updateFileUrl(null);
          } else if (res.data === "failure")
            notifyerror("Uploading is failed. Please try again.");
          else if (res.data === "existing")
            notifyerror("This file already exists so that you can't upload.");
          else {
            notifysuccess("success upload");
            updateFileUrl(null);
          }
          setUploading(false);
        })
        .catch(function () {
          setUploading(false);
        });
    }
  };

  const capturefile = async (e) => {
    e.preventDefault();
    updateFileUrl(null);
    try {
      const file = e.target.files[0];
      updateFileUrl(file);
      if (!file) return;
    } catch (e) {
      window.alert(e);
    }
    e.target.value = null;
  };

  const [check, setcheck] = useState(false);
  const handleChange = (checked) => {
    setcheck(checked);
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Header />
        <Leftnav />
        {/* <Rightchat /> */}
        <div className="main-content theme-dark-bg right-chat-active">
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="middle-wrap">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="flex-justify-content w-100 bg-black border-0 d-flex rounded-3">
                    <div className="d-flex w-100 mt-2 p-4 upload">
                      <h4 className="font-md text-white fw-600 ms-4 mb-0 mt-2 ">
                        Upload Videos and Photos
                      </h4>
                    </div>
                  </div>
                  <div className="card-body p-lg-5 p-4 w-100 border-0">
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <div className="form-gorup">
                            <label className="mont-font fw-600 font-md revertcolor p-2">
                              What's happening?
                            </label>
                            <div className="textarea-upload">
                              <HighlightWithinTextarea
                                value={content}
                                highlight={[/#[^ ]*/gi]}
                                onChange={addContent}
                              />
                            </div>
                            <div className="count float-right ml-auto text-grey-400 text-xs font-semibold">
                              {350 - content.length}/350
                            </div>

                            <div className="d-flex justify-content-center m-3">
                              {!fileUrl ? (
                                ""
                              ) : fileUrl.type.indexOf("image") === 0 ? (
                                <img
                                  height={fileUrl ? "200" : "0"}
                                  width="300"
                                  src={
                                    fileUrl
                                      ? URL.createObjectURL(fileUrl)
                                      : null
                                  }
                                  alt={fileUrl ? fileUrl.name : null}
                                />
                              ) : (
                                <video
                                  height={fileUrl ? "300" : "0"}
                                  width="300"
                                  ref={videoRef}
                                  controls
                                >
                                  <source
                                    src={
                                      fileUrl
                                        ? URL.createObjectURL(fileUrl)
                                        : null
                                    }
                                  />
                                </video>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-2" value="saleoption">
                        <div className="col-xl-2 col-xxl-2 col-lg-2 p-0 mt-5 d-flex justify-content-start">
                          <i
                            className="font-xl ti-image d-block p-2 text-grey-500 mediaload"
                            onClick={() => fileUpload.current.click()}
                          ></i>
                          <i
                            className="font-xl ti-video-clapper d-block p-2 text-grey-500 mediaload"
                            onClick={() => fileUpload1.current.click()}
                          ></i>
                          <input
                            type="file"
                            name="file"
                            onChange={capturefile}
                            id="file"
                            className="input-file"
                            ref={fileUpload}
                            accept="image/*"
                            required={true}
                          />
                          <input
                            type="file"
                            name="file"
                            onChange={capturefile}
                            id="file"
                            className="input-file"
                            ref={fileUpload1}
                            accept="video/*"
                            onClick={(e) => (e.target.value = null)}
                            required={true}
                          />
                        </div>
                        <div className="col-xl-5 col-xxl-5 col-lg-5 mt-1">
                          <label className="text-yellow">Payment Option</label>
                          <div className="col-lg-3 mt-3 mb-3 d-flex">
                            <label
                              htmlFor="vcoinradio"
                              className="pl-2 revertcolor mont-font fw-600 font-sm"
                              style={{ marginRight: "15px" }}
                            >
                              Vcoin
                            </label>
                            <Switch
                              checked={check}
                              onChange={handleChange}
                              onColor="#ffde00"
                              onHandleColor="#FFF"
                              handleDiameter={30}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                              height={40}
                              width={80}
                              className="react-switch"
                              id="material-switch"
                            />
                            <label
                              htmlFor="freeradio"
                              className="pl-2 revertcolor mont-font fw-600 font-sm"
                              style={{ marginLeft: "15px" }}
                            >
                              Free
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-3 col-xxl-3 col-lg-3 p-0 mb-0 d-flex justify-content-center">
                          {uploading ? (
                            <Loader
                              type="Oval"
                              color="#000"
                              height={80}
                              width={80}
                            />
                          ) : (
                            <button
                              onClick={Uploadsubmit}
                              className="bg-black text-center text-white font-md fw-600 mt-4 mb-3 p-1 w175 badge-pill d-inline-block"
                            >
                              Post
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="row"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Password;
