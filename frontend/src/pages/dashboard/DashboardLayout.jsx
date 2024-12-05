import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {

  const {user} = useSelector((state) => state.auth);
  if(!user) {
    return <Navigate to="/login" replace/>
  }

  const renderDashboard = () =>{
    switch (user?.role) {
      case 'admin':
        
        return <AdminDashboard/>;
      case 'user': 
        return <UserDashboard/>;
    
      default:
        return <Navigate to="/login" replace/>;
    }
  }
  return (
    <div className="container">
        <header className="md-width sm-width">
            {renderDashboard()}
        </header>
            <main>
          <Outlet />
            </main>
    </div>

  )
}

export default DashboardLayout
