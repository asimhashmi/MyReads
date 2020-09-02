import React from 'react'
import BookList from './BookList'

export default function Shelves(props) {
  let currentlyReading = [];
  let wantToRead = [];;
  let read = [];
  // We are looping over books to categorize them in different
  // arrays which will act as shelves. As we'll be computing
  // this on each render, we'll not be storing them in state.

  for(const book of props.books) {
    switch(book.shelf) {
      case 'currentlyReading':
        currentlyReading.push(book);
        break;
      case 'wantToRead':
        wantToRead.push(book);
        break;
      case 'read':
        read.push(book);
        break;
    }
  }
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {props.loading && <div class="loader"></div>}
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookList books={currentlyReading} onShelfChange={props.onShelfChange} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList books={wantToRead} onShelfChange={props.onShelfChange} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList books={read} onShelfChange={props.onShelfChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => props.history.push('/search')}>Add a book</button>
        </div>
      </div>
    </div>
  )
}
