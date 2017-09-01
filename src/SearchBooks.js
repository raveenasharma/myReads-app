import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types'
/* To prevent multiple ajax calls to the backend till user has finished entering query */
import DebounceInput from 'react-debounce-input';
import ReactLoading from 'react-loading';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
      }

    state = {
        query: '',
        show: false,
        searchResults : []
    }    

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if(this.state.query !== "") {
            /* Show loader till API returns a list of books */
            this.setState({ show: true })
            BooksAPI.search(query, 20).then((books) => {
                if(!books.error) {
                    /* Traverse every book on the shelf and compare with search results to update search result shelf */
                    this.props.books.map((shelfBook) => {
                        books.map((b) => {
                            if(b.id === shelfBook.id) {
                                b.shelf = shelfBook.shelf;
                            }
                            if(!b.shelf)
                                b.shelf = "none"
                            return b;
                        })                    
                        return shelfBook;
                    })                                  
                    this.setState({ searchResults: books })
                }
                this.setState({ show: false })  
            });
        }
        
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { onShelfChange} = this.props
        const { query, searchResults } = this.state

        return(
            <div className="search-books">            
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">                
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={300}
                            placeholder="Search by title or author" value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />                           
                    </div>
                </div>            
                <div className="search-books-results">
                    {this.state.show ? <ReactLoading type="bars" color="#444" className="center"/> : null}
                    <ol className="books-grid">
                        { searchResults.map((book) =>
                            (<li key={book.id}><Book book={book} onChangeShelf={onShelfChange} /></li>)
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks