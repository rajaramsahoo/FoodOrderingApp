import React, { useContext, useEffect, useState } from 'react'
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form"
import axios from 'axios';
import Swal from "sweetalert2";
import { MenuContext } from "../../../hooks/useMenu"

const AddMenu = () => {
    let token = JSON.parse(localStorage.getItem("token")).token;
    const { menu, setMenu } = useContext(MenuContext);
    const {
        register, handleSubmit, reset, } = useForm()
    const onSubmit = async (data) => {
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=a5454c7dc5a67cdfc8dbe83244afe226`;

        try {
            // Create FormData object and append the image file
            const formData = new FormData();
            formData.append("image", data.image[0]);

            // Upload the image to the hosting API
            const hostingImg = await axios.post(image_hosting_api, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            console.log(hostingImg.data.data.display_url);

            // Check if the image was uploaded successfully
            if (hostingImg.data.success) {
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: hostingImg.data.data.display_url, // Add the image URL to the menu item
                };

                // Post the menu item to your server
                const menuRes = await axios.post(
                    `${process.env.REACT_APP_BASEURL}/menu`,
                    menuItem,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(menuRes);

                if (menuRes) {
                    setMenu(prevMenu => [...prevMenu, menuRes.data]);
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the menu.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again.",
            });
        }
    };



    return (
        <div className="w-full md:w-[870px] mx-auto px-4">
            <h2 className="text-2xl font-semibold my-4">
                Upload A New <span className="text-green">Menu Item</span>
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
                                defaultValue="default"
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
                            placeholder="Bio"
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
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddMenu