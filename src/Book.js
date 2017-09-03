import React from 'react';
import Img from 'react-image'

const Book = (props) => (    
    <div className="book">
        <Img className="book-top" src={props.book.imageLinks.thumbnail}/>
        <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(event) => props.onChangeShelf(props.book, event.target.value)}>
                <option disabled>Move To..</option>
                <option value="currentlyReading" readOnly>Currently Reading</option>
                <option value="read" readOnly>Read</option>
                <option value="wantToRead" readOnly>Want To Read</option>
                <option value="none" readOnly>None</option>
            </select>
        </div>
        <div className="book-title">{props.book.title}</div>
        {props.book.authors ? props.book.authors.map((author) => (<div className="book-authors" key={author}>{author}, </div>)) : null}
    </div>
)

export default Book