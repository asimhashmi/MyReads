import React, { Component } from 'react'

export default class BookList extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map( book => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf || 'none'} onChange={(event) => this.props.onShelfChange(book, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
          </div>
        </li>
        ))}
      </ol>
    )
  }
}
