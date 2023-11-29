import React, { useState } from "react";
import "./GameBox.scss";

/*import icon*/
import {ImBin} from "react-icons/im";
import {AiOutlineEdit} from "react-icons/ai";
import {GiSaveArrow} from "react-icons/gi";


const ManageGameBox = ({ imgSrc, gameName, description, idkey }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [GameName, setGameName] = useState(); // Giá trị mặc định của tên game
    const [GameID, setID] = useState(`${gameName}`); // Giá trị mặc định của tên game
    const [gameDescription, setGameDescription] = useState(`${description}`);
    const fetchDataFromMongoDB = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/updatedata",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: idkey,
                author: GameName,
                description: gameDescription
              }),
            })
            console.log(idkey + gameName + imgSrc);
    
          if (response.ok) {
            //in gì đó thể hiện thành công
            console.log("Update thanh cong");

          } else {
            console.log("Error fetching data from MongoDB");
          }
        } catch (error) {
          console.log("Error fetching data from MongoDB:", error);
        }
      };
      const deleteDataFromMongoDB = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/deletegame",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: idkey,
                author: "testuser",
              }),
            })
            console.log(idkey + gameName + imgSrc);
    
          if (response.ok) {
            //in gì đó thể hiện thành công
            console.log("Update thanh cong");

          } else {
            console.log("Error fetching data from MongoDB");
          }
        } catch (error) {
          console.log("Error fetching data from MongoDB:", error);
        }
      };
    const handleEditClick = () => {
        // Khi nhấn nút chỉnh sửa
        setIsEditing(!isEditing); // Đảo ngược trạng thái chỉnh sửa
    };
    

    const handleSaveClick = () => {
        // Khi nhấn nút lưu (sau khi chỉnh sửa)
        fetchDataFromMongoDB();
        setIsEditing(false); // Tắt chế độ chỉnh sửa
        // Ở đây bạn có thể thực hiện bất kỳ thay đổi nào liên quan đến việc lưu dữ liệu, ví dụ: gửi dữ liệu lên máy chủ
    };
    const handleDelClick = () => {
        //làm việc với database xóa game
        deleteDataFromMongoDB();
    };

    const handleNameChange = (e) => {
      setGameName(e.target.value); // Cập nhật giá trị tên game
    };

    const handleDiscriptionChange = (e) => {
      setGameDescription(e.target.value);
    };
    return (
        <div className="ManageGameBox flex">
                    <img src={imgSrc} className="GameIcon"></img>
                    <div className="GameContent grid">
                        {isEditing ? (
                            <>
                            <input
                              className="Input"
                              type="text"
                              value={GameName} // Thay đổi này
                              onChange={handleNameChange}
                            />
                            <input
                              className="Input"
                              type="text"
                              value={gameDescription}
                              onChange={handleDiscriptionChange}
                            />
                            </>
                        ) : (<>
                            <p>{gameName}</p>
                            <p>{description}</p>
                            </>
                        )
                        }
                        
                    </div>
                    <div className="CustomContent grid">
                        <button className="CustomButton" onClick={handleDelClick}>
                            <ImBin className="DelIcon"/>
                        </button>
                        {isEditing ? (
                            <button className="CustomButton" onClick={handleSaveClick}>
                                <GiSaveArrow className="EditIcon" />
                            </button>
                            ) : (
                            <button className="CustomButton" onClick={handleEditClick}>
                                <AiOutlineEdit className="EditIcon" />
                            </button>
                        )}
                    </div>
        </div>
    )
}

export default ManageGameBox;