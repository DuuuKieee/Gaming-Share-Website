import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import "./GameUploadForm.scss";

const GameUploadForm  = () => {
    const [gameName, setGameName] = useState("");
    const [gameDescription, setgameDescription] = useState("");
    const [file, setFile] = useState()
    const [imagefile, setimageFile] = useState()
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const handleFileUpload = async (event) => {
        const formData = new FormData()
        formData.append("fileInput", file)
        formData.append("fileInput", imagefile)
    
        const gameData = {
          gameName: gameName,
          gameDescription: gameDescription,
        };
    
        formData.append("gameData", JSON.stringify(gameData)); // Gửi kèm tên game dưới dạng JSON trong FormData
        console.log(formData);
    
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
      const handleGameDescriptionChange = (event) => {
        setgameDescription(event.target.value);
      };
      console.log(file);

      return (
        <div className="PopUpContent grid">
          <h2 className="PopUpTilte">Upload Form</h2>
          <div className="Properties flex">
            <h3 className="Property">Tên Game:</h3>
            <input
              type="text"
              className="Input"
              onChange={handleGameNameChange}
              placeholder="Tên game của bạn..."
            />
          </div>
          <div className="Properties flex">
            <h3 className="Property">Giới thiệu:</h3>
            <input
              type="text"
              className="Input"
              onChange={handleGameDescriptionChange}
              placeholder="Giới thiệu game của bạn..."
            />
          </div>
          <div className="Properties flex">
            <h3 className="Property">File Game:</h3>
            <label htmlFor="fileInput" className="Browse flex">
              <HiOutlineUpload className="icon" />
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={e => setFile(e.target.files[0])} 
              multiple
              style={{ display: "none" }}
            />
            <h3 className="Property">Upload file .zip</h3>
          </div>
          <div className="Properties flex">
            <h3 className="Property">Hình ảnh:</h3>
            <label htmlFor="imageInput" className="Browse flex">
              <HiOutlineUpload className="icon" />
            </label>
            <input
              id="imageInput"
              type="file"
              onChange={e => setimageFile(e.target.files[0])} 
              multiple
              accept="image/*"
              style={{ display: "none" }}
            />
            
          </div>
          <button className="Upload flex" onClick={handleFileUpload}>
            <p>Upload</p>
          </button>
        </div>
      );
    };
    
    export default GameUploadForm;