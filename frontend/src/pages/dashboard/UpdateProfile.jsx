import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);
  console.log(user);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const formPath = location.state?.form?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        // Profile updated!
        setUser({
          ...user,
          displayName: name,
          photoURL: photoURL,
        });
        alert("Profile updated successfully");
        navigate(formPath, { replace: true });
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };
  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center ">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            {/* <input
              type="file"
              {...register("photoURL")}
              className="file-input w-full mt-1"
            /> */}
            <input
              type="text"
              {...register("photoURL")}
              placeholder="photo url"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Update"}
              className="btn bg-green text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
