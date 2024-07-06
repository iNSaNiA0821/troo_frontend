import React from "react";
import { Link } from "react-router-dom";

const Uploadnav = () => {
  return (
    <nav className=" bg-black shadow-xs border-0">
      <div className="nav-top">
        <Link to="/upload/video" className="nav-content-bttn open-font"><h3 className="text-white mont-font fw-600 font-md p-4">Video</h3></Link>
      </div>
    </nav>
  );
};

export default Uploadnav;
