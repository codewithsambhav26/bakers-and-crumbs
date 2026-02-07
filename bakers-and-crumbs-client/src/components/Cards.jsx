
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';

const Cards = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const [isHeartFillted, setIsHeartFillted] = useState(false);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    // Get the API base URL from .env.local
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

    // Add to cart btn
    const handleAddtoCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
            fetch(`${API_BASE_URL}/carts`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Item added to cart",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Please Login?",
                text: "Without an account can't able to add product",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "SignUp Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card w-96 shadow-xl bg-white relative">
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={item.image}
                        alt={item.name}
                        className='w-full h-72 object-cover hover:scale-105 transition-all duration-200' // Ensure proper size
                    />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title">{item.name}</h2>
                </Link>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'><span className='text-sm text-red-500'>$</span> {item.price}</h5>
                    <button className="btn bg-pink text-white border-pink" onClick={() => handleAddtoCart(item)}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
