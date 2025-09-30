import "./BookCard.css"
import { Link } from "react-router-dom";
import { Heart } from "lucide-react"

export default function BookCard({book, isFavorite, toggleFavorite}){
    return (
        <div className="bookContainer">
            <Heart
                className="heartIcon"
                onClick={() => toggleFavorite(book.id)}
                style={{ fill: isFavorite ? "red" : "none" }}
            />
            <div className="imageWrapper">
                {book.volumeInfo.imageLinks?.thumbnail ? (
                    <Link to={`/book/${book.id}`}>
                        <img className="imgStyle" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}></img>
                    </Link>
                ) : null}
            </div>
            <div className="infoWrapper">
                <Link to={`/book/${book.id}`}>
                    <p>{book.volumeInfo.title}</p>
                </Link>
                <div>
                    {book.volumeInfo.authors?.map((author, index) => (
                        <span key={index}>
                            {author}{index + 1 < book.volumeInfo.authors.length ? ", " : ""}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}