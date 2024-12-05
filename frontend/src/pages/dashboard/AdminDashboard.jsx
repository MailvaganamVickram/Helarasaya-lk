import React from 'react'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-product', label: 'Add Product'  },
    { path: '/dashboard/manage-products', label: 'Manage Products' },
    { path: '/dashboard/users', label: 'Users'  },
    { path: '/dashboard/manage-orders', label: 'Manage Orders'  },
]
const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
    <div className="dashboard-container">
  <div className="dashboard-content">
    <div className="dashboard-logo">
      <Link to="/">Helarasaya<span>.LK</span></Link>
      <p className="dashboard-tagline">Admin dashboard</p>
    </div>
    <hr className="divider" />
    <ul className="dashboard-nav">
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink 
            className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            } 
            end 
            to={item.path}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>

  <div className="dashboard-footer">
    <hr className="divider" />
    <button 
      onClick={handleLogout} 
      className="logout-button"
    >
      Logout
    </button>
  </div>
</div>

  )
}

export default AdminDashboard