import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../../src/App.css";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import Loading from "../components/Loading.jsx";

const Main = () => {
  const {loading}= useContext(AuthContext)
  return (

   <div>

    {
loading ? <Loading/>: <div className="bg-primary ">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
     </div>
    }

   
 
   </div>



   
    
  );
};

export default Main;
