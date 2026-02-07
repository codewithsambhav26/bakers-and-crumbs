// import React from 'react'
// import { useQuery } from '@tanstack/react-query';
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const Users = () => {
//   const axiosSecure = useAxiosSecure
//   const {refetch, data:users=[]}=useQuery({
//     queryKey:["users"],
//     queryFn: async ()=>{
//         const res =await axiosSecure.length('/users');
//       return res.data;
//     },
// });

// //console.log(users)
// const handleMakeAdmin = user =>{
//   axiosSecure.patch('/users/admin/${user._id}').then(res => {
//     alert(`${user.name} is now admin`);
//     refetch();
//   })
  
// }
//   return (
//     <div>
//           <div className='flex items-center justify-between mx-4 my-4 '>
//             <h5>All Users</h5>
//             <h5>Total users : {users.length}</h5>
//           </div>
//           <div>
//           <div className="overflow-x-auto ">
//       <table className="table table-zebra md:w-[870px] bg-white">
//         {/* head */}
//         <thead className='bg-pink text-white rounded-lg'>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white text-black" >
//           {
//             users.map((user, index)=> (
//             <tr key={index}>
//             <th className='bg-white'>{index +1}</th>
//             <td className='bg-white'>{user.name}</td>
//             <td className='bg-white'>{user.email}</td>
//             <td className='bg-white'>{
//                 user.role === 'admin' ? "Admin" : (
//                   <button onClick={()=> handleMakeAdmin(user)} className="btn btn-xs btn-circle bg-white border-white "><FaUsers/> </button>
//                 )
//             }</td>
//             <td className='bg-white'><button className="btn btn-xs bg-white border-white">
//             <FaTrashAlt />
//                 </button></td>
//           </tr>
//             ))
//           }
          
//         </tbody>
//       </table>
//     </div>
//           </div>
//         </div>
      
    
//   );
// };

// export default Users


import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { refetch, data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });


  const handleMakeAdmin = async (user) => {
    try {
      await axiosSecure.patch(`/users/admin/${user._id}`).then(res =>{
        alert(`${user.name} is now an admin`);
        refetch();
      })

      // Optimistically update the UI
      const updatedUsers = users.map((u) =>
        u._id === user._id ? { ...u, role: 'admin' } : u
      );
      queryClient.setQueryData(['users'], updatedUsers);
      
    } catch (err) {
      console.error(err);
      alert('Failed to update role');
    }
  };

  const handleDeleteUser = user =>{
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      alert(`${user.name} is removed from database`);
      refetch();
    })
  } 

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-4">
        <h5>All Users</h5>
        <h5>Total users: {users.length}</h5>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px] bg-white">
            <thead className="bg-pink text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-black">
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th className="bg-white">{index + 1}</th>
                  <td className="bg-white">{user.name}</td>
                  <td className="bg-white">{user.email}</td>
                  <td className="bg-white">
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-circle bg-white border-white"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td className="bg-white">
                    <button onClick={()=>handleDeleteUser(user)} className="btn btn-xs bg-white border-white">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

