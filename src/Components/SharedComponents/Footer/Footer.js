import React from 'react';
import './Footer.css';
import FooterCol from './FooterCol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const ourAddress = [
        { name: "134 West Kafrul, Agargaon, Dhaka", link: "https://goo.gl/maps/3a4Prs7JVHLbkAuj7" }
    ]
    const oralHealth = [
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" }
    ]
    const services = [
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" },
        { name: "Footer Menu Item", link: "/" }
    ]
    return (
        <footer className="footer-area clear-both">
            <div className="container pt-5">
                <div className="row py-5">
                    <FooterCol key={1} menuTitle={"Our Address"} menuItems={ourAddress} />
                    <FooterCol key={2} menuTitle="Company" menuItems={services} />
                    <FooterCol key={3} menuTitle="Quick Links" menuItems={oralHealth} />
                    <div className="col-md-3">
                        <h6 style={{color: '#4A1E85'}}>Social Links</h6>
                        <ul className="social-media list-inline">
                            <li className="list-inline-item"><a href="//facebook.com"><FontAwesomeIcon className="icon active-icon" icon={faFacebookF} /></a></li>
                            <li className="list-inline-item"><a href="//google.com"><FontAwesomeIcon className="icon" icon={faGooglePlusG} /></a></li>
                            <li className="list-inline-item"><a href="//instagram.com"><FontAwesomeIcon className="icon" icon={faInstagram} /></a></li>
                        </ul>
                        <div className="mt-5">
                            <h6 style={{color: '#4A1E85'}}>Call now</h6>
                            <button className="btn brand-btn">+2025550295</button>
                        </div>
                    </div>
                </div>
                <hr className="divider-footer text-white"/>
                <div className="copyRight text-center pb-3">
                    <p style={{color: '#4A1E85'}} className="m-0">Copyright {(new Date()).getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;