"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import createJWT from "@/utils/createedJWT";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const { signIn, googleLogin } = useAuth();
  const search = useSearchParams()
  const from = search.get("redirectUrl") || '/';
  const {replace} = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading("Loading.......")
    try {
      const user = await signIn(email, password);
      await createJWT({email})
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
         const user = await googleLogin()
         await createJWT({email:user?.email})
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
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered input-warning"
            {...register("email")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered input-warning"
            {...register("password")}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-warning" type="submit" value="Log in" />
        </div>
      </form>
      <button
        onSubmit={handleGoogleSubmit}
        className="btn btn-circle btn-outline mx-auto"
      >
        <Toaster/>
        <FcGoogle className="text-2xl" />
      </button>
    </>
  );
};

export default LoginForm;
