import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import ProfilePostview from '../components/ProfilePostview';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
import "../pages/style.css";

const ProfileViewSelect = (props) => {
    const location = useLocation();
    const act_tab = location.hash;
    const type = act_tab ? act_tab.replace("#", "") : "all";

    const dispatch = useDispatch();
    const [myTweets, setMyTweets] = useState([]);
    const [skip, setSkip] = useState(0);
    const [myProfile, setMyprofile] = useState(null);
    const [searchword, setSearchword] = useState('');
    const {
        user, vcoin, isauthenticated
    } = useSelector(state => state.auth); // here, indicate reducer
    useEffect(() => {
        const timer = setTimeout(() => {
            const setblogs = async () => {
                setSkip(0);
                const res = await api.post('/profile/viewProfile', { select_name: props.userID });
                setMyprofile(res.data);
                // console.log(2222, res.data._id)
                const res1 = await api.post(`/blog/myfeed/${type}?skip=${skip}&skey=${searchword}`, { select_id: res.data._id, flag: "viewUserProfile" });
                // console.log(123, res1.data)
                setMyTweets(res1.data);
            }
            if (isauthenticated && user) setblogs();
        });
        return () => {
            clearTimeout(timer);
        }
    }, [isauthenticated, act_tab]);
    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(myTweets.length);
            // console.log(skip);
        }
    }
    const sendDataToParent = (index) => { // the callback. Use a search word
        setSearchword(index);
    };
    const keyPress = async (keyCode, e) => { // the callback. Use a keycode    
        if (keyCode === 13) {
            e.preventDefault();
            searchBlog();
        }
    };
    const searchBlog = async () => {
        try {
            setSkip(0);
            const res = await api.post(`/blog/myfeed/${type}?skip=${skip}&skey=${searchword}`);
            setMyTweets(res.data);
        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    const buyVcoin = async (id, price) => {
        if (vcoin < price * 50)
            window.alert("Wallet balance is not enough to buy");
        else
            await Download(id);
    }
    const Download = async (id) => {
        myTweets.map((Tweet, i) => {
            let filename;
            if (id == Tweet._id) {
                if (Tweet.filetype === "video")
                    filename = Tweet.tokenName + '.mp4';
                else filename = Tweet.tokenName + '.jpg';
                axios.get(Tweet.originmetaurl, {
                    responseType: 'blob',
                })
                    .then(async (res) => {
                        await fileDownload(res.data, filename);

                    })
            }
        })
    }
    const addlike = async (id) => {
        try {
            await api.put(`/blog/like/${id}`);
            const res = await api.post(`/blog/myfeed/${type}`);
            setMyTweets(res.data);

        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    const addsaveuser = async (id) => {
        try {
            await api.put(`/blog/saveuser/${id}`);
            const res = await api.post(`/blog/myfeed/${type}`);
            setMyTweets(res.data);

        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    const addFollow = async (id) => {
        try {
            await api.put(`/profile/follow/${id}`);
            const res = await api.get('/profile');
            setMyprofile(res.data);
        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    const addReport = async (id) => {
        try {
            await api.put(`/blog/report/${id}`);
            const res = await api.post(`/blog/myfeed/${type}`);
            setMyTweets(res.data);

        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    return (
        <Fragment>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row feed-body">
                        <div className="col-12">
                            <div className="card shadow-xss w-100 d-block d-flex border-white p-4 pb-0 mb-3">
                                <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0" id="pills-tab" role="tablist">
                                    <li className={act_tab === "" || act_tab === "#all" ? "active list-inline-item" : "list-inline-item"}>
                                        <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#all" data-toggle="tab">All</Link>
                                    </li>
                                    <li className={act_tab === "#video" ? "active list-inline-item" : "list-inline-item"}>
                                        <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#video" data-toggle="tab">Video</Link>
                                    </li>
                                    <li className={act_tab === "#picture" ? "active list-inline-item" : "list-inline-item"}>
                                        <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#picture" data-toggle="tab">Picture</Link>
                                    </li>
                                    <li className={act_tab === "#Likes" ? "active list-inline-item" : "list-inline-item"}>
                                        <Link className="fw-700 text-grey-500 ls-1 d-inline-block" to="#Likes" data-toggle="tab">Likes</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card shadow-xss w-100 d-block d-flex border-white p-4 pb-0 mb-3">
                                <table class="table tablerevertcolor">
                                    <thead>
                                        <tr style={{ textAlign: "center" }}>
                                            <th scope="col" width="20%">File</th>
                                            <th scope="col" width="30%">Content</th>
                                            <th scope="col" width="30%">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isauthenticated && user && myProfile ?
                                            myTweets.map((array, i) => {
                                                return (
                                                    <ProfilePostview addsaveuser={addsaveuser} addlike={addlike} addFollow={addFollow} addReport={addReport} buyVcoin={buyVcoin} Download={Download} blogItem={array} myProfile={myProfile} />
                                                );
                                            }
                                            ) : ""}
                                        {myTweets.length == 0 ? <td colspan={5} className="text-center text-center text-white rounded-xxl border-0 p-4 mb-3 mt-3">0 Result</td> : ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}

export default ProfileViewSelect;