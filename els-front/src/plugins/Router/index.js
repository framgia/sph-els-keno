import {
    useRoutes,
} from "react-router-dom";
import Main from "../../templates/Main.js";
import Auth from "../../templates/Auth";

import ProtectedRoute from "../../components/ProtectedRoute.js";

import Register from "../../pages/user/Register.js";
import Login from "../../pages/user/Login.js";
import Profile from "../../pages/user/Profile.js";
import Dashboard from "../../pages/user/Dashboard.js";
import Categories from "../../pages/user/Categories";
import Users from "../../pages/user/Users.js";
import Lessons from "../../pages/user/Lessons.js";
import LessonQuiz from "../../pages/user/LessonQuiz.js";

import AdminCategories from "../../pages/admin/Categories";
import CategoryForm from "../../pages/admin/CategoryForm.js";

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
                    path : "profile/:id",
                    element : <Profile />
                },
                {
                    path : "dashboard",
                    element : <Dashboard />
                },
                {
                    path : "categories",
                    element : <Categories />
                },
                {
                    path : 'categories/:id/lessons',
                    element : <Lessons />
                },
                {
                    path : 'lessons/:id',
                    element : <LessonQuiz />
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
                    element : <AdminCategories />
                },
                {
                    path : "categories/create",
                    element : <CategoryForm />
                },
                {
                    path : "categories/edit/:id",
                    element : <CategoryForm />
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
