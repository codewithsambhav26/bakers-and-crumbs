import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const {updateUserProfile}= useContext(AuthContext)
    const{
        register,
        handleSubmit,
        watch,
        formState:{errors}
    } =useForm();

    const location= useLocation();
    const navigate= useNavigate();

    const from =location.state?.from?.pathname || "/"

    const onSubmit =(data)=> {
        const name=data.name;
        const photoURL=data.photoURL;
        updateUserProfile(name,photoURL).then(()=>{
            //profile updated
            navigate(from,{replace:true})
        }).catch((error)=>{
            //error occurred
        })
    }


  return (
   <div className='flex items-center justify-center h-screen bg-white'>
     <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl text-black ">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
      <h3 className='font-bold'>Update Your Profile</h3>
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-black text-lg">Name</span>
          </label>
          <input {...register("name")} type="text" placeholder="Your Name" className="input input-bordered bg-white" required  />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black text-lg">Upload Photo</span>
          </label>

          <input type="text" {...register("photoURL")} placeholder='photoURL' className='input input-bordered bg-white' required />

          {/* todo:uploading image will be later  */}
          
{/*           
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
         
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-pink text-white border-pink">Update</button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default UpdateProfile