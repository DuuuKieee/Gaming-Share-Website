import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import ManageGame from "./ManageGame/ManageGame"
import UploadGame from "./UploadGame/UploadGame";
import Profile from "./profile/Profile";
import avt from "../../Assets/Video Projects/a44.jpg"
import Cookies from "js-cookie";

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const games = 0;
    useEffect(() => {
        fetchUserData();
    }, []);
    const token = Cookies.get("token");
    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/userprofile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: token
                    }),
                })

            if (response.ok) {
                const data = await response.json();
                const { username, role } = data;
                setUserData({ username, role });

            } else {
                console.log("Error fetching data from MongoDB");
            }
        } catch (error) {
            console.log("Error fetching data from MongoDB:", error);
        }
    };
    useEffect(() => {
        console.log(userData);
        console.log(userData.username);
        console.log(userData.role);
    }, [userData]);
    return (
        <div className="userContent">
            <div className="bodyUser">
                <div className="BlockContent">
                    {/* Access userData.username and userData.role */}
                    <Profile avt={avt} username={userData.username} role={userData.role} games={games} />
                </div>
                <div className="BlockContent">
                    <h2><UploadGame /></h2>
                </div>
                <div className="BlockContent">
                    <h2><ManageGame /></h2>
                </div>
            </div>
        </div>
    );
}
export default UserProfile