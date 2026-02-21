import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent! We will get back to you soon.', {
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            <Toaster position="bottom-right" />
            <div className="contact-header">
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-info-card">
                        <div className="contact-icon"><FontAwesomeIcon icon={faLocationDot} /></div>
                        <h3>Address</h3>
                        <p>123 Bookish Street, Reading City, RC 12345</p>
                    </div>
                    <div className="contact-info-card">
                        <div className="contact-icon"><FontAwesomeIcon icon={faPhone} /></div>
                        <h3>Phone</h3>
                        <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="contact-info-card">
                        <div className="contact-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                        <h3>Email</h3>
                        <p>hello@bookstore.com</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text" id="name" name="name" required
                            value={formData.name} onChange={handleChange}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email" id="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            placeholder="Your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text" id="subject" name="subject" required
                            value={formData.subject} onChange={handleChange}
                            placeholder="How can we help?"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message" name="message" rows="5" required
                            value={formData.message} onChange={handleChange}
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>
                    <button type="submit" className="contact-submit">
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
