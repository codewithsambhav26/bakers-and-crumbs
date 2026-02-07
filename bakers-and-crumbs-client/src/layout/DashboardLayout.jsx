import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import Login from '../components/Login';

import logo1 from '/b_clogo.png';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li className='mt-3'>
            <Link to="/"><MdDashboard />Home</Link>
        </li> 
        <li>
            <Link to="/menu"><FaCartShopping/>Menu</Link>
        </li>
        <li>
            <Link to="/menu"><FaLocationArrow />Order Tracking</Link>
        </li>
        <li>
            <Link to="/menu"><FaQuestionCircle />Customer Support</Link>
        </li>
    </>
)

const DashboardLayout = () => {
    const {loading} = useAuth()
    const [isAdmin, isAdminLoading,refetch] = useAdmin()
  return (
    <div className='bg-white'>
        {
            isAdmin ? <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                {/* Page content here */}
                <div className='flex items-center justify-between mx-4'>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <MdDashboardCustomize /> 
                    </label>
                    <button className='btn rounded-full px-6 bg-pink flex items-center gap-2 text-white border-pink sm:hidden'><FaRegUser />Logout</button>
                </div>
                <div className='mt-5 md:mt-2 mx-4'>
                <Outlet/>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 bg-white">
                {/* Sidebar content here */}
                <li>
                    <Link to="/dashboard" className='felx justify-start mb-3'>
                        <img src={logo1} alt='' className=''/>
                        <span className="badge badge-primary">Admin</span>
                    </Link>
                </li>
                <hr/>
                <li className='mt-3'>
                    <Link to="/dashboard"><MdDashboard />Dashboard</Link>
                </li>
                <li>
                    <Link to="/dashboard"><FaShoppingBag />Manage Bookings</Link>
                </li>
                <li>
                    <Link to="/dashboard/add-menu"><FaPlusCircle />Add menu</Link>
                </li>
                <li>
                    <Link to="/dashboard/manage-items"><FaEdit />Manage items</Link>
                </li> 
                <li className='mb-3'>
                    <Link to="/dashboard/users"><FaUser />All users</Link>
                </li>
                <hr/>
                {
                    sharedLinks
                }
                </ul>
            </div>
        </div> : <Login/>
        }
    </div>
  )
}

export default DashboardLayout
