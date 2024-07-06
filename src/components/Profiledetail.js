import React, { Component } from 'react';
import { Watermark } from "@hirohe/react-watermark";
import Slider from "react-slick";
import { Player } from "video-react";
import { useLocation } from 'react-router-dom';
import { format, formatDistance } from "date-fns";
import {Row, Col} from "react-bootstrap"
import Profilelikesname from "../components/Profilelikesname"

const Profiledetail =(props)=> {

    const {user, posts, likes} = props;
    const location = useLocation();
    const act_tab = location.hash;

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
            <>
                <div className={act_tab == "" || act_tab == "#posts" ? "" : "d-none"}>
                    {posts.map((value, index) => (
                        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                            <div className="card-body align-items-center">
                                <Row key={index} className="rounded-xxl">
                                    <Col xs={4}>
                                    {value.filetype === "video" ? (
                                        <Slider {...membersettings}>
                                        <div
                                            className="d-block mb-3 overflow-hidden"
                                            style={{ width: "100%" }}
                                        >
                                            <Player poster={`assets/images/poste.jpg`} src={value.markedmetaurl} />
                                        </div>
                                        </Slider>
                                        ) : (
                                        <Watermark text="troo">
                                            <img src={value.markedmetaurl} className="rounded-3 w-100" alt="post" />
                                        </Watermark>
                                        )
                                     }
                                        </Col>
                                        <Col xs={8}>
                                        <div className={`me-2 ${value.status}`}>
                                            <p className="mb-0"><span className="fw-900 font-xss text-white">{user.name}</span>
                                            <span className="mentiontag fw-900 font-xss">@{user.name}</span></p>
                                            <p className="date ls-3 text-white mt-0 mb-0 font-xsss">{formatDistance(new Date(value.date), new Date(), { addSuffix: true })}</p>
                                            <p className="description" dangerouslySetInnerHTML={{__html: value.description}}></p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={act_tab == "#reports" ? "" : "d-none"}>

                </div>
                <div className={act_tab == "#likes" ? "" : "d-none"}>
                    {likes.map((value, index) => (
                        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                            <div className="card-body align-items-center">
                                <Row key={index} className="rounded-xxl">
                                    <Col xs={4}>
                                    {value.filetype === "video" ? (
                                        <Slider {...membersettings}>
                                        <div
                                            className="d-block mb-3 overflow-hidden"
                                            style={{ width: "100%" }}
                                        >
                                            <Player poster={`assets/images/poste.jpg`} src={value.markedmetaurl} />
                                        </div>
                                        </Slider>
                                        ) : (
                                        <Watermark text="troo">
                                            <img src={value.markedmetaurl} className="rounded-3 w-100" alt="post" />
                                        </Watermark>
                                        )
                                     }
                                    </Col>
                                    <Col xs={8}>
                                    <div className={`me-2 ${value.status}`}>
                                        <p className="mb-0"><span className="fw-900 font-xss text-white"><Profilelikesname creator={value.creator}/></span>
                                        <span className="mentiontag fw-900 font-xss">@<Profilelikesname creator={value.creator}/></span></p>
                                        <p className="date ls-3 text-white mt-0 mb-0 font-xsss">{formatDistance(new Date(value.date), new Date(), { addSuffix: true })}</p>
                                        <p className="" dangerouslySetInnerHTML={{__html: value.description}}></p>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </>
    );
}

export default Profiledetail;