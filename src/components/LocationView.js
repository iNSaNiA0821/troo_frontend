import React, { useState } from "react";
// import Geocode from '../utils/geocode';
import { Link } from "react-router-dom";
import { format, formatDistance } from "date-fns";

const LocationView = ({ id, address, phonemodel, createdate }) => {
  return (
    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-white d-flex flex-column">
      <span className="me-0 m-0 mt-2 text-white">
        <i className="text-white feather-calendar me-1" /> {format(new Date(createdate), 'dd.MM.yy HH:mm')}
      </span>
      <span className="me-0 m-0 mt-1 text-white text-capitalize">
        <i className="text-white feather-smartphone me-1"></i> {phonemodel}
      </span>
      <span className="me-0 m-0 mt-1 text-white">
        <Link to={`/mapping/${id}`} style={{ color: 'inherit' }}>
          <i className="text-white feather-map-pin me-1"></i> {address}
        </Link>
      </span>
    </span>
  );
};

export default LocationView;
