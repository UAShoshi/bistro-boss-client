import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";


const FoodCard = ({item}) => {
  const {image, name, recipe, price, _id} = item;
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () =>{
    // console.log(food, user.email);
    if (user && user.email) {
      // console.log(user.email, food);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          // refetch cart to update the cart items count
          refetch();
        }
      })
    }
    else{
      Swal.fire({
        title: "You are not logged In!",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          // send the user to the login page
          navigate('/login', {state: {from: location}})
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success"
          // });
        }
      });
    }
  }
  return (
    <div className="card bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white rounded-lg">${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-center">
      <button onClick={handleAddToCart} className="btn btn-outline border-0 border-b-4 mt-4 text-[#BB8506] border-b-[#BB8506]">ADD TO CART</button>
    </div>
  </div>
</div>
  );
};

export default FoodCard;