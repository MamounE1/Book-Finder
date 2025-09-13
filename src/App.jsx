import BookList from "./Components/BookList/BookList.jsx"
import Header from "./Components/Header/Header.jsx"
import "./index.css"
import { fakeBooks } from "./fakeData.js"

export default function App() {
  return (
    <>
      <Header />
      <BookList books={fakeBooks}/>
    </>
  )
}