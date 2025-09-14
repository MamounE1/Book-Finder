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

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=${startIndex}&maxResults=20`)
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
  }

  return (
    <>
      <Header />
      <SearchBar text={text} setText={setText} onSearch={onSearch}/>
      <BookList books={books} loadMoreRef={loadMoreRef}/>
    </>
  )
}