import "./SearchBar.css"
import { Search } from "lucide-react"

export default function SearchBar({text, setText, onSearch , showFavorites, setShowFavorites}){
    return (
        <div className="searchContainer">
            <div className="inputWrapper">
                <input
                    className="searchBar"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    placeholder="Search books..."
                />
                <Search className="searchIcon" onClick={onSearch} />
            </div>
            <button className="favBtn" onClick={() => setShowFavorites(prev => !prev)}>
                    {showFavorites ? "Show All books" : "Show Favorites"}
            </button>
        </div>
    )
}