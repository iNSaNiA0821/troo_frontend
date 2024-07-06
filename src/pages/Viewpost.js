import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from '../layouts/MainLayout';
import Group from '../components/Group';
import Events from '../components/Events';
import Memberslider from '../components/Memberslider';
import Postview from '../components/Postview';
import Load from '../components/Load';
import Pagetitle from '../components/Pagetitle';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
const Viewpost = () => {
    let { blogid } = useParams();
    const dispatch = useDispatch();
    const [myTweets, setMyTweets]=useState([]);
    const [myProfile, setMyprofile]=useState([]);
    const [searchword, setSearchword]=useState('');
    const {
        user, vcoin, isauthenticated
    } = useSelector(state => state.auth); // here, indicate reducer
    
    useEffect(() => {
        const setblogs = async()=>{
            const res1= await api.get('/profile');
            setMyprofile(res1.data);
            const res= await api.get(`/blog/${blogid}`);
            setMyTweets(res.data);
        }
        if(isauthenticated&&user) setblogs();
    },[isauthenticated]);

    const sendDataToParent = (index) => { // the callback. Use a search word
        setSearchword(index);
    };
    const keyPress = async (keyCode,e) => { // the callback. Use a keycode    
        if(keyCode===13&&searchword!==""){
            e.preventDefault();            
            // var res=await RegisterContract.userAddressFromUsername(searchword);

        }
        if(keyCode===13&&searchword===""){
            e.preventDefault();            
        }
    };
    const buyVcoin=async(id,price)=>{ 
        if(vcoin<price*50)
            window.alert("Wallet balance is not enough to buy");
        else
            await Download(id);
    }
    const Download=async(id)=>{
        myTweets.map((Tweet,i)=>{
            let filename;
            if(id==Tweet._id){
                if(Tweet.filetype==="video")
                    filename=Tweet.tokenName+'.mp4';
                else filename=Tweet.tokenName+'.jpg';
                axios.get(Tweet.originmetaurl, {
                    responseType: 'blob',
                })
                .then(async(res) => {
                   await fileDownload(res.data, filename);
                    
                })
            }
        }) 
    }
    const addlike = async(id)=>{
        try {
            await api.put(`/blog/like/${id}`);
            const res= await api.get('/blog');
            setMyTweets(res.data);
            
        } catch (error) {
            console.log("error",error.response.data);
        }
    }
    const addsaveuser = async(id)=>{
        try {
            await api.put(`/blog/saveuser/${id}`);
            const res= await api.get('/blog');
            setMyTweets(res.data);
            
        } catch (error) {
            console.log("error",error.response.data);
        }
    }
    const addFollow = async(id)=>{
        try {
            await api.put(`/profile/follow/${id}`);
            const res= await api.get('/profile');
            setMyprofile(res.data);
        } catch (error) {
            console.log("error",error.response.data);
        }
    }
    const addReport = async(id)=>{
        try {
            await api.put(`/blog/report/${id}`);
            const res= await api.get('/blog');
            setMyTweets(res.data);
            
        } catch (error) {
            console.log("error",error.response.data);
        }
    }

    return (
        <Fragment>           
            <MainLayout>
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-12 col-xxl-9 col-lg-8">
                                {isauthenticated&&user?
                                myTweets.map((array,i)=>{
                                    return(
                                        <div key={i} className="w-100" >
                                            {/* <Videoslider id={array.tokenId} time="times"  user={array.currentOwner} avater="user.png" videourl={array.tokenURI} videoimage="user.png"  des={array.tokenName}/> */}
                                            <Postview addsaveuser={addsaveuser} addlike={addlike} addFollow={addFollow} addReport={addReport} buyVcoin={buyVcoin} Download={Download} avater="user.png" creator={array.creator} date={user.date} id={array._id} time={array.date} price={array.price} des={array.description}  videoOption={array.filetype} sourceURI={array.markedmetaurl} likes={array.likes.length} comments={array.reposts.length} saveusers={array.saveusers} reporters={array.reporters} followings={myProfile.following} lat={array.lat} lng={array.lng} />                                
                                        </div>
                                        );
                                    }
                                ):""}
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </Fragment>
    );
}

export default Viewpost;