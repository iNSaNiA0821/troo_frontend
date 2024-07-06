import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import Slider from "react-slick";
import { Player } from 'video-react';
import fileDownload from 'js-file-download';
import axios from 'axios';
import api from '../utils/api';
const Myfeed =()=> {
    const {
        isauthenticated, user
    } = useSelector(state => state.auth); // here, indicate reducer

    const [myTweets, setMyTweets]=useState([]);
        // if(loading){
        // const my_crypto_boys= Tweets[0].filter(
        //     (Tweet) => Tweet.currentOwner == accountAddress
        //   );
      
    useEffect(() => {
        const setblogs = async()=>{
            const res= await api.post('/blog/myfeed');
            setMyTweets(res.data);
        }
        if(isauthenticated) setblogs();
    },[isauthenticated]);
    
    const membersettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
    };
    const download=(e)=>{
        const id=e.target.id;
        // Tweets[0].map((Tweet,i)=>{
        //     let filename;
        //     if(id==Tweet.tokenId){
        //         if(Tweet.filetype)
        //             filename=Tweet.tokenName+'.mp4';
        //         else filename=Tweet.tokenName+'.jpg';
        //         axios.get(Tweet.tokenURI, {
        //             responseType: 'blob',
        //         })
        //         .then((res) => {
        //             fileDownload(res.data, filename);
        //         })
        //     }
        // })       
    }
    return (
        <Fragment>
            <Header />
            <Leftnav />
            {/* <Rightchat /> */}

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <Pagetitle title="My Feed" />
                                <div className="row ps-2 pe-1">
                                    { myTweets.map((Tweet,i)=> {
                                        return(
                                            <div
                                                key={i}
                                                className="w-50 mt-2">
                                                {Tweet.filetype==="video"?                                                    
                                                    <Slider {...membersettings}>
                                                    <div className="d-block mb-3 overflow-hidden" style={{width:'100%'}}>
                                                        <Player
                                                            poster={`assets/images/poste.jpg`}
                                                            src={Tweet.markedmetaurl}
                                                        />
                                                    </div></Slider>:
                                                    <img width="100%" height="300" alt="maskimage" src={Tweet.markedmetaurl}></img>
                                                }
                                               <h3 className="mt-2">Description: {Tweet.description}</h3>
                                               <h3>price: {Number(Tweet.price)} Vcoin</h3>
                                               <button className="form-control badge-pill text-center text-white fw-600 bg-dark mb-3 border-0 p-0 " id={Tweet._id} onClick={download}>Change SaleOption</button>
                                            </div>                                            
                                        );
                                    })}
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
}

export default Myfeed;