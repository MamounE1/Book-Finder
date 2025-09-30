import { useState, useEffect, useRef } from "react"
import Header from "../Components/Header/Header.jsx"
import SearchBar from "../Components/SearchBar/SearchBar.jsx"
import BookList from "../Components/BookList/BookList.jsx"
import "../index.css"

export default function BookListPage({ favorites, toggleFavorite }) {
  const loadMoreRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [text, setText] = useState("")
  const [books, setBooks] = useState([])
  const [startIndex, setStartIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=10`)
      .then(res => res.json())
      .then(data => {
        setBooks(prev => [...prev, ...(data.items || [])])
      })
  }, [startIndex, searchQuery])

  useEffect(() => {
    if (showFavorites) return;

    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setStartIndex(prev => prev + 10)
      }
    })

    if(loadMoreRef.current){
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [showFavorites])
  
  function onSearch(){
    setBooks([])
    setStartIndex(0)
    setSearchQuery(text)
    setText("")
  }

  return (
    <>
      <Header />
      <SearchBar 
        text={text} 
        setText={setText} 
        onSearch={onSearch}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <BookList 
        books={showFavorites ? books.filter(book => favorites.includes(book.id)) : books} 
        loadMoreRef={loadMoreRef} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite}
      />
    </>
  )
}