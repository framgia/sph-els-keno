import React from "react";
import { Link, Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <div className="mx-auto flex min-h-screen w-full items-center justify-center ">
           <Outlet />
        </div>
    )
}

export default Auth;
