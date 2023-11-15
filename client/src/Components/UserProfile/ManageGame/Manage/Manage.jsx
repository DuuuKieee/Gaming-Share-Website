import React, { useState } from "react";
import "./Manage.scss";

/*import icon*/
import img1 from "../../../../Assets/Video Projects/a1.jpg";
import ManageGameBox from "./GameBox/GameBox";

const Manage = () =>{
    const gameName ="Game-X";
    const description="aaa";
    const [gamesData, setGamesData] = useState([]);
    return (
        <div className="manageContent flex">
            <ul className="ManageGameBoxes grid">
                {/* {gamesData.map((game) => (
                    <ManageGameBox key={game.id} game={game} />
                ))} */}
                <li>
                    <ManageGameBox imgSrc={img1} gameName={gameName} description={description} />
                </li>
            </ul>
        </div>
    )
}

export default Manage