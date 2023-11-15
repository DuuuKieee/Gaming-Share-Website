import React, {useState} from "react";
import "./Activity.scss";
import img1 from "../../../../Assets/Video Projects/a52.jpg";
import GameList from "./GameList/GameList";

//fetch data trên mongodb về xong tạo thành trường game 
const ListGame = () => {
    const [gamesData, setGamesData] = useState([]);
    //test
    const name = "Game-X";
    const description = "aaaa";
    return (
        <div className="Body flex">
            <ul className="GameBoxes grid">
                {gamesData.map((game) => (
                    <GameList key={game.id} game={game} />
                ))}
                <GameList imgSrc={img1} gameName={name} description={description} />
            </ul>
        </div>
    )
}

export default ListGame