import "./Header.css"
import LitScoutLogo from "../../images/LitScout.png";

export default function Header(){
    return (
        <header>
            <img className="title" src={LitScoutLogo} alt="LitScout Logo"/>
        </header>
    )
}