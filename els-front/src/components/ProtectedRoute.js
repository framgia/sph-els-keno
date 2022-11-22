import {
    Navigate,
  } from 'react-router-dom';
  
const ProtectedRoute = ({ user, redirectPath = '/', for_auth = false, children }) => {
    if(for_auth && user) {
        return <Navigate to={redirectPath} replace />;
    }
    if (!user && for_auth == false) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
