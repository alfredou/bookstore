import React from 'react';
import './about.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-header">
                <h1 className="about-title">About Bookstore</h1>
                <p className="about-subtitle">Bringing stories to life since 2024</p>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Bookstore, we believe that books have the power to transform lives. Our mission is to provide
                        easy access to knowledge and inspiration through a carefully curated selection of IT and technical literature,
                        classics, and modern masterpieces.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Why We Started</h2>
                    <p>
                        We started as a small group of book lovers who wanted to create a platform that doesn't just sell books,
                        but builds a community. We focus on quality over quantity, ensuring every book in our collection
                        is worth your time.
                    </p>
                </section>

                <section className="about-section stats-grid">
                    <div className="stat-card">
                        <h3>5k+</h3>
                        <p>Books in Collection</p>
                    </div>
                    <div className="stat-card">
                        <h3>2k+</h3>
                        <p>Happy Readers</p>
                    </div>
                    <div className="stat-card">
                        <h3>24/7</h3>
                        <p>Global Support</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
