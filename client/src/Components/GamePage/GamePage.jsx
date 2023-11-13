import React from "react";
import "./GamePage.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

const GamePage = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "http://localhost:8000/Build/WebDevelopmentProject-main.loader.js",
    dataUrl: "http://localhost:8000/Build/WebDevelopmentProject-main.data.unityweb",
    frameworkUrl: "http://localhost:8000/Build/WebDevelopmentProject-main.framework.js.unityweb",
    codeUrl: "http://localhost:8000/Build/WebDevelopmentProject-main.wasm.unityweb",
  });

  return (
    <div className="gamePageContent">
      <div className="bodyGame">
        <p>Game X</p>
        <div className="GameWindow">
          <Unity unityProvider={unityProvider} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;