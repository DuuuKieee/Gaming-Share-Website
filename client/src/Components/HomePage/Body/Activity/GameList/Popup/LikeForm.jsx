import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import "./LikeForm.scss";

const LikeForm = (Key) => {
  const [gameDescription, setGameDescription] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Thêm state isSubmitted

  const fetchDataFromMongoDB = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Key.Key,
          userid: "testuser",
          likeStatus: 1,
          comment: gameDescription,
        }),
      });

      if (response.ok) {
        console.log("Update thanh cong");
        setIsSubmitted(true); // Đặt isSubmitted thành true sau khi thành công
      } else {
        console.log("Error fetching data from MongoDB");
      }
    } catch (error) {
      console.log("Error fetching data from MongoDB:", error);
    }
  };

  const handleGameDescriptionChange = (event) => {
    setGameDescription(event.target.value);
  };

  // Kiểm tra nếu đã submit thành công, hiển thị thông báo và ẩn form
  if (isSubmitted) {
    return (
      <div className="PopUpContent grid">
        <h2 className="PopUpTilte">Đánh giá</h2>
        <p>Đã gửi đánh giá thành công!</p>
      </div>
    );
  }

  // Nếu chưa submit hoặc submit không thành công, hiển thị form bình thường
  return (
    <div className="PopUpContent grid">
      <h2 className="PopUpTilte">Đánh giá</h2>
      <div className="Properties flex">
        <h3 className="Property">Hãy viết bài đánh giá:</h3>
        <input
          type="text"
          className="Input"
          onChange={handleGameDescriptionChange}
          placeholder="Review game..."
        />
      </div>
      <button className="Upload flex" onClick={fetchDataFromMongoDB}>
        <p>Đánh giá</p>
      </button>
    </div>
  );
};

export default LikeForm;