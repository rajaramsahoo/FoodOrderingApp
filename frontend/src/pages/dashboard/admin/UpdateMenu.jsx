import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";

const UpdateMenu = () => {
    const item = useLoaderData();
    console.log(item._id);

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=a5454c7dc5a67cdfc8dbe83244afe226`;

    const onSubmit = async (data) => {
        try {
            const imageFile = { image: data.image[0] };
            const hostingImg = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (hostingImg) {
                // now send the menu item data to the server with the image url
                const menuItem = {
                    name: data?.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: hostingImg.data.data.display_url,
                };

                const menuRes = await axios.put(`${process.env.REACT_APP_BASEURL}/menu/${item._id}`, menuItem);

                if (menuRes) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Item is updated successfully!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard/manage-items");
                }
            }
        } catch (error) {
            console.log(error)
            // console.error("Error during menu update:", error);
            // Swal.fire({
            //     position: "top-end",
            //     icon: "error",
            //     title: "Failed to update item",
            //     text: "Please try again later.",
            //     showConfirmButton: false,
            //     timer: 1500,
            // });
        }
    };


    return (
        <div className="w-full md:w-[870px] mx-auto px-4">
            <h2 className="text-2xl font-semibold my-4">
                Update <span className="text-green">Menu Item</span>
            </h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            defaultValue={item.name}
                            {...register("name", { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select
                                defaultValue={item.category}
                                {...register("category", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">
                                    Select a category
                                </option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">popular</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                defaultValue={item.price}
                                {...register("price", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("recipe")}
                            className="textarea textarea-bordered h-24"
                            placeholder="recipe details"
                            defaultValue={item.recipe}
                        ></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>

                    <button className="btn bg-green text-white px-6">
                        Update Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};


export default UpdateMenu