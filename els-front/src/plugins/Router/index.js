import {
    useRoutes,
} from "react-router-dom";
import Main from "../../components/Main.js";
import Auth from "../../components/Auth";
import ProtectedRoute from "../../components/ProtectedRoute.js";
import Profile from "../../components/Profile.js";
import Dashboard from "../../components/Dashboard.js";
import Login from "../../components/Login.js";
import Register from "../../components/Register.js";
import Categories from "../../components/admin/Categories";
import Users from "../../components/Users.js";

const Routes = ({ user }) => {

    let routes = useRoutes([
        { 
            path: "/",
            element: 
                <ProtectedRoute user={user} type="user" redirectPath="/auth/login" otherAuthenticatedRedirectPath="/admin/categories"> 
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
                    path : "users",
                    element : <Users />
                }
            ]
        },
        {
            path : "/admin/",
            element : 
                <ProtectedRoute user={user} type="admin" redirectPath="/auth/admin/login" otherAuthenticatedRedirectPath="/dashboard">
                    <Main />
                </ProtectedRoute>,
            children : [
                {
                    path : "categories",
                    element : <Categories />
                }
            ]
        },
        { 
            path: "/auth", 
            element: 
                <ProtectedRoute user={user} for_auth redirectPath="/dashboard"> 
                    <Auth /> 
                </ProtectedRoute>,
            children : [
                {
                    path : "login",
                    element : <Login />
                },
                {
                    path : "admin/login",
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
