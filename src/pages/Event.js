import React, { useState, useEffect, Fragment, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import MyMarker from '../components/MyMarker';
import MapListItem from '../components/MapItem';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript, useJsApiLoader, Marker, InfoWindow, withScriptjs, withGoogleMap } from '@react-google-maps/api';
import fileDownload from 'js-file-download';
import api from '../utils/api';
import axios from 'axios';
import { Player } from "video-react";
import { useLocation } from 'react-router-dom';

import "./marker.css";

const Event = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCAa8ZgPpTBMcCV7lrNJXvE70JoRs9Wl8I" // Add your API key
    });
    const [myTweets, setMyTweets] = useState([]);
    const [myProfile, setMyprofile] = useState();
    const {
        user, vcoin, isauthenticated
    } = useSelector(state => state.auth); // here, indicate reducer
    const [state, setstate] = useState({
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 3
    });
    const [activeMarker, setActiveMarker] = useState(null);
    const { b_id } = useParams();
    useEffect(() => {
        const setblogs = async () => {
            const res1 = await api.get('/profile/');
            setMyprofile(res1.data);
            const res = await api.post('/blog/myfeed', { id: b_id, myfollowing: res1.data.following });
            setMyTweets(res.data);
            setActiveMarker(null);
        }
        if (isauthenticated) setblogs();
    }, [isauthenticated]);
    const location = useLocation();
    const hashtag = location.hash;
    useEffect(() => {
        const setblogs = async () => {
            const res = await api.post(`/blog/byhashtag/`, { hashtag: hashtag });
            setMyTweets(res.data);
        }
        if (isauthenticated) setblogs();

    }, [hashtag]);

    useEffect(() => {
        if (myTweets[0])
            setstate({
                center: {
                    lat: myTweets[0].lat,
                    lng: myTweets[0].lng
                },
                zoom: 3
            });
    }, [myTweets]);

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
            const res = await api.post('/blog/myfeed', { myfollowing: myProfile.following });
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


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
        setstate({
            center: {
                lat: myTweets[marker].lat,
                lng: myTweets[marker].lng
            },
            zoom: 5
        });
    };
    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        myTweets.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };
    return (
        <Fragment>
            <Header />
            <Leftnav />
            {/* <Rightchat /> */}
            <div className="map main-content right-chat-active">
                <div className="row h-100" style={{ position: "relative" }}>
                    <div className="col-9 p-0">
                        <div style={{ height: '100%', width: '100%' }}>
                            {isLoaded ? (
                                <GoogleMap
                                    center={state.center}
                                    zoom={state.zoom}
                                    onClick={() => setActiveMarker(null)}
                                >
                                    {
                                        myTweets.map((Tweet, i) => {
                                            return (
                                                <MyMarker key={i} i={i} Tweet={Tweet} handleActiveMarker={handleActiveMarker} setActiveMarker={setActiveMarker} activeMarker={activeMarker} />
                                            )

                                        })}
                                </GoogleMap>
                            ) : <></>
                            }
                        </div>
                    </div>
                    <div className="col-3 p-0 map-list">
                        <ul className="list-group list-group-flush p-2">
                            {myTweets.map((blog, i) => {
                                return (
                                    <div key={i} onClick={() => handleActiveMarker(i)}>
                                        <MapListItem addFollow={addFollow} buyVcoin={buyVcoin} Download={Download} blogItem={blog} myProfile={myProfile} />
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />

        </Fragment>
    );
}

export default Event;