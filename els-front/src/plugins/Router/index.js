import {
    useRoutes,
} from "react-router-dom";
import { useState } from "react";
import Main from "../../components/Main.js";
import Auth from "../../components/Auth";
import ProtectedRoute from "../../components/ProtectedRoute.js";
import Profile from "../../components/Profile.js";
import Dashboard from "../../components/Dashboard.js";
import LearnedWords from "../../components/LearnedWords.js";
import Login from "../../components/Login.js";
import Register from "../../components/Register.js";

const Routes = () => {
    const [user, setUser] = useState(null);

    let routes = useRoutes([
        { 
            path: "/",
            element: 
                <ProtectedRoute user={user} redirectPath="/auth/login"> 
                    <Main />
                </ProtectedRoute>,
            children : [
                {
                    path : "profile",
                    element : <Profile />
                },
                {
                    path : "dashboard",
                    element : <Dashboard />
                },
                {
                    path : "learned-words",
                    element : <LearnedWords />
                }
            ]
        },
        { 
            path: "/auth", 
            element: 
                <ProtectedRoute user={user} for_auth redirectPath="/"> 
                    <Auth /> 
                </ProtectedRoute>,
            children : [
                {
                    path : "login",
                    element : <Login />
                },
                {
                    path : "register",
                    element : <Register />
                }
            ]
        },
        // ...
    ]);

    return routes;
}

export default Routes;
