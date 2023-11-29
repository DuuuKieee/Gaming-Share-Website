import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.scss";
import CmtBox from "./CmtBox/CmtBox";

const GamePage = () => {
  const [responseData, setResponseData] = useState();
  const { gameName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [showGameWindow, setShowGameWindow] = useState(false);

  const playGame = () => {
    fetch("http://localhost:8000/api/playgame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamename: gameName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Xử lý thành công
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        // Xử lý dữ liệu trả về
        setResponseData(data.gameData); // Lưu giá trị data vào state
      })
      .catch((error) => {
        console.error(error); 
      });
      setShowGameWindow(true);
  };

  return (
    <div className="gamePageContent">
      <div className="bodyGame">
        <p>{gameName}</p>
          {!showGameWindow && (
          <button className="playButton" onClick={playGame}>Play</button>
          )}
          {responseData && showGameWindow && (
            <iframe className="GameWindow"
               src={`http://localhost:8000/games/unzip/${responseData.data}/index.html`}
              title="Your Page" 
            />
          )}
      </div>
      <div className="CmtBoxes">
          <h1>Bình luận:</h1>
          {!isLoading ? (
          <p>Loading...</p>
        ) : responseData && showGameWindow > 0 ? (
          responseData.usersReview.map((game) => <CmtBox username={game.username} comment={game.comment} flag={game.flag} />)
        
        )
        
        : (
          <p>No games available</p>
        )}
      </div>
    </div>
  );
};

export default GamePage;