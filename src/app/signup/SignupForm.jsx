"use client"

import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createedJWT";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {

  const {createUser, profileUpdate} = useAuth()
  const search = useSearchParams()
  const from = search.get("redirectUrl") || '/';
  const {replace} = useRouter()

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const uploadImage = async(event) =>{
     const formData = new FormData()
     if(!event.target.files[0]) return;
     formData.append("image",event.target.files[0])
     const toastId = toast.loading("Image uploading....")
     try {
       const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,{
          method:"POST",
          body:formData
       }
       )
      if(!res.ok){throw new Error("Failed to upload image")}

      const data = await res.json()
      toast.dismiss(toastId)
      toast.success("Upload image successful");
      setValue(data.data.url)
     } catch (error) {
      toast.dismiss(toastId)
      toast.error("Image not uploaded!")
     }
  }

  const onSubmit = async(data) => {
    const {name, photo, email, password } = data;
    const toastId = toast.loading("Loading....")
    try {
      const user = await createUser(email, password);
      await createJWT({email})
      await profileUpdate({
        displayName: name,
        photoURL:photo
      });
      toast.dismiss(toastId)
      toast.success("User login successful");
      replace(from)
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(error.message || "user not signed in")
    }
  };

  const handleGoogleSubmit = async() => {
    const toastId = toast.loading("Loading....")
    try {
         const {user} = await googleLogin()
         createJWT({email:user?.email})
         toast.dismiss(toastId)
         toast.success("User login successful");
         replace(from)
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(error.message || "user not signed in")
    }
  };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name", { required: true })} type="text" placeholder="text" className="input input-bordered input-warning"/>
          {errors.name?.type === 'required' && <p role="alert">Name is required</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered input-warning"/>
          {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password", { required: true, minLength:6 })} type="password" placeholder="password" className="input input-bordered input-warning"/>
          {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
          {errors.password?.type === 'minLength' && <p role="alert">Password must be 6 charecter or more</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input {...register("confirnPassword", { required: true, validate:(value)=>value === getValues("password") || "password do not match" })} type="password" placeholder="confirm password" className="input input-bordered input-warning"/>
          {errors.confirnPassword &&(
            <span className="text-red-500 text-base mt-1">
                {errors.confirnPassword.message || "Please confirm your password"}
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="file" {...register("photo", { required: true})}
          onChange={(event) => uploadImage(event)}
          className="file-input file-input-bordered file-input-sm file-input-warning w-full max-w-xs" />
        </div>
        <div className="form-control mt-6">
        <input type="submit" className="btn btn-warning" value="Sign up"/>
        </div>
      </form>
      <button
      onSubmit={handleGoogleSubmit}
      className="btn btn-circle btn-outline mx-auto"
    >
      <FcGoogle className="text-2xl" />
    </button>
    <Toaster />
      </>
    );
};

export default SignupForm;