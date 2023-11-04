import React from "react";
import "./HomePage.scss";
import Activity from "./Activity/Activity";
import Header from "../../Header/Header";

const HomePage = () => {
    return (
       <div className="mainContent">
            <Header />
            <div className="body">
                <h2 className="Title">
                    Try our games?
                </h2>
                <Activity />
            </div>
       </div>
    )
}

export default HomePage