import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import "./BookDetailsPage.css";

export default function BookDetailsPage({ favorites, toggleFavorite }) {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching book:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading book details...</p>;
    if (!book) return <p>Book not found.</p>;

    const isFavorite = favorites.includes(book?.id)

    return (
        <div className="bookDetailsContainer">
            <div className="bookDetailsCard">
                <div className="mainInfoWrapper">
                    <div className="img&HeartWrapper">

                        {book.volumeInfo.imageLinks?.thumbnail && (
                        <img
                            className="bookImage"
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                        />
                        )}

                        <div className="heartWrapper">
                            <Heart
                                className="heartIcon"
                                onClick={() => toggleFavorite(book.id)}
                                style={{ fill: isFavorite ? "red" : "none" }}
                            />
                        </div>
                    </div>
                    <div className="title&DescWrapper">
                        <h2 className="bookTitle">{book.volumeInfo.title}</h2>

                        {book.volumeInfo.authors && (
                        <p className="bookAuthors">
                            {book.volumeInfo.authors.join(", ")}
                        </p>
                        )}

                        {book.volumeInfo.description && (
                        <p className="bookDescription">{book.volumeInfo.description}</p>
                        )}
                    </div>
                </div>
                <div className="extraInfo">
                    {book.volumeInfo.publisher && <p>Publisher: {book.volumeInfo.publisher}</p>}
                    {book.volumeInfo.publishedDate && <p>Published: {book.volumeInfo.publishedDate}</p>}
                    {book.volumeInfo.pageCount && <p>Pages: {book.volumeInfo.pageCount}</p>}
                    {book.volumeInfo.categories && <p>Categories: {book.volumeInfo.categories.join(", ")}</p>}
                </div>
            </div>
        </div>
    )
}