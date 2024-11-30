import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 justify-between items-center flex">
        {/* Navigation Links */}
        <ul className="nav__links flex gap-6">
          <li className='link'>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li className='link'>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
          </li>
          <li className='link'>
            <Link to="/aboutus" className="hover:text-primary">About Us</Link>
          </li>
          <li className='link'>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
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
            <button className="hover:text-primary">
              <i className="ri-shopping-bag-line text-xl"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                0
              </sup>
            </button>
          </span>

          {/* User Icon */}
          <span>
            <Link to="/login">
              <i className="ri-user-line text-xl"></i>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;