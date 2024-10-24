import Swal from "sweetalert2";
import SectionTitle from "../../../component/SectionTitle";
import useCart from "../../../hooks/useCart";
import { BsTrash3Fill } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";



const Cart = () => {
  const [ cart, refetch ] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  const axiosSecure = useAxiosSecure();


  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          }
        })
      }
    });
  }
 
  return (
    <div>
      <SectionTitle
      subHeading={'My Cart'}
      heading={'WANNA ADD MORE?'}
      ></SectionTitle>
      <div className="flex justify-evenly">
      <h2 className="text-3xl font-bold mb-8">Total orders: {cart.length}</h2>
      <h2 className="text-3xl font-bold">total price: ${totalPrice}</h2>
      {cart.length ? <Link to='/dashboard/payment'><button className="btn bg-[#D1A054] font-bold text-white">PAY</button></Link> : <button disabled className="btn bg-[#D1A054] font-bold text-white">PAY</button> }
      </div>
      {/* table */}
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-[#D1A054] text-white">
        <th></th>
        <th>ITEM IMAGE</th>
        <th>ITEM NAME</th>
        <th>PRICE</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item, index) => <tr key={item._id}>
          <th>
            {index + 1}
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={item.image} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold"></div>
              </div>
            </div>
          </td>
          <td>
          {item.name}
          </td>
          <td>${item.price}</td>
          <th>
            <button
            onClick={() => handleDelete(item._id)}
             className="btn bg-red-800"><BsTrash3Fill className="text-white"></BsTrash3Fill></button>
          </th>
        </tr>)
      }
      
    </tbody>
    
  </table>
</div>
    </div>
  );
};

export default Cart;