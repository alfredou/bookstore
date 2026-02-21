import React from 'react'
import './bookDetailsSkeleton.css'

export default function BookDetailsSkeleton() {
    return (
        <div className="book-details-skeleton">
            <div className="book-details-skeleton__visual skeleton-pulse"></div>
            <div className="book-details-skeleton__content">
                <div className="book-details-skeleton__meta">
                    <div className="book-details-skeleton__meta-item skeleton-pulse"></div>
                    <div className="book-details-skeleton__meta-item skeleton-pulse"></div>
                    <div className="book-details-skeleton__meta-item skeleton-pulse"></div>
                </div>

                <div className="book-details-skeleton__title skeleton-pulse"></div>
                <div className="book-details-skeleton__subtitle skeleton-pulse"></div>

                <div className="book-details-skeleton__rating skeleton-pulse"></div>
                <div className="book-details-skeleton__price skeleton-pulse"></div>

                <div className="book-details-skeleton__desc skeleton-pulse"></div>

                <div className="book-details-skeleton__actions skeleton-pulse"></div>
            </div>
        </div>
    )
}
