import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
export default class BookSearch extends Component {
  state = {
    query: '',
    loading: false,
    foundBooks: []
  }

  handleSearch = query => {
    this.setState({query: query, loading: true})

    if(query.length > 0) {
      BooksAPI.search(query)
      .then(foundBooks => {
        if (foundBooks.error) {
          this.setState({foundBooks: [], loading: false})
        } else {
          // Looping over books fetched from the API to check
          // which books are already in shelves.
          const merged = foundBooks.map(foundBook => {
            const bookInShelf = this.props.books.find(book => book.id === foundBook.id)
            // If book inside shelf is matched, we'll set its shelf
            // attribute to respective shelf.
            if(bookInShelf) {
                foundBook.shelf = bookInShelf.shelf
            }

            return foundBook;
          })
          //Finally when we have set the matching books' shelf attribute
          //to the respective shelf, then we'll update the state.
          this.setState({foundBooks: merged, loading: false})
        }
      })
    } else {
      this.setState({foundBooks: []})
    }
  }

  render() {
    let {query, foundBooks, loading} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
        <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={this.state.query} onChange={e => this.handleSearch(e.target.value)} placeholder="Search by title or author"/>

        </div>
        </div>
        <div className="search-books-results">
          {loading && <div class="loader"></div>}
          {(query.length > 0 && !loading && !foundBooks.length) && <div className="no-books">Could not find any books</div>}
          <BookList books={this.state.foundBooks} onShelfChange={this.props.onShelfChange} />
        </div>
      </div>
    )
  }
}
