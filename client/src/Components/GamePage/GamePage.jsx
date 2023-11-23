import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.scss";

const GamePage = () => {
  const [responseData, setResponseData] = useState();
  const { gameName } = useParams();

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
          console.log(gameName);
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
               src={`http://localhost:8000/games/unzip/${responseData}/index.html`}
              title="Your Page" 
            />
          )}
      </div>
    </div>
  );
};

export default GamePage;