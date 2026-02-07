import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import uploadImage from "../../../utils/uploadImage";  // Assuming your uploadImage function is in utils folder

const AddMenu = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async(data) => {
    try {
      const imageUploadResponse = await uploadImage(data.image[0]);

      if (imageUploadResponse.url) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: imageUploadResponse.url  // Retrieved image URL
        };

        const postMenuItem = await axiosSecure.post('/menu', menuItem);

        if (postMenuItem) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Menu item added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-pink">Menu Item</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Item name is required" })}
              placeholder="Item Name"
              className="input input-bordered w-full bg-white"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Choose Category*</span>
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered bg-white text-black"
                defaultValue="default"
              >
                <option disabled value="default">Select a category</option>
                <option value="donut">Donut</option>
                <option value="cake">Cake</option>
                <option value="cupcake">Cupcake</option>
                <option value="beverage">Beverage</option>
                <option value="brownie">Brownie</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                placeholder="Price"
                className="input input-bordered w-full bg-white"
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Details</span>
            </label>
            <textarea
              {...register("recipe", { required: "Recipe details are required" })}
              className="textarea textarea-bordered h-24 bg-white"
              placeholder="Tell us about your item recipe"
            ></textarea>
            {errors.recipe && <p className="text-red-500">{errors.recipe.message}</p>}
          </div>

          <div className="form-control w-full my-6">
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="file-input w-full bg-white"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          <button type="submit" className="btn bg-pink text-white px-6 flex items-center gap-2">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;



