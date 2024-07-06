import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Player } from 'video-react';
const memberList = [
    {
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Aliqa Macale ',
        email: 'support@gmail.com',
    },
    {
        bgUrl: 'story.png',
        imageUrl: 'user.png',
        name: 'Seary Victor ',
        email: 'support@gmail.com',
    }
]
const videoList = [
    {
        time: '13 seconds',
        user: 'Don Ng',
        avater: 'user.png',
        videourl: 'NFT based photo marketplace.mp4',
        videoimage: 'poster-1.png',
        des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
    }
]
const Videoslider =([id,time,user,avater,videourl,videoimage,des])=> {
    const membersettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
    };
    return (
        <Slider {...membersettings}>
                <div id={id} className="card w300 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-3">
                    <div className="card-body p-10 d-flex">
                        <figure className="avatar me-3"><img src={`assets/images/${avater}`} alt="video" className="shadow-sm rounded-circle w45" /></figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {user} <a className="mentiontag" href="#"> @{user}</a><span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {time}</span></h4>
                        <a href="/defaultvideo" className="ms-auto"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                    </div>

                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                        <Player
                            poster={`assets/images/${videoimage}`}
                            src={`assets/images/${videourl}`}
                        />
                    </div>
                    <div className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                        <h4 className="fw-700 font-xsss mt-2 mb-1">{des}<a className="hashtop" href="">#apple tv</a> </h4>
                        <div className="clearfix mb-2"></div>
                    </div>
                </div>
            {/* {memberList.map((value , index) => (
            <div key={index} className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-3">
                <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{backgroundImage: `url("assets/images/${value.bgUrl}")`}}></div>
                <div className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                    <figure className="avatar overflow-hidden ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100" /></figure>
                    <div className="clearfix"></div>
                    <h4 className="fw-700 font-xsss mt-2 mb-1">{value.name} </h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">{value.email}</p>
                    <span className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                    <div className="clearfix mb-2"></div>
                </div>
            </div>
            ))} */}
        </Slider>
    );
}

export default Videoslider;