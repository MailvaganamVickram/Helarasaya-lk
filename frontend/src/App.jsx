//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom';
import './App.css'; // Keep it if custom styles are added
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      
      <Navbar/>
      <Outlet/>
      <Footer></Footer>
    </div>
  );
}

export default App;