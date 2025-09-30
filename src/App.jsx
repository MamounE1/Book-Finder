import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import BookListPage from "./Pages/BookListPage.jsx";
import BookDetailsPage from "./Pages/BookDetailsPage.jsx";

export default function App() {
  const [favorites, setFavorites] = useState(()=>{
          const saved  = localStorage.getItem("favorites")
          return saved ? JSON.parse(saved) : []
      })
  
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
    <Routes>
      <Route 
        path="/" 
        element={
          <BookListPage 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        } 
      />
      <Route 
        path="/book/:id" 
        element={
          <BookDetailsPage 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        } 
      />
    </Routes>
  )
}