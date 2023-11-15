import React from "react";
import "./GameUploadForm.scss";

const GameUploadForm  = () => {
    return (
        <div className="PopUpContent grid">
            <h2 className="PopUpTilte">
                Upload Form
            </h2>
            <div className="Properties flex">
                <h3 className="Property">Tên Game:</h3>
                <input type="text" className="Input" placeholder="Tên game của bạn..."/>
            </div>
            <div className="Properties flex">
                <h3 className="Property">Giới thiệu:</h3>
                <input type="text" className="Input" placeholder="Giới thiệu game của bạn..."/>
            </div>
            <div className="Properties flex">
                <h3 className="Property">Đường dẫn:</h3>
                <input type="text" className="Input" placeholder="Đường dẫn file"/>
                <button className="Browse flex">
                    <p>Browse...</p></button>
            </div>
            <button className="Upload flex"><p>Upload</p></button>
        </div>
    )
}

export default GameUploadForm ;