import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types'

const Bookshelf = (props) => (
    <div>
        <div className="list-books-title">
            <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {props.books.filter((book) => book.shelf === "currentlyReading").map((book) =>
                        (<li key={book.id}><Book book={book} onChangeShelf={props.onShelfChange} /></li>)
                    )}
                    </ol>
                </div>
                
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books.filter((book) => book.shelf === "wantToRead").map((book) =>
                            (<li key={book.id}><Book book={book} onChangeShelf={props.onShelfChange} /></li>)
                        )}
                    </ol>
                </div>
                
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {props.books.filter((book) => book.shelf === "read").map((book) =>
                        (<li key={book.id}><Book book={book} onChangeShelf={props.onShelfChange} /></li>)
                    )}
                    </ol>
                </div>
            </div>
        </div>   
        <Link className='open-search' to='/search'>Search</Link>            
    </div>
        
)

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Bookshelf