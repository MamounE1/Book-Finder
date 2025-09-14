import "./SearchBar.css"

export default function SearchBar({text, setText, onSearch}){
    return (
        <form onSubmit={(e) => {e.preventDefault(), onSearch()}}>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}