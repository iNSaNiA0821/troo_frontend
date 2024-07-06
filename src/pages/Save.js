import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from '../layouts/MainLayout';
import Group from '../components/Group';
import Events from '../components/Events';
import Memberslider from '../components/Memberslider';
import Postsaveview from '../components/Postsaveview';
import Load from '../components/Load';
import Pagetitle from '../components/Pagetitle';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
import Never from '../components/Never';
const Home = () => {
    const dispatch = useDispatch();
    const [myTweets, setMyTweets] = useState([]);
    const [skip, setSkip] = useState(0);
    const [myProfile, setMyprofile] = useState(null);
    const [searchword, setSearchword] = useState('');
    const {
        user, vcoin, isauthenticated
    } = useSelector(state => state.auth); // here, indicate reducer

    useEffect(() => {
        const setblogs = async () => {
            setSkip(0);
            const res = await api.get('/profile');
            setMyprofile(res.data);
            const res1 = await api.post(`/blog/myfeed?skip=${skip}&skey=${searchword}`);
            setMyTweets(res1.data);
        }
        if (isauthenticated && user) setblogs();
    }, [isauthenticated]);

    useEffect(() => {
        const setblogs = async () => {
            const res = await api.post(`/blog/myfeed?skip=${skip}&skey=${searchword}`);
            setMyTweets(myTweets.concat(res.data));
        }
        if (isauthenticated && user) setblogs();
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target
        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(myTweets.length)
        }
    }

    const sendDataToParent = (index) => { // the callback. Use a search word
        setSearchword(index);
    };
    const keyPress = async (keyCode, e) => { // the callback. Use a keycode    
        if (keyCode === 13) {
            e.preventDefault();
            searchBlog();
            // var res=await RegisterContract.userAddressFromUsername(searchword);

        }
        if (keyCode === 13 && searchword === "") {
            e.preventDefault();
        }
    };
    const searchBlog = async () => {
        try {
            setSkip(0);
            const res = await api.post(`/blog/mysave?skip=${skip}&skey=${searchword}`);
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
            <MainLayout handleScroll={handleScroll}>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                <Pagetitle title="Save" keyPress={keyPress} sendDataToParent={sendDataToParent} searchword={searchword} searchFunction={searchBlog} />
                                {isauthenticated && user && myProfile ?
                                    myTweets.map((array, i) => {
                                        return (
                                            <div key={i} className="w-100" >
                                                {/* <Videoslider id={array.tokenId} time="times"  user={array.currentOwner} avater="user.png" videourl={array.tokenURI} videoimage="user.png"  des={array.tokenName}/> */}
                                                <Postsaveview addFollow={addFollow} buyVcoin={buyVcoin} Download={Download} blogItem={array} myProfile={myProfile} />
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