import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import api from "../utils/api";
const ProfilecardThreeSelect = (props) => {
    const [name, setNameData] = useState("");
    const [avatar, setAvatarData] = useState("");
    const [bio, setBioData] = useState("");
    const [city, setCityData] = useState("");
    const [country, setCountryData] = useState("");
    const [backimg, setBackimgData] = useState("");
    const [following, setFollowingData] = useState("");
    const [followers, setFollowersData] = useState("");
    const [date, setData] = useState(null);
    const [{ pictures, videos, downloads }, setasset] = useState({});
    const { profile } = useSelector((state) => state.auth); // here, indicate reducer
    useEffect(() => {
        const timer = setTimeout(() => {
            const setblogs = async () => {
                const res = await api.post("/blog/myfeeds/assetcount", { selectId: props.topUserInfo, flag: "viewUserProfile" });
                if (res) {
                    setNameData(res.data.selectUserInfo.name);
                    setAvatarData(res.data.selectUserInfo.avatar);
                    setBioData(res.data.selectUserInfo.bio);
                    setCityData(res.data.selectUserInfo.city);
                    setCountryData(res.data.selectUserInfo.country);
                    setBackimgData(res.data.selectUserInfo.backimg);
                    setFollowingData(res.data.selectUserInfo.following.length);
                    setFollowersData(res.data.selectUserInfo.followers.length);
                    setData(res.data.selectUserInfo.date)
                    setasset({
                        pictures: res.data.images,
                        videos: res.data.videos,
                        downloads: res.data.downloads.length,
                    });
                }
            };
            if (profile) {
                setblogs();
            }
        });
        return () => {
            clearTimeout(timer);
        };
    }, [profile]);

    return (
        <div className="card w-100 border-white p-0 bg-white shadow-xss rounded-xxl">
            <div
                className="card-body h250 p-0 rounded-xxl overflow-hidden m-3"
                style={{
                    height: "250px",
                    backgroundImage: `url(${backimg})`,
                    backgroundSize: "100% 100%",
                }}
            ></div>
            <div className="card-body p-2 position-relative">
                <figure
                    className="avatar position-absolute w100 z-index-2"
                    style={{ top: "-40px", left: "30px" }}
                >
                    <img
                        src={avatar}
                        alt="avater"
                        className="float-right p-1 bg-white rounded-circle w-100"
                    />
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-2 pl-15">
                    {name}{" "}
                    <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        {format(new Date(date), "MMMM yyyy")} Updated
                    </span>
                </h4>
                <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                    <div
                        className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                        aria-labelledby="dropdownMenu4"
                    >
                        <div className="card-body p-0 d-flex">
                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                                Save Link{" "}
                                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Add this to your saved items
                                </span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                                Hide Post{" "}
                                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Save to your saved items
                                </span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                                Hide all from Group{" "}
                                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Save to your saved items
                                </span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">
                                Unfollow Group{" "}
                                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Save to your saved items
                                </span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex mt-2 pt-0">
                    <i className="feather-info text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">{bio}</h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {city},&nbsp;{country}
                    </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-users text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        Following {following} &nbsp;&nbsp;&nbsp; Followers {followers}
                    </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-camera text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        Pictures {pictures} &nbsp;&nbsp;&nbsp; Videos {videos}
                    </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-download text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        Downloads {downloads}{" "}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default ProfilecardThreeSelect;
