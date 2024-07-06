import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import Profiledetail from "../components/Profiledetail";
import ProfilecardThreeSelect from "../components/ProfilecardThreeSelect";
import ProfileHomeSelect from "../components/ProfileHomeSelect";
import Load from "../components/Load";
import api from "../utils/api";
import { useParams } from 'react-router-dom';

import { set_profile } from "../redux/actions/auth";

const UserProfile = () => {
    const { username } = useParams();

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
                                <ProfilecardThreeSelect topUserInfo={username} />
                                <ProfileHomeSelect bottomUserInfo={username} />
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

export default UserProfile;
