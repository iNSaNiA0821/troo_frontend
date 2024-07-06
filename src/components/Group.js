import React, { Component } from 'react';
import Slider from "react-slick";

const groupList = [
    {
        imageUrl: 'story.png',
        name: 'Studio Express',
        friend: '12',
    },
    {
        imageUrl: 'story.png',
        name: 'Armany Design',
        friend: '18',
    },
]

class Group extends Component {
    render() {
        const Groupsettings = {
            arrows: false,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
        };
        return (
            <div className="card w-100 shadow-xss border-white mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Popular</h4>
                    <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                <Slider {...Groupsettings}>
                    {groupList.map((value, index) => (
                        <div key={index} className="wrap card w150 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-3">
                            <div className="card-body d-block w-100 pe-3 pb-4 text-center">
                                <img src={`assets/images/${value.imageUrl}`} alt="group" className="img-fluid rounded-xxl mb-2" />
                            </div>
                            <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                                <a href="/defaultgroup" className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> Like Page</a>
                            </div>
                        </div>

                    ))}
                </Slider>

            </div>
        );
    }
}

export default Group;