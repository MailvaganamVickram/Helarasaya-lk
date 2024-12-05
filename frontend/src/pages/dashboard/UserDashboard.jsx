import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLoginUserMutation, useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/orders', label: 'Order'  },
    { path: '/dashboard/payments', label: 'Payments' },
    { path: '/dashboard/profile', label: 'Profile'  },
    { path: '/dashboard/reviews', label: 'Reviews'  },
]

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            navigate('/')
            alert("Logout successful")
        } catch (error) {
            console.error("Failed to log out", error)
        }
        
    }
    return (
      <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <Link to="/">Helarasaya<span>.LK</span></Link>
          <p className="dashboard-tagline">User dashboard</p>
        </div>
        <hr className="divider" />
        <ul className="dashboard-nav">
          {
            navItems.map((item) => (
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
            ))
          }
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

export default UserDashboard