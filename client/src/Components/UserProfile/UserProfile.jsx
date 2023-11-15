import React from "react";
import "./UserProfile.scss";
import ManageGame from "./ManageGame/ManageGame"
import UploadGame from "./UploadGame/UploadGame";
import Profile from "./profile/Profile";

import avt from "../../Assets/Video Projects/a44.jpg"

const UserProfile = () => {
    //test profile 
    const username = "Kai Mink nè"; //const storedUsername = sessionStorage.getItem("username"); lấy từ session storage
    const role = "admin";
    const games = 0;
    return (
    <div className="userContent">
        <div className="bodyUser">
            <div className="BlockContent">
                <Profile avt={avt} username={username} role={role} games={games} />
            </div>
            <div className="BlockContent">
                <h2><UploadGame /></h2>
            </div>
            <div className="BlockContent">
                <h2><ManageGame /></h2>
            </div>
        </div>
    </div>
    )
}
export default UserProfile