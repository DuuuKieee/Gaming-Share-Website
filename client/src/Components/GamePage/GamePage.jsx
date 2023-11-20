import React, { useState, useEffect } from "react";
import "./GamePage.scss";

const GamePage = () => {
  const [responseData, setResponseData] = useState();

  const playGame = () => {
    fetch("http://localhost:8000/api/playgame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamename: "Legend of Sontinh",
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
  };

  return (
    <div className="gamePageContent">
      <div className="bodyGame">
        <p>Game X</p>
        <div>
          <button onClick={playGame}>Play</button>
          {responseData&&(
            <iframe
              src={`http://localhost:8000/games/unzip/${responseData}/index.html`}
              title="Your Page"
              width="100%"
              height="500px"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;