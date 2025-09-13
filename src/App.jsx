import { useState, useEffect } from "react"
import BookList from "./Components/BookList/BookList.jsx"
import Header from "./Components/Header/Header.jsx"
import "./index.css"

export default function App() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=harry+potter&startIndex=10&maxResults=40")
      .then(res => res.json())
      .then(data => setBooks(data.items || []))
  }, [])
  
  return (
    <>
      <Header />
      <BookList books={books}/>
    </>
  )
}