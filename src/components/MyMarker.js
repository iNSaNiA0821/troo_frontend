import React, { useState, useEffect } from "react";
import { format, formatDistance } from "date-fns";
import { Marker, InfoWindow } from '@react-google-maps/api';
import ReactHashtag from "react-hashtag";
import api from "../utils/api";

const MyMarker = ({ i, Tweet, handleActiveMarker, setActiveMarker, activeMarker }) => {
  const [isActive, setActive] = useState("true");
  const handleToggle = () => {
    setActive(!isActive);
  };
  const [creatorName, setUsername] = useState("");
  useEffect(() => {
    const showusername = async () => {
      const res = await api.post("/auth/name", { id: Tweet.creator });
      setUsername(res.data);
    };
    showusername();
  }, []);

  return (
    <Marker
        key={i}
        position={{lat: Tweet.lat, lng: Tweet.lng}}
        onClick={() => handleActiveMarker(i)}
        title= {''+i}
    >
    {activeMarker === i ? (
        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
        <div>
            <h4 className="fw-700 xssss mt-1 text-center">
              <label className="fw-900 font-xs">{i+1}. {creatorName}&nbsp;</label>
              <span className="mentiontag fw-600 font-xss">@{creatorName}</span>
            </h4>
            <p>
              <ReactHashtag
                renderHashtag={(hashtagValue) => (
                  <a key={i} href={`${hashtagValue}`}>{hashtagValue}</a>
                )}
              >
                { Tweet.description }
              </ReactHashtag>
          </p>
            <p className="date">{formatDistance(new Date(Tweet.date), new Date(), { addSuffix: true })}</p>
        </div>
        </InfoWindow>
    ) : null}
    </Marker>
  );
};

export default MyMarker;
