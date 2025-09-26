import { useState, useEffect, useRef } from "react"
import BookList from "./Components/BookList/BookList.jsx"
import Header from "./Components/Header/Header.jsx"
import SearchBar from "./Components/SearchBar/SearchBar.jsx"
import "./index.css"

export default function App() {
  const loadMoreRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [text, setText] = useState("")
  const [books, setBooks] = useState([])
  const [startIndex, setStartIndex] = useState(0);

  const [favorites, setFavorites] = useState(()=>{
        const saved  = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : []
    })

  useEffect(() => {
    if (!searchQuery) return;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=20`)
      .then(res => res.json())
      .then(data => {
        setBooks(prev => [...prev, ...(data.items || [])])
      })
  }, [startIndex, searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setStartIndex(prev => prev + 20)
      }
    })

    if(loadMoreRef.current){
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [])
  
  function onSearch(){
    setBooks([])
    setStartIndex(0)
    setSearchQuery(text)
    setText("")
  }
  
  function toggleFavorite(bookId){
        setFavorites(prev => {
            let updated
            if (prev.includes(bookId)){
                updated = prev.filter(id => id !== bookId)
            } else{
                updated = [...prev, bookId]
            }
            localStorage.setItem("favorites", JSON.stringify(updated))
            return updated
        })
    }

  return (
    <>
      <Header />
      <SearchBar text={text} setText={setText} onSearch={onSearch}/>
      <BookList 
        books={books} 
        loadMoreRef={loadMoreRef} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite}
      />
    </>
  )
}