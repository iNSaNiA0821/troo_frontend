import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Load from '../components/Load';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import { Player } from 'video-react';

const videoList = [
    {
        time: '13 seconds',
        user: 'Don Ng',
        avater: 'user.png',
        videourl: 'RPReplay_Final1627904874.mp4',
        videoimage: 'poster-1.png',
        des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
    },
    {
        time: '39 seconds',
        user: 'Hurin Seary',
        avater: 'user.png',
        videourl: 'bandicam 2021-07-26 20-15-21-110.mp4',
        videoimage: 'poster-2.png',
        des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus',
    },
]

class Videos extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Leftnav />
                {/* <Rightchat /> */}

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    {videoList.map((value, index) => (
                                        <div key={index} className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                            <div className="card-body p-0 d-flex">
                                                <figure className="avatar me-3"><img src={`assets/images/${value.avater}`} alt="video" className="shadow-sm rounded-circle w45" /></figure>
                                                <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {value.user}<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {value.time}</span></h4>
                                                <Link to="/defaultvideo" className="ms-auto"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></Link>
                                            </div>

                                            <div className="card-body p-10 mb-3 rounded-3 overflow-hidden">
                                                <Player
                                                    poster={`assets/images/${value.videoimage}`}
                                                    src={`assets/images/${value.videourl}`}
                                                />
                                            </div>
                                            <div className="card-body p-0 me-lg-5">
                                                <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-0"> {value.des}<Link className="hashtop" to=""> #apple tv</Link></p>
                                            </div>
                                            <div className="card-body d-flex p-0 mt-3">
                                                <div className="card-body p-0 d-flex">
                                                    <Link to="/bookmark" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span className="d-none-xss">22</span></Link>
                                                </div>
                                                <div className="card-body p-0 d-flex">
                                                    <Link to="/defaultvideo" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-repeat text-dark text-grey-900 btn-round-sm font-lg"></i><span className="d-none-xss">110</span></Link>
                                                </div>
                                                <div className="card-body p-0 emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2" onClick={this.toggleActive}><i className="feather-heart text-red me-2 btn-round-xs font-lg"></i><span className="d-none-xss text-red">2</span></div>
                                                <div className={`card-body p-0 pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss`} data-bs-toggle="dropdown" aria-expanded="false" onClick={this.toggleOpen}><i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-md"></i><span className="d-none-xs">Share</span></div>
                                                <div className="card-body p-0 d-flex">
                                                    <Link to="/defaultvideo" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-download text-dark btn-round-sm font-md"></i><span className="d-none-xs">Buy</span></Link>
                                                </div>
                                                <div className="card-body p-0 d-flex">
                                                    <Link to="/defaultvideo" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-award text-dark btn-round-sm font-md"></i><span className="d-none-xs">NFT</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Load />
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
}

export default Videos;