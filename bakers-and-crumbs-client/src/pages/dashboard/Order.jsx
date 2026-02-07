
import React, { useState } from "react";
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/payments?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
  });

  const [cartItems, setCartItems] = useState(orders);
  const orderTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="section-container">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] overflow-hidden">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold ms:leading-snug leading-snug text-black">
              Track All Your <span className="text-pink"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/*table */}
      <div>
        {
          Array.isArray(orders) && orders.length > 0 ? (
            <div>
              <div className=''>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead className="bg-pink text-white rounded-sm">
                      <tr>
                        <th>#</th>
                        <th>Order Date</th>
                        <th>TransitionId</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Loop through cart items */}
                      {orders.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td className="font-medium">{item._id}</td>
                          <td>${item.price}</td>
                          <td>{item.status}</td>
                          <th>
                            <Link to="/contact" className="btn btn-ghost btn-xs text-red-600">
                              Contact
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center mt-20 text-black'>
              <p>Cart is empty. Please add items.</p>
              <br />
              <Link to="/menu"><button className='btn bg-pink text-white border-pink mt-3'>Back to Menu</button></Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Order;
