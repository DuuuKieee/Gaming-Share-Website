import React from "react";
import "./Profile.scss";

import avt from "../../../Assets/Video Projects/a44.jpg"

const Profile = () =>{
    return (
        <div className="profileContent">
            <div className="profileBody grid">
                <h2 className="profileTitle">Your Profile</h2>
                <div className="InforTable flex">
                    <img src={avt} alt="Tên người dùng" className="Avatar" />
                    <div className="UserInfor grid">
                        <h3>Tên</h3>
                        <h3>Role: user/admin</h3>
                        <h3>Số lượng game:</h3>
                    </div>
                </div>
                
            </div>
        </div>
        )
}

export default Profile