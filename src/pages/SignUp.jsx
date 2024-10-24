import { useForm } from "react-hook-form"

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import authentication2 from '../assets/others/authentication2.png';
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../component/SocialLogin";


const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // console.log('user profile info updated');
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database');
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
                }
              })

          }).catch((error) => {
            console.log(error);
          });
      })
      .catch(error => console.error(error))


  }


  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <img src={authentication2} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm border border-base-300 bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name='name' {...register("name", { required: true })} placeholder="Your name" className="input input-bordered" />
              {errors.name && <span className="text-red-600">Name is required.</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input type="text" {...register("photoURL", { required: true })} placeholder="Your PhotoURL" className="input input-bordered" />
              {errors.name && <span className="text-red-600">PhotoURL is required.</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name='email' {...register("email", { required: true })} placeholder="Your email" className="input input-bordered" />
              {errors.email && <span className="text-red-600">Email is required.</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} placeholder="Your password" className="input input-bordered" />
              {errors.password?.type === 'required' &&
                <p className="text-red-600">password is required.</p>}
              {errors.password?.type === 'minLength' &&
                <p className="text-red-600">password must be 6 characters.</p>}
              {errors.password?.type === 'maxLength' &&
                <p className="text-red-600">password must be less than 20 characters.</p>}
              {errors.password?.type === 'pattern' &&
                <p className="text-red-600">Password must have one uppercase one lowercase one number and special characters.</p>}
            </div>
            <div className="form-control mt-6">
              <input className="btn bg-[#D1A054] text-white" type="Submit" value="Sign up" />
            </div>
            <SocialLogin></SocialLogin>
          </form>
          <p className="text-center text-[#D1A054]">Already registered? <Link to="/login" className="text-[#D1A054] font-semibold">Go to log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;