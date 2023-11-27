import React from "react";
import "./CmtBox.scss";
import img1 from "../../../Assets/logo.png";

const CmtBox = () => {
    //test 
    const username = "Kai Mink";
    const comment = "web như loz";
    return (
        <div className="CmtBox flex" >
        <img src={img1} className="UserIcon" alt="User Icon"/>
        <div className="CmtContent grid">
            <p><span style={{ fontWeight: 'bold' }}>Người dùng: </span>{username}</p>
            <p><span style={{ fontWeight: 'bold' }}>Bình luận: </span>{comment}</p>
        </div>
        </div>
    )
}

export default CmtBox