import React, { useEffect, useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { rgba } from "jimp";
import api from "../utils/api";
import axios from "axios";
import { set_profile } from "../redux/actions/auth";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const Account = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  // const [myProfile, setMyProfile]=useState([]);
  const { user, isauthenticated } = useSelector((state) => state.auth);
  const [profileData, setprofileData] = useState({
    name: "",
    city: "",
    country: "",
  });

  const [imgData, setImgData] = useState({
    avatar: null,
    backimage: null,
  });
  const [imgData_save, setSaveImgData] = useState({
    avatar_save: null,
    backimage_save: null,
  });
  const [desc, setdesc] = useState("");
  const { name, city, country } = profileData;
  const { avatar, backimage } = imgData;
  const { avatar_save, backimage_save } = imgData_save;

  useEffect(() => {
    const timer = setTimeout(() => {
      const setblogs = async () => {
        const res = await api.get("/profile");
        // setMyProfile(res.data);
        setprofileData({
          ...profileData,
          name: res.data.name,
          city: res.data.city,
          country: res.data.country,
        });
        setdesc(res.data.bio);
        setSaveImgData({
          ...imgData_save,
          avatar_save: res.data.avatar,
          backimage_save: res.data.backimg,
        });
      };
      if (isauthenticated) setblogs();
    });
    return () => {
      clearTimeout(timer);
    };
  }, [isauthenticated]);

  const onChange = async (e) => {
    setprofileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const capturefile = async (e) => {
    if (e.target.files[0].type.indexOf("image") !== -1)
      setImgData({ ...imgData, [e.target.name]: e.target.files[0] });
    setSaveImgData({ ...imgData_save, avatar_save: "", backimage_save: "" });
  };
  const keydown = (e) => {
    return e.keyCode;
  };
  const eventdesc = (e) => {
    let length = e.target.value.length;
    if (length <= 299) setdesc(e.target.value);
    if (keydown === 8 || keydown === 46) setdesc(e.target.value);
  };
  const saveprofile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("bio", desc);
    formData.append("avatar", "");
    formData.append("backimagemain", "");
    formData.append("backimage", "");
    formData.append("avatarMain", "");
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
        history.push("/profile");
      });
  };
  const selectCountry = (val) => {
    setprofileData({ ...profileData, country: val });
  };
  const selectCity = (val) => {
    setprofileData({ ...profileData, city: val });
  };
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
                <div className="flex-justify-content w-100 d-flex bg-black">
                  <div className="d-flex w-100 mt-2 p-4 settings">
                    <h4 className="font-md text-medium fw-600 ms-4 mb-0 mt-2 ">
                      Update Profile
                    </h4>
                  </div>
                </div>
                <div className="card-body p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <Link
                        to="/editphoto"
                        className="d-none d-lg-block p-2 z-index-1 rounded-3 text-black font-xsssss text-uppercase fw-700 ls-3"
                      >
                        <label htmlFor="avatarfile">
                          <figure className="avatar ms-auto me-auto mb-0 mt-2 mb-4 w100">
                            {avatar_save ? (
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={avatar_save}
                                  alt="avater"
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                  }}
                                  className="shadow-sm w-100"
                                />
                              </div>
                            ) : (
                              <img
                                src={avatar ? URL.createObjectURL(avatar) : "assets/images/anonymous.PNG"}
                                alt="avater"
                                className="shadow-sm rounded-circle w-100"
                              />
                            )}
                          </figure>
                        </label>
                      </Link>
                    </div>
                  </div>

                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            onChange={onChange}
                            value={name}
                            className="form-control font-sm bg-greylight"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                          Bio
                        </label>
                        <textarea
                          value={desc}
                          onChange={eventdesc}
                          onKeyDown={keydown}
                          className="form-control font-sm mb-0 p-3 h100 bg-greylight lh-16"
                          rows="5"
                          placeholder="Write 300 letters about you "
                        ></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Country
                          </label>
                          <CountryDropdown
                            className="form-control revertcolor font-sm bg-greylight"
                            value={country}
                            onChange={(val) => selectCountry(val)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            City
                          </label>
                          <RegionDropdown
                            className="form-control revertcolor font-sm bg-greylight"
                            country={country}
                            value={city}
                            onChange={(val) => selectCity(val)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="card mt-3 border-0">
                          <div className="card-body d-flex justify-content-between align-items-end p-0">
                            <div className="form-group mb-0 w-100">
                              <input
                                type="file"
                                name="backimage"
                                id="file"
                                className="input-file"
                                onChange={capturefile}
                              />
                              {backimage_save ? (
                                <Link to="/editbackground">
                                  <label
                                    // htmlFor="file"
                                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-5 w-100 border-dashed"
                                    style={{
                                      backgroundImage: `url("${backimage_save}")`,
                                      backgroundSize: "100%",
                                    }}
                                  >
                                    <span className="js-fileName">
                                      Pick background
                                    </span>
                                  </label>
                                </Link>
                              ) : (
                                <Link to="/editbackground">
                                  <label
                                    // htmlFor="file"
                                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-5 w-100 border-dashed"
                                    style={{
                                      backgroundImage: `${backimage
                                        ? `url("${URL.createObjectURL(
                                          backimage
                                        )}")`
                                        : `url("https://via.placeholder.com/460x460?text=+")`
                                        }`,
                                      backgroundSize: "100% auto",
                                      backgroundPosition: "center",
                                    }}
                                  >
                                    <span className="js-fileName">
                                      Pick background
                                    </span>
                                  </label>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12 d-flex justify-content-between">
                        <Link
                          to="/profile"
                          className="bg-black text-center text-medium font-xsss fw-600 p-3 w175 badge-pill d-inline-block"
                        >
                          Back
                        </Link>
                        <button
                          onClick={saveprofile}
                          className="bg-black text-center text-medium font-xsss fw-600 p-3 w175 badge-pill d-inline-block"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </Fragment>
  );
};

export default Account;
