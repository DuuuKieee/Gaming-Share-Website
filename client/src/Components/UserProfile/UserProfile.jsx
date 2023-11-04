import React from "react";
import "./UserProfile.scss";
import ManageGame from "./ManageGame/ManageGame"
import UploadGame from "./UploadGame/UploadGame";
import Profile from "./profile/Profile";

const UserProfile = () => {
    return (
    <div className="userContent">
        <div className="bodyUser">
            <div className="BlockContent">
                <Profile />
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