// import React, { Children, useContext } from 'react'
// import { AuthContext } from '../contexts/AuthProvider'
// import { Navigate, useLocation } from 'react-router-dom';
// import Loading from '../components/Loading';

// const PrivateRouter = () => {

//     const {user,loading}=useContext(AuthContext);

//     const loacation = useLocation();

//     if(loading){
//         return (
//             <Loading/>
//         )
//     }
//     if(user){
//         return Children;
//     }
//   return (
//     <Navigate to="/signup" state= {{from: location}} replace> </Navigate>
//   )
// }

// export default PrivateRouter

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRouter = ({ children }) => { // Accept children as a prop
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // Fix the typo

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children; // Return the passed children
  }

  return <Navigate to="/signup" state={{ from: location }} replace />;
};

export default PrivateRouter;
