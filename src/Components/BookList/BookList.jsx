import BookCard from "../BookCard/BookCard"
import "./BookList.css"

export default function BookList({books}){
    return (
        <div className="allBooksContainer">
            {books.map((book) => (
                <BookCard key={book.id} book={book}></BookCard>
            ))}
        </div>
    )
}