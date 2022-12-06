import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../layouts/TopNav";

const Main = () => {
    return (
        <div>
            <TopNav />
            <div className="mx-auto px-4 max-w-6xl">
                <Outlet />
            </div>
        </div>
    )
}

export default Main;
