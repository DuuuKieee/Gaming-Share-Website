import React, { useState } from "react";
import "./Manage.scss";

/*import icon*/
import {ImBin} from "react-icons/im";
import {AiOutlineEdit} from "react-icons/ai";
import img1 from "../../../../Assets/Video Projects/a1.jpg";
import {GiSaveArrow} from "react-icons/gi";

const Manage = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [gameName, setGameName] = useState("Game 1"); // Giá trị mặc định của tên game
    const [gameDescription, setGameDescription] = useState("Description");
    const handleEditClick = () => {
        // Khi nhấn nút chỉnh sửa
        setIsEditing(!isEditing); // Đảo ngược trạng thái chỉnh sửa
    };

    const handleSaveClick = () => {
        // Khi nhấn nút lưu (sau khi chỉnh sửa)
        setIsEditing(false); // Tắt chế độ chỉnh sửa
        // Ở đây bạn có thể thực hiện bất kỳ thay đổi nào liên quan đến việc lưu dữ liệu, ví dụ: gửi dữ liệu lên máy chủ
    };
    const handleDelClick = () => {
        //làm việc với database
    };

    const handleNameChange = (e) => {
        // Khi giá trị tên game thay đổi (khi người dùng nhập)
        setGameName(e.target.value); // Cập nhật giá trị tên game
    };

    const handleDiscriptionChange = (e) => {
        // Khi giá trị tên game thay đổi (khi người dùng nhập)
        setGameDescription(e.target.value); // Cập nhật giá trị tên game
    };


    return (
        <div className="manageContent flex">
            <ul className="ManageGameBoxes grid">
                <li className="ManageGameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        {isEditing ? (
                            <>
                            <input className="Input"
                                type="text"
                                value={gameName}
                                onChange={handleNameChange}
                            />
                            <input className="Input"
                                type="text"
                                value={gameDescription}
                                onChange={handleDiscriptionChange}
                            />
                            </>
                        ) : (<>
                            <p>{gameName}</p>
                            <p>{gameDescription}</p>
                            </>
                        )
                        }
                        
                    </div>
                    <div className="CustomContent grid">
                        <button className="CustomButton">
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
                    
                </li>
                
            </ul>
        </div>
    )
}

export default Manage