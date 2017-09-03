import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {    
      books: []
    }
    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    // Get the list of all the books in the bookshelf
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  changeBookShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/search" render={() => (
            <SearchBooks books={this.state.books} onShelfChange={this.changeBookShelf}/>
          )}  />        
        
          <Route exact path="/" render={({history}) => (
              <Bookshelf books={this.state.books} onShelfChange={this.changeBookShelf} />
          )} />
      </div>
    )
  }
}

export default BooksApp
