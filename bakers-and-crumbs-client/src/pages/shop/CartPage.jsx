
import React, { useContext, useState, useEffect } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, refetch] = useCart() || [];
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(cart)) {
      // Sync cartItems state with cart
      setCartItems(cart);
    }
  }, [cart]); // Only update when cart changes

  // Calculate price for an item
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = (item) => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        refetch();
      });
  };

  // Handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          setCartItems(updatedCart);
          refetch();
        });
    } else {
      alert("Item quantity can't be zero");
    }
  };

  // Handle delete action
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/carts/${item._id}`, {
            method: "DELETE",
          });
  
          // Optimistic update: Remove item immediately from local state
          setCartItems((prevItems) => prevItems.filter(cartItem => cartItem._id !== item._id));
          
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
  
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };
  
  // Calculate subtotal for the cart
  const cartSubTotal = Array.isArray(cart) ? cartItems.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0) : 0;

  const orderTotal = cartSubTotal;

  return (
    <div className="section-container">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] overflow-hidden">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold ms:leading-snug leading-snug text-black">
              Items added to the <span className="text-pink"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      {
        Array.isArray(cart) && cart.length > 0 ? (
          <div>
            <div className=''>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-pink text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Food</th>
                      <th>Item name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Loop through cart items */}
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img src={item.image} alt="" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{item.name}</td>
                        <td>
                          <button
                            className="btn btn-xs bg-white border-white text-black hover:text-white"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            className="bg-white w-10 mx-2 text-center overflow-hidden appearance-none"
                            onChange={(e) => {
                              const updatedCart = cartItems.map((cartItem) => {
                                if (cartItem._id === item._id) {
                                  return {
                                    ...cartItem,
                                    quantity: e.target.value,
                                  };
                                }
                                return cartItem;
                              });
                              setCartItems(updatedCart);
                            }}
                          />
                          <button
                            className="btn btn-xs bg-white border-white text-black hover:text-white"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </td>
                        <td>${calculatePrice(item).toFixed(2)}</td>
                        <th>
                          <button
                            className="btn btn-ghost btn-xs text-red-600"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* customer details */}
            <div className="my-12 flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-1/2 space-y-3">
                <h3 className="font-medium">Customer Details</h3>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>User_id: {user.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="font-medium">Shopping Details</h3>
                <p>Total Items: {cartItems.length}</p>
                <p>Total Price: ${orderTotal.toFixed(2)}</p>
                <Link to='/process-checkout'><button className="btn btn-md bg-pink text-white border-pink px-8 py-1 mt-5">Proceed Checkout</button></Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center mt-20 text-black'>
            <p>Cart is empty. Please add items.</p>
            <br></br>
            <Link to="/menu"><button className='btn bg-pink text-white border-pink mt-3'>Back to Menu</button></Link>
          </div>
        )
      }
    </div>
  );
};

export default CartPage;
