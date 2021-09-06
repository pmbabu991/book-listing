import React from 'react';
import './book-list.css';

const BookComponent = ({ list }) => {
    // Getting access denied error for mainImageUrl and url
    return list
      ? list.map((book, index) => (
          <div key={index} className="item">
            <a
          href={`https://dk-frontend-test.s3.eu-west-1.amazonaws.com + ${book.url}`}
        >
            <img src={`https://dk-frontend-test.s3.eu-west-1.amazonaws.com + ${book.mainImageUrl}`} alt={book.displayName}></img>
            <p id="book-title">{book.displayName}</p>
            <p>{`£${book.price}`}</p>
            </a>
          </div>
        ))
      : null;
  };

export default BookComponent;