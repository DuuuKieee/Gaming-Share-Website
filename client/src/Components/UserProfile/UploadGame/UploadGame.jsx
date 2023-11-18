import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import "./UploadGame.scss";

const UploadGame = () => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [gameName, setGameName] = useState("");

  const handleFileUpload = async (event) => {
    const files = event.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("games", files[i]); // Cập nhật tên trường thành "games" để khớp với tên trường trong backend
    }

    const gameData = {
      gameName: gameName,
    };

    formData.append("gameData", JSON.stringify(gameData)); // Gửi kèm tên game dưới dạng JSON trong FormData

    try {
      const response = await fetch("http://localhost:8000/upload/multiple", {
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

  return (
    <div className="uploadContent">
      <div className="uploadBody">
        <h2 className="UploadTitle">Upload game</h2>
        <div className="upload flex">
          <label htmlFor="fileInput" className="Button">
            <HiOutlineUpload className="UploadButton" />
          </label>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <h3>Upload game của bạn bằng file .zip</h3>
        </div>
        <div className="gameNameInput">
          <label htmlFor="gameName">Tên game:</label>
          <input
            id="gameName"
            type="text"
            value={gameName}
            onChange={handleGameNameChange}
          />
        </div>
        <div className="status">
          <h2>Status: {status}</h2>
          <h3>{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default UploadGame;