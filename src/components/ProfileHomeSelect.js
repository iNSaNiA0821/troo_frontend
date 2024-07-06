import React, { useState, useEffect, Fragment, } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import PostviewProfileSelect from '../components/PostviewProfileSelect';
// import Load from '../components/Load';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
const ProfileHomeSelect = (props) => {
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
                const res1 = await api.post('/profile/viewProfile', { select_name: props.bottomUserInfo });
                setMyprofile(res1.data);
                // const res = await api.get(`/blog?skip=${skip}&skey=${searchword}`);
                // setmyTweets(res.data);
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

    return (
        <Fragment>
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left d-flex justify-content-center">
                    <div className="w-100 rounded">
                        <PostviewProfileSelect addFollow={addFollow} buyVcoin={buyVcoin} Download={Download} myProfile={myProfile} userID={props.bottomUserInfo} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileHomeSelect;