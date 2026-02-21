import React from 'react'
import './landing.css'
import { NavLink } from 'react-router-dom'
import coverImg from '../../assets/libro.png'
import Carousel from '../Carousel/Carousel'
import { faTruckFast, faLock, faRotateLeft, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Landing() {
  return (
    <section className="landing">
      <div className="landing__bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="landing__inner">
        <div className="hero">
          <div className="hero__text">
            <h1>Discover stories that transform you</h1>
            <p>Explore our curated selection of books — new arrivals, classics, and community favorites.</p>
            <div className="hero__cta">
              <NavLink to="/books" className="btn btn-primary">Browse books</NavLink>
              <NavLink to="/register" className="btn btn-ghost">Join now</NavLink>
            </div>
          </div>

          <div className="hero__visual" aria-hidden>
            <div className="book-3d" role="img" aria-label="3D Book">
              <div className="book-rotate">
                {/** rotating wrapper */}
                <div
                  className="book__cover"
                  style={{
                    // portada usando imagen local (ruta relativa importada arriba)
                    zIndex: 10,
                    backgroundSize: 'cover',
                    backgroundImage: `url(${coverImg})`,
                  }}
                >
                </div>

                <div className="book__page"
                ></div>
                <div className="book__back"></div>
                <div className="book__spine"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <strong>Curated Selection</strong>
            <span>Books recommended by editors and readers.</span>
          </div>
          <div className="feature">
            <strong>Fast Shipping</strong>
            <span>Receive your orders in record time.</span>
          </div>
          <div className="feature">
            <strong>24/7 Support</strong>
            <span>Help and recommendations whenever you need it.</span>
          </div>
        </div>

        <Carousel />

        <div className="why-us">
          <div className="section-header">
            <h2 className="section-title">Why choose Bookstore?</h2>
            <p className="section-subtitle">We provide the best reading experience for you</p>
          </div>
          <div className="why-us__grid">
            <div className="why-us__card">
              <div className="why-us__icon">
                <FontAwesomeIcon icon={faTruckFast} />
              </div>
              <h3>Free Shipping</h3>
              <p>On all orders over $50. We deliver to your doorstep with care and speed.</p>
            </div>
            <div className="why-us__card">
              <div className="why-us__icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <h3>Secure Payment</h3>
              <p>Your transactions are protected by industry-leading security standards.</p>
            </div>
            <div className="why-us__card">
              <div className="why-us__icon">
                <FontAwesomeIcon icon={faRotateLeft} />
              </div>
              <h3>Easy Returns</h3>
              <p>Not what you expected? Return it within 30 days for a full refund.</p>
            </div>
            <div className="why-us__card">
              <div className="why-us__icon">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              <h3>Customer First</h3>
              <p>Our support team is available around the clock to help with your orders.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
