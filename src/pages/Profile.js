import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import Profiledetail from "../components/Profiledetail";

import ProfilecardThree from "../components/ProfilecardThree";
import ProfileHome from "./ProfileHome";

import Load from "../components/Load";
import api from "../utils/api";
import { set_profile } from "../redux/actions/auth";

const Profile = () => {
  let dispatch = useDispatch();
  const { user, vcoin, isauthenticated } = useSelector((state) => state.auth);
  const [myLikeTweets, setMyLikeTweets] = useState([]);

  useEffect(() => {
    const setblogs = async () => {
      const res = await api.get("/profile");
      dispatch(set_profile(res.data));
    };
    if (isauthenticated) setblogs();
  }, [isauthenticated]);
  return (
    <Fragment>
      <Header />
      <Leftnav />
      {/* <Rightchat /> */}
      <div className="main-content right-chat-active theme-dark-bg">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12 mb-3">
                <ProfilecardThree />
                <ProfileHome />
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

export default Profile;
