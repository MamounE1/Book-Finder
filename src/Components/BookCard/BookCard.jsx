import "./BookCard.css"
import { Heart } from "lucide-react"

export default function BookCard({book, isFavorite, toggleFavorite}){
    return (
        <div className="bookContainer">
            <div>
                <Heart
                    className="heartIcon"
                    onClick={() => toggleFavorite(book.id)}
                    style={{ fill: isFavorite ? "red" : "none" }}
                />
            </div>
            {book.volumeInfo.imageLinks?.thumbnail ? (
                <img className="imgStyle" src={book.volumeInfo.imageLinks.thumbnail} alt="No Image"></img>
            ) : null}
            <p>{book.volumeInfo.title}</p>
            <div>
                {book.volumeInfo.authors?.map((author, index) => (
                    <span key={index}>
                        {author}{index + 1 < book.volumeInfo.authors.length ? ", " : ""}
                    </span>
                ))}
            </div>
        </div>
    )
}