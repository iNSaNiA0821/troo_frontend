import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Group from '../components/Group';
import Events from '../components/Events';
import Memberslider from '../components/Memberslider';
import Postmyfeedview from '../components/Postmyfeedview';
// import Load from '../components/Load';
import Never from '../components/Never';
import Pagetitle from '../components/Pagetitle';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
import "./style.css";

const Myfeed = () => {
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
                const res = await api.get('/profile');
                setMyprofile(res.data);
                const res1 = await api.post(`/blog/myfeed/${type}?skip=${skip}&skey=${searchword}`);
                setMyTweets(res1.data);
            }
            if (isauthenticated && user) setblogs();
        });
        return () => {
            clearTimeout(timer);
        }
    }, [isauthenticated, act_tab]);
    useEffect(() => {
        const timer = setTimeout(() => {
            const setblogs = async () => {
                const res = await api.post(`/blog/myfeed/${type}?skip=${skip}&skey=${searchword}`);
                setMyTweets(myTweets.concat(res.data));
            }
            if (isauthenticated && user) setblogs();
        });
        return () => {
            clearTimeout(timer);
        }
    }, [isauthenticated, skip]);
    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(myTweets.length);
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
    const handleCallbackFeed = (childData) => {
        setMyTweets(childData)
    }
    return (
        <Fragment>
            <MainLayout handleScroll={handleScroll}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                <Pagetitle title="My Feed" keyPress={keyPress} sendDataToParent={sendDataToParent} searchword={searchword} searchFunction={searchBlog} />
                                <div className="card shadow-xss w-100 d-block d-flex border-white p-4 mb-3">
                                    <ul className="nav-tabs d-flex border-bottom-0 navbarArea" id="pills-tab" role="tablist">
                                        <li className={act_tab === "" || act_tab === "#all" ? "active list-inline-item" : "list-inline-item"}>
                                            <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#all" data-toggle="tab">All</Link>
                                        </li>
                                        <li className={act_tab === "#video" ? "active list-inline-item" : "list-inline-item"}>
                                            <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#video" data-toggle="tab">Video</Link>
                                        </li>
                                        <li className={act_tab === "#picture" ? "active list-inline-item" : "list-inline-item"}>
                                            <Link className="fw-700 text-grey-500 pb-1 ls-1 d-inline-block" to="#picture" data-toggle="tab">Picture</Link>
                                        </li>
                                        <li className={act_tab === "#popular" ? "active list-inline-item" : "list-inline-item"}>
                                            <Link className="fw-700 text-grey-500 ls-1 d-inline-block" to="#popular" data-toggle="tab">Popular</Link>
                                        </li>
                                        <li className={act_tab === "#Earn" ? "active list-inline-item" : "list-inline-item"}>
                                            <Link className="fw-700 text-grey-500 ls-1 d-inline-block" to="#earn" data-toggle="tab">Earn</Link>
                                        </li>
                                    </ul>
                                </div>
                                {isauthenticated && user && myProfile ?
                                    myTweets.map((array, i) => {
                                        return (
                                            <div key={i} className="w-100" >
                                                <Postmyfeedview parentCallbackT={handleCallbackFeed} addsaveuser={addsaveuser} addlike={addlike} addFollow={addFollow} addReport={addReport} buyVcoin={buyVcoin} Download={Download} blogItem={array} myProfile={myProfile} />
                                            </div>
                                        );
                                    }
                                    ) : ""}
                                {myTweets.length == 0 ? <Never /> : ""}
                            </div>
                            <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                                <div className="card w-100 shadow-xss border-white mb-3">
                                    <div className="card-body d-flex align-items-center  p-4">
                                        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Trending</h4>
                                    </div>
                                    <Memberslider />
                                </div>
                                <Group />
                                <Events />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </Fragment>
    );
}

export default Myfeed;