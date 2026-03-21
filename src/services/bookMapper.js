export const transformGoogleBook = (item) => {
    if (!item) return null;
    const volumeInfo = item.volumeInfo || {};
    const saleInfo = item.saleInfo || {};

    // Find ISBN13, fallback to Google ID
    let isbn13 = item.id;
    if (volumeInfo.industryIdentifiers) {
        const isbnObj = volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');
        if (isbnObj) {
            isbn13 = isbnObj.identifier;
        } else {
            const isbn10Obj = volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10');
            if (isbn10Obj) isbn13 = isbn10Obj.identifier;
        }
    }

    // Determine price
    let priceNumber = 5.99; // Default fallback price
    if (saleInfo.listPrice && saleInfo.listPrice.amount) {
        priceNumber = saleInfo.listPrice.amount;
    } else if (saleInfo.retailPrice && saleInfo.retailPrice.amount) {
        priceNumber = saleInfo.retailPrice.amount;
    } else {
        // Randomize price slightly based on page count if available, or just fallback
        const pages = volumeInfo.pageCount || 200;
        priceNumber = Math.max(5.99, (pages * 0.05));
    }
    const price = '$' + priceNumber.toFixed(2);

    return {
        title: volumeInfo.title || 'Unknown Title',
        subtitle: volumeInfo.subtitle || '',
        authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
        publisher: volumeInfo.publisher || 'Unknown Publisher',
        isbn10: item.id, // Keep Google ID for reference
        isbn13: isbn13,
        pages: volumeInfo.pageCount ? volumeInfo.pageCount.toString() : '0',
        year: volumeInfo.publishedDate ? volumeInfo.publishedDate.substring(0, 4) : 'Unknown',
        rating: volumeInfo.averageRating ? volumeInfo.averageRating.toString() : '0',
        desc: volumeInfo.description || 'No description available for this book.',
        price: price,
        image: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/300x400?text=No+Cover',
        url: volumeInfo.infoLink || '#'
    };
};

export const transformGoogleResponse = (data, isSingleBook = false) => {
    if (isSingleBook) {
        if (data.items && data.items.length > 0) {
            return transformGoogleBook(data.items[0]);
        }
        return data.volumeInfo ? transformGoogleBook(data) : {}; // Fallback if using direct volume fetch
    }

    return {
        error: "0",
        total: (data.totalItems || 0).toString(),
        page: "1",
        books: (data.items || []).map(transformGoogleBook).filter(Boolean)
    };
};
