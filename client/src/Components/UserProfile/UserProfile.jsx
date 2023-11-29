import React, { useState, useEffect  } from "react";
import "./UserProfile.scss";
import ManageGame from "./ManageGame/ManageGame"
import UploadGame from "./UploadGame/UploadGame";
import Profile from "./profile/Profile";
import Cookies from "js-cookie";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

const token = Cookies.get("token");
const UserProfile = () => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 
    useEffect(() => {
        fetchUserData();
    }, []);


    const fetchUserData = async () => {
        if (!token) {
            navigate("/log-in");
        }
        try {
            const response = await fetch("http://localhost:8000/api/userprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIsLoading(false);
            } else {
                console.log("Error fetching data from MongoDB");
            }
        } catch (error) {
            console.log("Error fetching data from MongoDB:", error);
        }
    };

    return (
        <div className="userContent">
            <div className="bodyUser">
                <div className="BlockContent">
                    {/* Access userData.username and userData.role */}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Profile
                            avt={logo}
                            username={userData.UserProfile[0].username}
                            role={userData.UserProfile[0].role}
                            games={userData.UserProfile[0].games}
                        />
                    )}
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
};

export default UserProfile;