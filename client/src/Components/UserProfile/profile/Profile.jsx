import React from "react";
import "./Profile.scss";

const Profile = ({ avt, username, role, games}) =>{
    return (
        <div className="profileContent">
            <div className="profileBody grid">
                <h2 className="profileTitle">Your Profile</h2>
                <div className="InforTable flex">
                    <img src={avt} alt="Tên người dùng" className="Avatar" />
                    <div className="UserInfor grid">
                        <p>Tên người dùng: {username}</p>
                        <p>Vai trò: {role}</p>
                        <p>Số lượng game: {games}</p>
                    </div>
                </div>
                
            </div>
        </div>
        )
}

export default Profile