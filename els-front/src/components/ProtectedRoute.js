import {
    Navigate,
  } from 'react-router-dom';
import { getUserType } from '../plugins/localStorageHelper';
  
const ProtectedRoute = ({ user, redirectPath = '/', type, otherAuthenticatedRedirectPath, for_auth = false, children }) => {
    if(for_auth && user) {
        return <Navigate to={redirectPath} replace />;
    }
    else if (!user && for_auth === false) {
        return <Navigate to={redirectPath} replace />;
    }
    else if (user && type !== getUserType()) {
        return <Navigate to={otherAuthenticatedRedirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
