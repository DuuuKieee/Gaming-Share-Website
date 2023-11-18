import React, { useEffect, useState } from "react";
import "./GamePage.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

const GamePage = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/playgame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gamename: "test",
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
        
        setResponseData(data); // Lưu giá trị data vào state
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Chỉ gọi fetch một lần khi component được tạo ra
  
  const { unityProvider } = useUnityContext({
    loaderUrl: `http://localhost:8000/games/1700204896962--C.loader.js`,
    dataUrl: `http://localhost:8000/games/1700204896625--C.data.unityweb`,
    frameworkUrl: `http://localhost:8000/games/1700204896961--C.framework.js.unityweb`,
    codeUrl: `http://localhost:8000/games/1700204896965--C.wasm.unityweb`,
  });

  return (
    <div className="gamePageContent">
      <div className="bodyGame">
        <p>Game X</p>
        <div>
          <Unity className="GameWindow" unityProvider={unityProvider} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;