import React, { Component } from 'react';
import BookList from './BookList';
import AddBook from './AddBook';
function HomePage (props) {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {props.books.filter(book => book.shelf ==='currentlyReading').map(book => (
                        <li key={book.id}>
                          <BookList 
                            book={book}
                            bookControl={props.bookControl}
                            shelf='currentlyReading'
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {props.books.filter(book => book.shelf ==='wantToRead').map(book => (
                        <li key={book.id}>
                          <BookList 
                            book={book} 
                            bookControl={props.bookControl}
                            shelf='wantToRead'
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {props.books.filter(book => book.shelf ==='read').map(book => (
                        <li key={book.id}>
                          <BookList 
                            book={book}
                            bookControl={props.bookControl}
                            shelf='read'
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <AddBook />
          </div>
         );
    };

export default HomePage;