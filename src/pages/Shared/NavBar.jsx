import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import carts from '../../assets/icon/151-1511569_cart-notifications-free-shopping-cart-favicon-hd-png-removebg-preview.png';
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  
  const handleLogout = () => {
    logOut()
      .then()
      .catch()
  }

  const navOption = <>
  <li><NavLink to='/'>Home</NavLink></li>
  <li><NavLink to='/menu'>Our Menu</NavLink></li>
  <li><NavLink to='/ourShop/salad'>Our Shop</NavLink></li>
  <li><NavLink to='/secret'>Secret</NavLink></li>
  {
    user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
  }
  {
    user && !isAdmin && <li><NavLink to='/dashboard/userHome'>Dashboard</NavLink></li>
  }
  <li><Link to='/dashboard/cart'>
    <img className="w-8" src={carts} alt="" />
    <div className="badge badge-success text-white">+{cart.length}</div>
  </Link></li>

{/* .email ? */}
  {
      user?
        <>
        {/* <span>{user?.displayName}</span> */}
          <li onClick={handleLogout} className="btn border-0 bg-black text-white">
            Logout</li>
        </> : <Link to="/login">
          <li className="btn border-0 bg-black text-white">
            login</li>
        </Link>
    }
  
  </>
  return (
    <div>
      <div className="navbar fixed z-10 max-w-screen-xl bg-black bg-opacity-20">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {navOption}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost text-xl text-white">BISTRO BOSS</Link>
  </div>
  <div className="navbar-center hidden lg:flex text-white">
    <ul className="menu menu-horizontal px-1">
      {navOption}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    </div>
  );
};

export default NavBar;