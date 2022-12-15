import { Navigate, useLocation } from "react-router-dom"; 

/*
    This is a reusable component and should be used to wrap component which are protected by authentication.
    user: should be a value that can result to true or false or can be converted to a boolean
    children: component between ProtectedRoute

    example:
        <ProtectedRoute user={boolean}>
            <Component /> // Children
        </ProtectedRoute>
*/
export function ProtectedRoute ({ user, children }){
    const location = useLocation()
    
    if (!user) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    return children
  };