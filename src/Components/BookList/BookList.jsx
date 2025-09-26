import BookCard from "../BookCard/BookCard"
import "./BookList.css"

export default function BookList({books, loadMoreRef, favorites, toggleFavorite}){
    return (
        <>
            <div className="allBooksContainer">
                {books.map((book) => (
                    <BookCard 
                        key={book.id} 
                        book={book}
                        isFavorite={favorites.includes(book.id)}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
            <div className="sentinel" ref={loadMoreRef}></div>
        </>
    )
}