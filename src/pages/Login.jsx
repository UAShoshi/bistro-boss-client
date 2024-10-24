import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from "react-router-dom";
import authentication1 from '../assets/others/authentication1.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../component/SocialLogin';


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  console.log('state in the location login page', location.state);

  useEffect( () => {
    loadCaptchaEnginge(6);
  }, [])


  const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User login successful!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      navigate(from, {replace: true});
    })
    .catch(error => {
      console.error(error);
     })
  }

  const handleValidateCaptcha = (e) =>{
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }


  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>Bistro Boss | LogIn</title>
      </Helmet>
    <div className="hero-content flex-col lg:flex-row">
      <div className="text-center lg:text-left">
        <img className="w-2/3" src={authentication1} alt="" />
      </div>
      <div className="card shrink-0 w-full max-w-sm border border-base-300 bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
        <h1 className="text-4xl font-bold text-center">Login</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="Your email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="Your password" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
            <LoadCanvasTemplate />
            </label>
            <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha above" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <input disabled={disabled} className="btn bg-[#D1A054] text-white" type="Submit" value="Sign In" />
          </div>
          <SocialLogin></SocialLogin>
        </form>
        <p className="text-center text-[#D1A054]">New here? <Link to="/signup" className="text-[#D1A054] font-semibold">Create a New Account</Link></p>
      </div>
    </div>
  </div>
  );
};

export default Login;