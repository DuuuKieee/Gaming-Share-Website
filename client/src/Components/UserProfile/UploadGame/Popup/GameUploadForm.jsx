import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import "./GameUploadForm.scss";

const GameUploadForm  = () => {
    const [gameName, setGameName] = useState("");
    const [gameDescription, setgameDescription] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const handleFileUpload = async (event) => {
        const files = event.target.files;
    
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("games", files[i]); // Cập nhật tên trường thành "games" để khớp với tên trường trong backend
        }
    
        const gameData = {
          gameName: gameName,
          gameDescription: gameDescription,
        };
    
        formData.append("gameData", JSON.stringify(gameData)); // Gửi kèm tên game dưới dạng JSON trong FormData
    
        try {
          const response = await fetch("http://localhost:8000/upload/single", {
            method: "POST",
            body: formData,
          });
    
          const data = await response.json();
          setStatus(data.status);
          setMessage(data.message);
        } catch (error) {
          console.error(error);
        }
      };

      const handleGameNameChange = (event) => {
        setGameName(event.target.value);
      };
      const handleGameDescriptionChange = (event) => {
        setgameDescription(event.target.value);
      };


    return (
        <div className="PopUpContent grid">
            <h2 className="PopUpTilte">
                Upload Form
            </h2>
            <div className="Properties flex">
                <h3 className="Property">Tên Game:</h3>
                <input type="text" className="Input" onChange={handleGameNameChange} placeholder="Tên game của bạn..."/>
            </div>
            <div className="Properties flex">
                <h3 className="Property">Giới thiệu:</h3>
                <input type="text" className="Input" onChange={handleGameDescriptionChange} placeholder="Giới thiệu game của bạn..."/>
            </div>
            <div className="upload flex">
          <label htmlFor="fileInput" className="Button">
            <HiOutlineUpload className="UploadButton" />
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileUpload}
            multiple
            style={{ display: "none" }}
/>
          <h3>Upload game của bạn bằng file .zip</h3>
        </div>
            <button className="Upload flex" onClick={handleFileUpload}> <p>Upload</p></button>
        </div>
    )
}

export default GameUploadForm ;