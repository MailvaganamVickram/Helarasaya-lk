import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal';

import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';




const Navbar = () => {
  const products = useSelector((state) => state.cart.products || []); // Ensure products array exists
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };
   // show user if logged in
   const dispatch =  useDispatch();
   const {user} = useSelector((state) => state.auth);
   const [logoutUser] = useLogoutUserMutation();
   const navigate = useNavigate()
  
 // dropdown menus
 const [isDropDownOpen, setIsDropDownOpen] = useState(false);
 const handDropDownToggle = () => {
     setIsDropDownOpen(!isDropDownOpen)
 }

 // admin dropdown menu
 const adminDropDownMenus = [
  {label: "Dashboard", path: "/dashboard/admin"},
  {label: "Manage Items", path: "/dashboard/manage-products"},
  {label: "All Orders", path: "/dashboard/manage-orders"},
  {label: "Add Product", path: "/dashboard/add-product"},
]

   // user dropdown menus
   const userDropDownMenus = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Profile", path: "/dashboard/profile"},
    {label: "Payments", path: "/dashboard/payments"},
    {label: "Orders", path: "/dashboard/orders"},
]

const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

//handle logout
const handleLogout = async () => {
  try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate('/')
  } catch (error) {
      console.error("Failed to log out", error)
  }
}

  return (
<header className="fixed-nav-bar w-nav">
  <nav className="max-w-screen-2xl mx-auto px-4 justify-between items-center flex">
    {/* Navigation Links */}
    <ul className="nav__links flex gap-6">
      <li className="link">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
      </li>
      <li className="link">
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>
      </li>
      <li className="link">
        <Link to="/aboutus" className="hover:text-primary">
          About Us
        </Link>
      </li>
      <li className="link">
        <Link to="/contact" className="hover:text-primary">
          Contact
        </Link>
      </li>
    </ul>

    {/* Logo */}
    <div className="nav__logo">
      <Link to="/" className="text-white text-2xl">
        Helarasaya<span className="text-primary">.LK</span>
      </Link>
    </div>

    {/* Navigation Icons */}
    <div className="nav__icons relative flex gap-4">
      {/* Search Icon */}
      <span>
        <Link to="/search">
          <i className="ri-search-line text-xl"></i>
        </Link>
      </span>

      {/* Shopping Bag Icon */}
      <span>
        <button onClick={handleCartToggle} className="cart-button">
          <i className="ri-shopping-bag-line text-xl"></i>
          <sup className="cart-badge">{products.length}</sup>
        </button>
      </span>

      {/* User Icon */}
      <span>
        {user ? (
          <>
            <img
              onClick={handDropDownToggle}
              src={user?.profileImage || avatarImg}
              alt="User Avatar"
              className="user-avatar"
            />
            {isDropDownOpen && (
              <div className="dropdown-container absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
                <ul className="dropdown-list font-medium space-y-4 p-2">
                  {dropdownMenus.map((menu, index) => (
                    <li key={index}>
                      <Link
                        onClick={() => setIsDropDownOpen(false)}
                        className="dropdown-item block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-gray-800 text-gray-700 transition-all duration-200 ease-in-out"
                        to={menu.path}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="dropdown-item block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-gray-800 text-gray-700 transition-all duration-200 ease-in-out"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link to="login">
            <i className="ri-user-line"></i>
          </Link>
        )}
      </span>
    </div>
  </nav>

  {/* Cart Modal */}
  {isCartOpen && (
    <CartModal
      products={products}
      isOpen={isCartOpen}
      onClose={handleCartToggle}
    />
  )}
</header>

  );
};

export default Navbar;
