import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../../services/api';
import './carousel.css';

const Carousel = () => {
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const timeoutRef = useRef(null);

    const fetchFeaturedBooks = async () => {
        try {
            // Fetching "new" books to use as featured content
            const res = await fetch('https://api.itbook.store/1.0/new');
            const data = await res.json();
            setBooks(data.books.slice(0, 5)); // Show top 5
            setLoading(false);
        } catch (error) {
            console.error('Error fetching featured books:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedBooks();
    }, []);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1)),
            5000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex, books.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
    };

    if (loading) return <div className="carousel-skeleton">Loading featured books...</div>;
    if (books.length === 0) return null;

    return (
        <section className="carousel-section">
            <div className="section-header">
                <h2 className="section-title">Featured Books</h2>
                <p className="section-subtitle">Handpicked titles you might love</p>
            </div>

            <div className="carousel">
                <button className="carousel__btn carousel__btn--prev" onClick={prevSlide} aria-label="Previous slide">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="carousel__track-container">
                    <div
                        className="carousel__track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {books.map((book) => (
                            <div key={book.isbn13} className="carousel__slide">
                                <div className="carousel__card">
                                    <div className="carousel__image-container">
                                        <img src={book.image} alt={book.title} className="carousel__img" />
                                    </div>
                                    <div className="carousel__content">
                                        <h3 className="carousel__book-title">{book.title}</h3>
                                        <p className="carousel__book-price">{book.price}</p>
                                        <NavLink to={`/books/${book.isbn13}`} className="carousel__link">
                                            View Details
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="carousel__btn carousel__btn--next" onClick={nextSlide} aria-label="Next slide">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>

                <div className="carousel__dots">
                    {books.map((_, idx) => (
                        <button
                            key={idx}
                            className={`carousel__dot ${currentIndex === idx ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Carousel;
