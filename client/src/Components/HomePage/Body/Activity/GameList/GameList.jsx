import React from "react";
import "./GameList.scss";
//import icon
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
const GameList =({ imgSrc, gameName, description } ) =>{
    return (
        <div className="GameBox flex">
            <a href={`/${gameName}`} target="_self">
                <img src={imgSrc} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>{gameName}</p>
                        <p>{description}</p>
                </div>
            </a>
            <div className="emo grid">
                <button className="like"><AiOutlineLike /></button>
                <button className="dislike"><BiDislike /></button>
            </div>
        </div>
      );
}
export default GameList;