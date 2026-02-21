import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faGithub
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import './footer.css';


const Footer = () => {
    const handleSubmit = (e)=>{
        e.preventDefault();
         toast.success('Thanks for subscribing to our newsletter!', {
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
        e.target.reset();  
    }
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__section about">
                        <h2 className="footer__logo">Bookstore</h2>
                        <p className="footer__description">
                            Your gateway to thousand of stories. We curate the best books for your reading pleasure. Discover, read, and grow with us.
                        </p>
                        <div className="footer__social">
                            <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#" aria-label="Github"><FontAwesomeIcon icon={faGithub} /></a>
                        </div>
                    </div>

                    <div className="footer__section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><NavLink to="/" end>Home</NavLink></li>
                            <li><NavLink to="/books">Books</NavLink></li>
                            <li><NavLink to="/about">About Us</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer__section contact">
                        <h3>Contact Us</h3>
                        <ul className="footer__contact-info">
                            <li>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>123 Bookish Street, Reading City</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>hello@bookstore.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__section newsletter">
                        <h3>Newsletter</h3>
                        <p className="footer__description">Join our community and get the latest updates on new arrivals and special offers.</p>
                        <form className="footer__form" onSubmit={handleSubmit}>
                            <div className="footer__input-wrapper">
                                <FontAwesomeIcon icon={faEnvelope} className="footer__input-icon" />
                                <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" required />
                            </div>
                            <button type="submit" className="footer__subs-btn">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Bookstore. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
