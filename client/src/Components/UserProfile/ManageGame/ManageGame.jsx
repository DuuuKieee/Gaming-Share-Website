import React from "react";
import "./ManageGame.scss";
import Manage from "./Manage/Manage";

const ManageGame = () => {
    return (
    <div className="managedContent">
        <h2 className="profileTitle">
            Your Games
        </h2>
        <div className="manageBody">
            <Manage />
        </div>
        
    </div>
    )
}
export default ManageGame