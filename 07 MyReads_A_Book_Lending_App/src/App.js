import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Home from './AppComponents/Home'
import BookSearch from './AppComponents/BookSearch'
import './App.css'

class BooksApp extends React.Component {
  state = {
    //creating books array that holds all books
    books: []
  }
//making Api request to get all books and store it in books array
componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
  })
}

//function that controls book and shelf

bookControl = (book , shelf) => {

  BooksAPI.update(book, shelf).then(() => {
    book.shelf = shelf
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat(book)
    }))
})
}

  render() {
    return (
      <div className="app">
      {/*Making routing from the Home*/}

      <Route exact path='/' render={() => (
        <Home books={this.state.books}
        bookControl={this.bookControl}
        />
      )}/>
      {/*Making routing to the BookSearch page*/}

      <Route path='/Search' render={() => (
        <BookSearch 
        bookControl={this.bookControl}
        />
      )}/>
      </div>
    )
  }
}

export default BooksApp;