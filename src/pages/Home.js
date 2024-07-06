import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Group from '../components/Group';
import Events from '../components/Events';
import Memberslider from '../components/Memberslider';
import Postview from '../components/Postview';
import Never from '../components/Never';
import Pagetitle from '../components/Pagetitle';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const [myTweets, setmyTweets] = useState([]);
    const [skip, setSkip] = useState(0);
    const [myProfile, setMyprofile] = useState();
    const [searchword, setSearchword] = useState('');
    const history = useHistory()
    const {
        user, vcoin, isauthenticated
    } = useSelector(state => state.auth); // here, indicate reducer
    const location = useLocation();
    const hashtag = location.hash;
    useEffect(() => {
        const timer = setTimeout(() => {
            const setblogs = async () => {
                setSkip(0);
                const res = await api.get('/profile');
                setMyprofile(res.data);
                const res1 = await api.get(`/blog?skip=${skip}&skey=${searchword}`);
                setmyTweets(res1.data);
            }
            if (isauthenticated && user) setblogs();
        });
        return () => {
            clearTimeout(timer);
        }
    }, [isauthenticated]);

    useEffect(() => {
        const setblogs = async () => {
            setSkip(0);
            setSearchword(hashtag);
            let res;
            res = await api.get(`/blog?skip=${0}&tag=${hashtag.replace("#", "")}`);
            setmyTweets(res.data);
        }
        if (isauthenticated && user) setblogs();
    }, [hashtag]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        const setblogs = async () => {
            if (offsetHeight + scrollTop >= scrollHeight) {
                setSkip(myTweets.length)
                let res;
                if (hashtag)
                    res = await api.get(`/blog?skip=${myTweets.length}&tag=${hashtag.replace("#", "")}`);
                else
                    res = await api.get(`/blog?skip=${myTweets.length}&skey=${searchword}`);
                setmyTweets(myTweets.concat(res.data));
            }
        }
        if (isauthenticated && user) setblogs();
    }

    const sendDataToParent = (index) => { // the callback. Use a search word
        setSearchword(index);
    };
    const keyPress = async (keyCode, e) => { // the callback. Use a keycode    
        if (keyCode === 13) {
            e.preventDefault();
            setSearchword(e.target.value);
            // var res=await RegisterContract.userAddressFromUsername(searchword);
            searchBlog(e.target.value);
        }
    };
    const searchBlog = async (skey) => {
        try {
            history.push("/home");
            setSearchword(skey);
            let skip = 0;
            setSkip(0);
            let res;
            res = await api.get(`/blog?skip=${0}&skey=${skey}`);
            setmyTweets(res.data);
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
                        await addDownload(id);
                    })
            }
        })
    };
    const addDownload = async (id) => {
        try {
            await api.put(`/blog/download/${id}`);
            const res = await api.get(`/blog?skip=${skip}&skey=${searchword}`);
            setmyTweets(res.data);

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

    const handleCallbackT = (childData) => {
        setmyTweets(childData);
    }

    return (
        <Fragment>
            <MainLayout handleScroll={handleScroll}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                <Pagetitle title="Home" keyPress={keyPress} sendDataToParent={sendDataToParent} searchword={searchword} searchFunction={searchBlog} />
                                {isauthenticated && myTweets.length > 0 && myProfile !== undefined ?
                                    myTweets.map((array, i) => {
                                        return (
                                            <div key={i} className="w-100" >
                                                <Postview flag={true} parentCallbackT={handleCallbackT} addFollow={addFollow} buyVcoin={buyVcoin} Download={Download} blogItem={array} myProfile={myProfile} />
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

export default Home;