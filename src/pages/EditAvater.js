import React, { Component, Fragment, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import getCroppedImg from "../components/getCroppedImg";
import "../../public/assets/css/profile.css";
import api from "../utils/api";
import axios from "axios";
import { set_profile } from "../redux/actions/auth";
import Cropper from 'react-easy-crop'

const EditAvatar = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [imageUrl, setImageUrl] = useState("");

  const [crop, setCrop] = useState({ x: 900, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)


  const canvasRef = useRef(null);

  const { user, isauthenticated } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const setblogs = async () => {
        const res = await api.get("/profile");
        setAvatar(res.data.avatar);
      };
      if (isauthenticated) setblogs();
    });
    return () => {
      clearTimeout(timer);
    };
  }, [isauthenticated]);

  const saveAvatar = (file) => {
    let formData = new FormData();
    formData.append("backimage", "");
    formData.append("backimagemain", "");

    if (file) {
      formData.append("avatarMain", imageUrl ? imageUrl : avatar + "main");
      formData.append("avatar", file);
      axios
        .post("http://localhost:4000/api/profile", formData, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
          timeout: 20000,
        })
        .then(function (res) {
          dispatch(set_profile(res.data));
          history.push("/editprofile");
        });
    } else {
      history.push("/editprofile");
    }
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };
  const loadFile = function (event) {
    var myImg = document.getElementById("outputPhoto");
    if (event.target.files && event.target.files[0]) {
      setImageUrl(event.target.files[0]);
    }
  };
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageUrl ? URL.createObjectURL(imageUrl) : avatar + "main",
        croppedAreaPixels,
        rotation
      )

      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      await saveAvatar(file);
    } catch (e) {
      await saveAvatar("");
    }
  }, [imageUrl ? URL.createObjectURL(imageUrl) : avatar, croppedAreaPixels, rotation])
  return (
    <Fragment>
      <Header />
      <Leftnav />
      {/* <Rightchat /> */}

      <div className="main-content theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-white bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <h4 className="font-xxl fw-700 mont-font font-md-xs">
                        <div className="mainTitle">Edit Photo</div>
                        <hr />
                        <div className="d-flex">
                          <div className="col-lg-12 d-flex justify-content-center align-items-center photoArea">
                            <Cropper
                              image={imageUrl ? URL.createObjectURL(imageUrl) : avatar + "main"}
                              crop={crop}
                              rotation={rotation}
                              zoom={zoom}
                              aspect={4 / 4}
                              onCropChange={setCrop}
                              onRotationChange={setRotation}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                              showGrid={false}
                            />
                            <input
                              type="file"
                              className="upload"
                              id="upload"
                              onChange={loadFile}
                            />
                          </div>
                          <div className="spaceArea"></div>
                          <div className="d-flex justify-content-center align-items-center flex-column toolArea">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="m-2 border border-light border-1 d-flex justify-content-center align-items-center p-1 text-white text-center cursor-pointer plusbtn" onClick={() => {
                                if (zoom <= 3)
                                  setZoom(zoom + 0.1)
                              }}>
                                <i className="feather-plus fw-600"></i>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <div className="m-2 border border-light border-1 d-flex justify-content-center align-items-center p-1 text-white text-center cursor-pointer minusbtn" onClick={() => {
                                if (zoom >= 1)
                                  setZoom(zoom - 0.1)
                              }}>
                                <i className="feather-minus fw-600"></i>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <div className="m-2 border border-light border-1 d-flex justify-content-center align-items-center p-1 text-white text-center cursor-pointer rotatebtn" onClick={() => setRotation(rotation + 10)}>
                                <i className="feather-rotate-cw fw-600"></i>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                              <div className="m-2 border border-light border-1 d-flex justify-content-center align-items-center p-1 text-white text-center cursor-pointer rotatebtn" onClick={() => setRotation(rotation - 10)}>
                                <i className="feather-rotate-ccw fw-600"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center">
                          <div className="ProfileUploadBtn" onClick={() => { document.getElementById('upload').click(); }}>
                            <i className="feather-upload fw-600" />
                            {/* upload */}
                          </div>
                          <div className="spaceArea"></div>
                          <div className="ProfileSaveBtn" onClick={() => showCroppedImage()}>
                            <i className="feather-eye fw-600" />
                            {/* save */}
                          </div>
                        </div>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <Popupchat />
      <Appfooter />
    </Fragment>
  );
};

export default EditAvatar;
