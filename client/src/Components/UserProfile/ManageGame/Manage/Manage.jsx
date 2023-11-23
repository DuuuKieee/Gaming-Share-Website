import React, { useState, useEffect } from "react";
import "./Manage.scss";

/*import icon*/
import img1 from "../../../../Assets/Video Projects/a1.jpg";
import ManageGameBox from "./GameBox/GameBox";
import Cookies from "js-cookie";
const Manage = () => {

  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataFromMongoDB();
  }, []);

  const fetchDataFromMongoDB = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.token}`
          },
          body: JSON.stringify({
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
          gamesData.userData.map((game) => <ManageGameBox key={game.id} gameName={game.name} />)
        ) : (
          <p>No games available</p>
        )}
        <li>
          <ManageGameBox imgSrc={img1} gameName={gameName} description={description} />
        </li>
      </ul>
    </div>
  )
}

export default Manage