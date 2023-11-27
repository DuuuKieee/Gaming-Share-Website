import React, { useState, useEffect } from "react";
import "./Manage.scss";

/*import icon*/
import ManageGameBox from "./GameBox/GameBox";
import Cookies from "js-cookie";
const Manage = () => {

  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataFromMongoDB();
  }, []);
  const token = Cookies.get("token");
  const fetchDataFromMongoDB = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token
          }),
        })

      if (response.ok) {
        const data = await response.json();
        setGamesData(data);
        setIsLoading(false);
      } else {
        console.log("Error fetching data from MongoDB");
      }
    } catch (error) {
      console.log("Error fetching data from MongoDB:", error);
    }
  };
  useEffect(() => {
    console.log(gamesData);
  }, [gamesData]);

  const gameName = "Game-X";
  const description = "aaa";
  return (
    <div className="manageContent flex">
      <ul className="ManageGameBoxes grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : gamesData && gamesData.userData.length > 0 ? (
          gamesData.userData.map((game) => <ManageGameBox imgSrc={`http://localhost:8000/games/${game.image}`} key={game.id} description={game.description} gameName={game.name} />)
        ) : (
          <p>No games available</p>
        )}
      </ul>
    </div>
  )
}

export default Manage