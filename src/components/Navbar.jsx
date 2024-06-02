import logo from "../assets/logo.svg";
import UploadFIle from "./UploadFile";

import "./Navbar.css";

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <a href="#" >
                    <img src={logo} className="logo" alt="AI Planet logo" />
                </a>
                <UploadFIle />
            </div>
        </>
    )
}

export default Navbar;  
