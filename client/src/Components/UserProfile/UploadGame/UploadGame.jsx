import React from "react";
import "./UploadGame.scss";
import {HiOutlineUpload} from "react-icons/hi";
const UploadGame = () => {
    return (
        <div className="uploadContent">
            <div className="uploadBody">
                <h2 className="UploadTittle">
                    Upload game
                </h2>
                <div className="upload flex">
                    <button className="Button">
                        <HiOutlineUpload className="UploadButton"/> 
                    </button>
                    <h3>Upload game của bạn bằng file .zip</h3>
                </div>
            </div>
            
        </div>
        )
}
export default UploadGame