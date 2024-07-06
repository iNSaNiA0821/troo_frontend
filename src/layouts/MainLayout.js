import React, { useState, useEffect, Fragment, } from "react";
import { useSelector } from "react-redux";
import Header from '../components/Header';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
const MainLayout = (props) => {
    const handleScroll = props.handleScroll;
    const [navwidth, setnavwidth] = useState('280px')
    const {
        isexpand
    } = useSelector(state => state.util); // here, indicate reducer=
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isexpand]);
    const handleResize = () => {
        if (window.innerWidth <= 972) {
            setnavwidth('0px');
        }
        else if (window.innerWidth > 972 && window.innerWidth <= 992) {
            setnavwidth('84px');
        }
        else if (window.innerWidth > 992) {
            if (isexpand) { setnavwidth('280px'); }
            else { setnavwidth('84px'); }
        }
    }
    return (
        <Fragment>
            <Header />
            <div className="main-content right-chat-active theme-dark-bg" onScroll={handleScroll}>
                {props.children}
            </div>
            <Popupchat />
            <Appfooter />
        </Fragment>
    )
}
export default MainLayout;