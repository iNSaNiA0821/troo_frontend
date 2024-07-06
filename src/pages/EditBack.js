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

const Settings = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    const [imageUrl, setImageUrl] = useState("");


    const [crop, setCrop] = useState({ x: 900, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    // const [croppedImage, setCroppedImage] = useState(null)


    const canvasRef = useRef(null);

    const { user, isauthenticated } = useSelector((state) => state.auth);

    const [backimg, setBackimg] = useState("");

    let canvas;
    var ctx;
    useEffect(() => {
        const timer = setTimeout(() => {
            const setblogs = async () => {
                const res = await api.get("/profile");
                setBackimg(res.data.backimg);
            };
            if (isauthenticated) setblogs();
        });
        return () => {
            clearTimeout(timer);
        };
    }, [isauthenticated]);



    // useEffect(() => {
    //  canvas = canvasRef.current;
    //   ctx= canvas.getContext("2d");
    //   var img = document.getElementById("outputPhoto");
    //   ctx.drawImage(img,10,10);

    //   console.log(canvas.toDataURL("image/png"))
    // }, [imageUrl])

    const saveAvatar = (file) => {
        // e.preventDefault();
        let formData = new FormData();
        formData.append("avatar", "");
        formData.append("avatarMain", "");

        if (file) {
            formData.append("backimagemain", imageUrl ? imageUrl : backimg + "main");
            formData.append("backimage", file);
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
        // console.log(myImg.clientWidth, myImg.clientHeight);
        if (event.target.files && event.target.files[0]) {
            // let reader = new FileReader();
            // reader.onload = (e) => {
            setImageUrl(event.target.files[0]);
            // };
            // reader.readAsDataURL(event.target.files[0])
        }
    };
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageUrl ? URL.createObjectURL(imageUrl) : backimg + "main",
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage });

            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            await saveAvatar(file);
        } catch (e) {
            await saveAvatar("");
        }
    }, [imageUrl ? URL.createObjectURL(imageUrl) : backimg + "main", croppedAreaPixels, rotation])
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
                                            <h4 className="font-xxl fw-700 mont-font font-md-xs mainArea">
                                                <div className="mainTitle">Edit Background</div>
                                                <hr />
                                                <div className="d-flex">
                                                    <div className="col-lg-12 d-flex justify-content-center align-items-center rounded editbackArea" style={{ position: "relative" }}>
                                                        <Cropper
                                                            image={imageUrl ? URL.createObjectURL(imageUrl) : backimg + "main"}
                                                            crop={crop}
                                                            aspect={3 / 1}
                                                            onCropChange={setCrop}
                                                            // onRotationChange={setRotation}
                                                            onCropComplete={onCropComplete}
                                                            // onZoomChange={setZoom}
                                                            showGrid={false}
                                                        />
                                                        <input
                                                            type="file"
                                                            className="upload"
                                                            id="upload"
                                                            onChange={loadFile}
                                                        />

                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-center">
                                                    <div className="ProfileSaveBtn" onClick={() => {
                                                        document.getElementById('upload').click();
                                                    }} >
                                                        <i className="feather-upload fw-600" />
                                                    </div>
                                                    <div className="spaceArea"></div>
                                                    <div className="ProfileSaveBtn" onClick={() => showCroppedImage()}><i className="feather-eye fw-600" /></div>
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

export default Settings;
