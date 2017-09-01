import React, { Component } from 'react';
import Img from 'react-image'

class Book extends Component {
    state = {
        authors: ""
    }
    componentWillReceiveProps() {
        book.authors.map((author) => {this.state.authors.concat(author).concat(", "); return author});
        
    }
    render() {
        const { book, onChangeShelf } = this.props
        return (
            <div className="book">
                <Img className="book-top" src={book.imageLinks.thumbnail}/>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
                        <option disabled>Move To..</option>
                        <option value="currentlyReading" readOnly>Currently Reading</option>
                        <option value="read" readOnly>Read</option>
                        <option value="wantToRead" readOnly>Want To Read</option>
                        <option value="none" readOnly>None</option>
                    </select>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors ? book.authors.map((author) => (<div className="book-authors" key={author}>{author}, </div>)) : null}
            </div>
        )
    }
}

export default Book