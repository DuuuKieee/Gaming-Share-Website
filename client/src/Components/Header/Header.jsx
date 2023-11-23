import React from "react";
import "./Header.scss";
import {HiSearch} from "react-icons/hi";
import itstoolate from "../../Assets/itstoolate.jpg";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
    return (
        <div className="top grid">
            <div className="Header flex">
                <div className="Title grid">
                    <h1>Welcome to our Game Web!</h1>
                    <h3>PLease enjoy your moment~</h3>
                </div>

                <SearchBar />
            </div>

            <div className="TitleImg">
                <img src={itstoolate}></img>
            </div>
        </div>
    )
}

export default Header