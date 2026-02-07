import React, { useContext, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import Modal from '../components/Modal';
import logo1 from '/b_clogo.png';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();
  const [cart, refetch] = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Automatically fetch cart updates at a set interval
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const navItems = (
    <>
      <li><a href='/'>Home</a></li>
      <li><a href='/menu'>Menu</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2 bg-white">
            <li><a>Online Order</a></li>
            <li><a>Takeway</a></li>
            <li><a>Dine-in</a></li>
          </ul>
        </details>
      </li>
      <li><a>Offers</a></li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div className={`navbar xl:px-24 shadow-md bg-base-100 transition-all duration-300 ease-in-out`} style={{ backgroundColor: 'white' }}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <a href="/" className="flex items-center">
            <img src={logo1} alt="" className="w-64 h-37" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>

        <div className="navbar-end">
          <Link to="/cart-page">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 lg:flex items-center justify-center">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
              </div>
            </div>
          </Link>

          <div>
            {
              user ? <Profile user={user} /> :
                <button
                  onClick={() => document.getElementById('my_modal_5').showModal()}
                  className="btn bg-pink border-pink rounded-full px-6 text-white flex items-center gap-2">
                  <FaRegUser />Login
                </button>
            }
            <Modal />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
