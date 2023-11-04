import React from "react";
import "./GamePage.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

const GamePage = () => {
    const { unityProvider}  = useUnityContext({
        loaderUrl: "#",
        dataUrl: "#",
        frameworkUrl: "#",
        codeUrl: "#",
      });
    return(
    <div className="gamePageContent ">
        <div className="bodyGame">
            <p>Game X</p>
            <div className="GameWindow">

            </div>
        </div>
    </div>
    )
}
export default GamePage