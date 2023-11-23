import React from "react";
import "./GameList.scss";
import { useNavigate } from "react-router-dom";
//import icon
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

const GameList = ({ imgSrc, gameName, description }) => {
  const navigate = useNavigate();

  const handleGameBoxClick = () => {
    // Chuyển hướng sang trang `/{gameName}`
    navigate(`/${gameName}`);
  };

  return (
    <div className="GameBox flex" >
      <img src={imgSrc} className="GameIcon" alt="Game Icon" onClick={handleGameBoxClick} />
      <div className="GameContent grid" onClick={handleGameBoxClick}>
        <p><span style={{ fontWeight: 'bold' }}>Tên Game: </span>{gameName}</p>
        <p><span style={{ fontWeight: 'bold' }}>Giới thiệu: </span>{description}</p>
      </div>
      <div className="emo grid">
        <button className="like">
          <AiOutlineLike />
        </button>
        <button className="dislike">
          <BiDislike />
        </button>
      </div>
    </div>
  );
};

export default GameList;