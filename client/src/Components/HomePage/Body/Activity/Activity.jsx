import React from "react";
import "./Activity.scss";
import img1 from "../../../../Assets/Video Projects/a52.jpg";

const Activity = () => {
    return (
        <div className="Body flex">
            <ul className="GameBoxes grid">
                <li className="GameBox flex">
                    <a href="Game-X" target="_self">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>Game 1</p>
                        <p>Description/Like</p>
                    </div>
                    </a>
                </li>
                <li className="GameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">  
                        <p>Game 2</p>
                        <p>Description/Like</p>
                    </div>
                </li>
                <li className="GameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>Game 3</p>
                        <p>Description/Like</p>
                    </div>
                </li>
                <li className="GameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>Game 4</p>
                        <p>Description/Like</p>
                    </div>
                </li>
                <li className="GameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>Game 5</p>
                        <p>Description/Like</p>
                    </div>
                </li>
                <li className="GameBox flex">
                    <img src={img1} className="GameIcon"></img>
                    <div className="GameContent grid">
                        <p>Game 6</p>
                        <p>Description/Like</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Activity