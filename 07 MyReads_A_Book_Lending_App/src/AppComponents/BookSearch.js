import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
//import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BookList from './BookList';

class BookSearch extends Component {
    state = {
    //this will what the user will type and store it in this state
      query :'',
      searchedBooks : []
     }
    //this method will track input charachters and manipulate it
     updateQuery = (query) => {
       this.setState({query})
       this.updatesearchedBooks(query);
     }

     updatesearchedBooks = (query) => {
      if(query) {
        BooksAPI.search(query).then((searchedBooks) => {
          if(searchedBooks.error) {
            this.setState({searchedBooks : []})
          } else {
            this.setState({searchedBooks})
          }
        })
      } else {this.setState({searchedBooks : []})};
    }

    render() {
      const {bookControl} = this.props;
      const {query, searchedBooks} = this.state;

      //make the resulted books sorted by it's title.
      searchedBooks.sort(sortBy('title'));

      return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
                >Close
              </Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  //onchange method that will update query state depends on what user types
                  onChange ={(e)=> this.updateQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              
              {/*filtering the books which haven't thumbnail*/}
              {searchedBooks.filter(book => book.imageLinks !== undefined)
              .map(searchedBooks => (
                <li key={searchedBooks.id}>
                  <BookList 
                    book={searchedBooks}
                    bookControl={bookControl}
                  />
                </li>
              ))}
              </ol>
            </div>
          </div>
       );
    }
}

export default BookSearch;