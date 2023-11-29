import React from "react";
import "./GameList.scss";
import { useNavigate } from "react-router-dom";
//import icon
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import Popup from "reactjs-popup";
import LikeForm from "./Popup/LikeForm";
import DislikeForm from "./Popup/DislikeForm";


const GameList = ({ imgSrc, Key, gameName, description, likes, dislikes, status }) => {
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
      <Popup modal trigger={<button className="like">
                            <AiOutlineLike />
                            </button>}>
        <LikeForm Key={Key} />
      </Popup>
      <p className="emo-count">{likes}</p>
      <Popup modal trigger={<button className="dislike">
                            <BiDislike />
                            </button>}>
        <DislikeForm Key={Key} />
      </Popup>
      <p className="emo-count">{dislikes}</p>
</div>
    </div>
  );
};

export default GameList;