import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  onShelfChange = (book, shelf) => {
    this.setState({loading: true});
    
    const books = [...this.state.books];
    const index = books.findIndex(b => b.id === book.id);
    BooksAPI.update(book, shelf)
    .then(_ => {
      book.shelf = shelf;

      if (index > -1) {
        books[index] = book;

      } else {
        books.push(book);
      }
      this.setState({books, loading: false});
    })
  }

  componentDidMount() {
    this.setState({loading: true});

    BooksAPI.getAll().then( books => {
      this.setState({books: books, loading: false});
    })
}

  render() {
    return (
      <div>
      <Route exact path='/' render={({history})=> (
        <Shelves books={this.state.books} loading={this.state.loading} history={history} onShelfChange={this.onShelfChange}></Shelves>
      )}></Route>
      <Route exact path='/search' render={({history}) => (
        <BookSearch books={this.state.books} history={history} onShelfChange={this.onShelfChange}></BookSearch>
      )}></Route>
      </div>
    )
  }
}

export default BooksApp
