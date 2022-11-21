import {
    useRoutes,
} from "react-router-dom";
import Main from "../../components/Main.js";
import Auth from "../../components/Auth";
import ProtectedRoute from "../../components/ProtectedRoute.js";

const Routes = () => {
    let routes = useRoutes([
        { 
            path: "/",
            element: 
                <ProtectedRoute user={true} redirectPath="/auth/login"> 
                    <Main />
                </ProtectedRoute>
        },
        { 
            path: "/auth", 
            element: 
                <ProtectedRoute user={true} for_auth redirectPath="/s"> 
                    <Auth /> 
                </ProtectedRoute>
        },
        // ...
    ]);

    return routes;
}

export default Routes;