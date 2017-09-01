import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {    
    books: []
  }

  componentDidMount() {
    // Get the list of all the books in the bookshelf
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  changeBookShelf = (book, shelf) => {   
    
    let bookList = [];
    // A boolean variable to check if the book belongs to the bookshelf or if it's a new addition to the shelf
    let bookExists = false;
    bookList = this.state.books.map((b) => { 
      if(b.id === book.id) 
        {b.shelf = shelf; bookExists=true;} 
      return b;
    })

    //Add the book to the list of books in the bookshelf if it's new
    if(!bookExists) {
      book.shelf = shelf;
      bookList.push(book);
    }
    //Re-render with updated shelf values.
    this.setState({ books : bookList})
    BooksAPI.update(book,shelf);
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
