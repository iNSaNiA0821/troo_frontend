import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import api from "../utils/api";
import { useLocation } from "react-router-dom";
const ProfilecardThree = () => {
  const [formData, setFormData] = useState({
    name: "unset",
    bio: "unset",
    city: "unset",
    country: "unset",
    avatar: "../../assets/images/anonymous.PNG",
    backimg: "https://via.placeholder.com/460x460?text=+",
    following: 0,
    followers: 0,
    date: null,
  });
  const location = useLocation();
  const act_tab = location.hash;
  const {
    name,
    bio,
    city,
    country,
    avatar,
    backimg,
    following,
    followers,
    date,
  } = formData;
  const [{ pictures, videos, downloads }, setasset] = useState({});
  const { profile, user } = useSelector((state) => state.auth); // here, indicate reducer
  useEffect(() => {
    const timer = setTimeout(() => {
      const setblogs = async () => {
        const res = await api.post("/blog/myfeeds/assetcount", { selectId: user.name, flag: "viewUserProfile" });
        if (res)
          setasset({
            pictures: res.data.images,
            videos: res.data.videos,
            downloads: res.data.downloads.length,
          });
      };
      if (profile) {
        setblogs();
        setFormData({
          name: profile.name ? profile.name : name,
          bio: profile.bio ? profile.bio : bio,
          city: profile.city ? profile.city : city,
          country: profile.country ? profile.country : country,
          avatar: profile.avatar ? profile.avatar : avatar,
          backimg: profile.backimg ? profile.backimg : backimg,
          following: profile.following.length,
          followers: profile.followers.length,
          date: profile.date,
        });
      }
    });
    return () => {
      clearTimeout(timer);
    };
  }, [profile]);
  return (
    <div className="card w-100 border-white p-0 bg-white shadow-xss rounded-xxl">
      <div
        className="card-body h250 p-0 rounded-xxl overflow-hidden m-3"
        style={{
          height: "250px",
          backgroundImage: `url(${backimg})`,
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="card-body p-2 position-relative">
        <figure
          className="avatar position-absolute w100 z-index-2"
          style={{ top: "-40px", left: "30px" }}
        >
          <img
            src={avatar}
            alt="avater"
            className="float-right p-1 bg-white rounded-circle w-100"
          />
        </figure>
        <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-2 pl-15">
          {name}{" "}
          <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
            {format(new Date(date), "MMMM yyyy")} Updated
          </span>
        </h4>
        <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
          <Link
            to="/editprofile"
            className="d-none d-lg-block p-2 z-index-1 rounded-3 font-xsssss text-uppercase fw-700 ls-3"
            style={{ backgroundColor: "lightgray", color: "black" }}
          >
            Edit profile
          </Link>
          <div
            className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
            aria-labelledby="dropdownMenu4"
          >
            <div className="card-body p-0 d-flex">
              <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
              <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                Save Link{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                  Add this to your saved items
                </span>
              </h4>
            </div>
            <div className="card-body p-0 d-flex mt-2">
              <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
              <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                Hide Post{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className="card-body p-0 d-flex mt-2">
              <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
              <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                Hide all from Group{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                  Save to your saved items
                </span>
              </h4>
            </div>
            <div className="card-body p-0 d-flex mt-2">
              <i className="feather-lock text-grey-500 me-3 font-lg"></i>
              <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">
                Unfollow Group{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                  Save to your saved items
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="card-body d-flex mt-2 pt-0">
          <i className="feather-info text-grey-500 me-3 font-lg"></i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-0 d-contents">{bio}</h4>
        </div>
        <div className="card-body d-flex pt-0">
          <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            {city},&nbsp;{country}
          </h4>
        </div>
        <div className="card-body d-flex pt-0">
          <i className="feather-users text-grey-500 me-3 font-lg"></i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            Following {following} &nbsp;&nbsp;&nbsp; Followers {followers}
          </h4>
        </div>
        <div className="card-body d-flex pt-0">
          <i className="feather-camera text-grey-500 me-3 font-lg"></i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            Pictures {pictures} &nbsp;&nbsp;&nbsp; Videos {videos}
          </h4>
        </div>
        <div className="card-body d-flex pt-0">
          <i className="feather-download text-grey-500 me-3 font-lg"></i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            Downloads {downloads}{" "}
          </h4>
        </div>
      </div>
      {/*
            <div className="card-body d-block w-100 shadow-none mt-3 mb-0 p-0 border-top-xs">
                <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                    <li className={act_tab === "" || act_tab === "#posts" ? "active list-inline-item me-5" : "list-inline-item me-5"}>
                        <a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#posts" data-toggle="tab">Posts</a>
                    </li>
                    <li className={act_tab === "#reposts" ? "active list-inline-item me-5" : "list-inline-item me-5"}><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#reposts" data-toggle="tab">Reposts&Replies</a></li>
                    <li className={act_tab === "#likes" ? "active list-inline-item me-5" : "list-inline-item me-5"}><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#likes" data-toggle="tab">Likes</a></li>
                </ul>
            </div>
            */}
    </div>
  );
};

export default ProfilecardThree;
