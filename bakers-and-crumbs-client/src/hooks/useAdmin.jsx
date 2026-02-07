import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

// const useAdmin = () => {
//     const {user} = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const {refetch, data:isAdmin, isPending :isAdminLoading}=useQuery({
//         queryKey:[user?.email,'isAdmin'],
//         queryFn: async ()=>{
//             const res = await axiosSecure.get(`users/admin/${user?.email}`)
//             console.log(res.data)
//           return res.data?.admin;
//         },
//     })
//   return [isAdmin, isAdminLoading]
// }
 
// export default useAdmin;

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  
    const { refetch, data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
      queryKey: ['isAdmin', user?.email], // Safer query key
      queryFn: async () => {
        if (!user?.email) return false; // Handle undefined email case
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin || false; // Fallback to false if no response
      },
      enabled: !!user?.email, // Only run query when email is available
    });
  
    return [isAdmin, isAdminLoading, refetch];
  };
   
  export default useAdmin;
  
