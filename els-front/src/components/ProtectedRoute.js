import {
    Navigate,
  } from 'react-router-dom';
import { getUserType } from '../plugins/localStorageHelper';
  
const ProtectedRoute = ({ user, redirectPath = '/', type, otherAuthenticatedRedirectPath, for_auth = false, children }) => {
    console.log(for_auth,user)
    if(user) {
        if(for_auth && typeof user === 'object') {
            return <Navigate to={redirectPath} replace />;
        }
        else if (user === 'unauthenticated' && for_auth === false) {
            return <Navigate to={redirectPath} replace />;
        }
        else if (typeof user === 'object' && type !== getUserType()) {
            return <Navigate to={otherAuthenticatedRedirectPath} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
