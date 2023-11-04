import React from "react";
import "./SideBar.scss";

import logo from "../../Assets/logo.png"
const SideBar = () => {
    return (
        <div className="sideBar">
            <div className="logo flex">
                <a href="/" className="noneColorLink">
                    <img src={logo} alt="Img Name"></img>
                    <h2 style={{ fontSize: "var(--h3Fontsize)",color: "var(--titleText)"  }}>GameWeb</h2>
                </a>
            </div>
            <div className="Tag">
                <h3 className="Title">
                    MENU
                </h3>
                <ul className="UserMenuList grid">
                    <li className="ListItems">
                        <a href="User-Profile" className="tagLink">
                            Trang cá nhân
                        </a>
                    </li>
                    <li className="ListItems">
                        <a href="/log-in" className="tagLink">
                            Đăng xuất
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default SideBar