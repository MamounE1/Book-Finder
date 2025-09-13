import BookCard from "../BookCard/BookCard"
import "./BookList.css"

export default function BookList({books, loadMoreRef}){
    return (
        <>
            <div className="allBooksContainer">
                {books.map((book) => (
                    <BookCard key={book.id} book={book}></BookCard>
                ))}
            </div>
            <div ref={loadMoreRef}></div>
        </>
    )
}