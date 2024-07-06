import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Appfooter extends Component {
    render() {
        return (
            <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
                <Link to="/home" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
                <Link to="/mapping" className="nav-content-bttn"><i className="feather-search"></i></Link>
                <Link to="/myfeed" className="nav-content-bttn" data-tab="chats"><i className="feather-package"></i></Link>
                <Link to="/mapping" className="nav-content-bttn"><i className="feather-map-pin"></i></Link>
            </div>
        );
    }
}

export default Appfooter;