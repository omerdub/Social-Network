import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext, DarkModeContextProvider } from "../../services/context/darkModeContext";
import { Navbar, LeftBar, RightBar } from "../index";
import "./layout.scss";
import { useState } from "react";

export const Layout = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify({ darkMode }));
    }, [darkMode]);

    return <DarkModeContextProvider>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar toggle={toggle} darkMode={darkMode} />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <Outlet />
                </div>
                <RightBar />
            </div>
        </div>
    </DarkModeContextProvider>
}