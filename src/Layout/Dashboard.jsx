import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaClipboardList, FaHome, FaListUl, FaShoppingCart, FaUsers } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { PiListLight } from "react-icons/pi";
import { GiShoppingBag } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { LiaUtensilsSolid } from "react-icons/lia";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {

// TODO: get isAdmin value from the database
  const isAdmin = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 drawer drawer-content min-h-screen bg-[#D1A054]">
      <ul className="menu p-4 w-60 text-base-content">
        {
          isAdmin ? <>
 {/* Admin NaBar Sidebar content here */}
 <li className="mb-5">
        <NavLink to={'/dashboard/adminHome'}>
        <FaHome></FaHome>
        Admin Home</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/addItems'}>
        <LiaUtensilsSolid></LiaUtensilsSolid>
        add Items</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/manageItems'}>
        <FaListUl></FaListUl>
        Manage Items</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/bookings'}>
        <FaBook></FaBook>
        Manage Bookings</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/allUsers'}>
        <FaUsers></FaUsers>
        All Users</NavLink>
        </li>
          </>
          :
          <>
           {/* user NavBar Sidebar content here */}
      <li className="mb-5">
        <NavLink to={'/dashboard/userHome'}>
        <FaHome></FaHome>
        User Home</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/reservation'}>
        <FaCalendarAlt></FaCalendarAlt>
        Reservation</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/paymentHistory'}>
        <RiSecurePaymentFill></RiSecurePaymentFill>
        Payment History</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/cart'}>
        <FaShoppingCart></FaShoppingCart>
        My Cart</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/addReview'}>
        <VscPreview></VscPreview>
        Add Review</NavLink>
        </li>
      <li className="mb-5">
        <NavLink to={'/dashboard/myBooking'}>
        <FaClipboardList></FaClipboardList>
        My Booking</NavLink>
        </li>
          </>
        }
     
        {/* Shared navBar */}
        <div className="divider"></div>
        <li className="mb-5">
        <NavLink to={'/'}>
        <FaHome></FaHome>
        Home</NavLink>
        </li>
        <li className="mb-5">
        <NavLink to={'/menu'}>
        <PiListLight></PiListLight>
        Menu</NavLink>
        </li>
        <li className="mb-5">
        <NavLink to={'/ourShop/salad'}>
        <GiShoppingBag></GiShoppingBag>
        Shop</NavLink>
        </li>
        <li className="mb-5">
        <NavLink to={'/ourShop/contact'}>
        <MdEmail></MdEmail>
        Contact</NavLink>
        </li>
    </ul>
</div>
<div className="flex-1">
  <Outlet></Outlet>
</div>
    </div>
  );
};

export default Dashboard;