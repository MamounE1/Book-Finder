import "./BookCard.css"

export default function BookCard({book}){
    return (
        <div className="bookContainer">
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