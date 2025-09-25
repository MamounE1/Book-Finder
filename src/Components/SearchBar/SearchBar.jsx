import "./SearchBar.css"

export default function SearchBar({text, setText, onSearch}){
    return (
        <div className="searchContainer">
            <input
                className = "searchBar"
                value={text} 
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch()
                }} 
                placeholder="Search books..."
            />
            <button className="searchButton" type="submit" onClick={onSearch}>Search</button>
        </div>
    )
}