import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

//   
const SocialLogin = () => {

  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () =>{
    googleSignIn()
    .then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.DisplayName
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data);
        navigate('/')
      })
    })
  }
  return (
    <div>
      <div className="p-4 space-y-3 mb-6">
        <h1 className="text-center font-bold">or</h1>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full"><FcGoogle
        ></FcGoogle> Login With Google</button>
      </div>
    </div>
  );
};

export default SocialLogin;