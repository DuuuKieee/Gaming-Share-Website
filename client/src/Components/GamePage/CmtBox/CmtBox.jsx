import React from "react";
import "./CmtBox.scss";
import img1 from "../../../Assets/logo.png";
//import icon
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

const CmtBox = ({username, comment, flag}) => {
    //test 
    console.log(typeof username)
    return (
        <div>
            <div className="CmtBox flex" >
                <img src={img1} className="UserIcon" alt="User Icon"/>
                <div className="CmtContent grid">
                    <p><span style={{ fontWeight: 'bold' }}>Người dùng: </span>{username}</p>
                    <p><span style={{ fontWeight: 'bold' }}>Bình luận: </span>{comment}</p>
                    {flag ? (
                        <AiOutlineLike className="icon" />
                    ):
                    (
                        <BiDislike className="icon"/>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default CmtBox