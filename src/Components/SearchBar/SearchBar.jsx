import "./SearchBar.css"

export default function SearchBar({text, setText, onSearch}){
    return (
        <div>
            <input 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch()
                }} 
                placeholder="Search books..."
            />
            <button type="submit" onClick={onSearch}>Search</button>
        </div>
    )
}