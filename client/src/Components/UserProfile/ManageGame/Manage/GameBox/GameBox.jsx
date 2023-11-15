import React, { useState } from "react";
import "./GameBox.scss";

/*import icon*/
import {ImBin} from "react-icons/im";
import {AiOutlineEdit} from "react-icons/ai";
import {GiSaveArrow} from "react-icons/gi";


const ManageGameBox = ({ imgSrc, gameName, description }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [GameName, setGameName] = useState(`${gameName}`); // Giá trị mặc định của tên game
    const [gameDescription, setGameDescription] = useState(`${gameName}`);
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
        //làm việc với database xóa game
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
        <div className="ManageGameBox flex">
                    <img src={imgSrc} className="GameIcon"></img>
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
                                value={description}
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
        </div>
    )
}

export default ManageGameBox;