import React, { Component } from 'react';

function BookList (props) {

        let bookCover = props.book.imageLinks.thumbnail ? props.book.imageLinks.thumbnail : '';
        return (
            <div className="book">
            <div className="book-top">
            <div className="book-cover"
                style={{ width: 128, height: 193,
                backgroundImage: `url("${bookCover}")` }}></div>
            <div className="book-shelf-changer">
                <select
                //controling the value of the book in order to change its shelf
                  onChange= {(e) => props.bookControl(props.book, e.target.value)}
                  value={props.shelf}
                >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
        </div>
         );
    };

export default BookList;