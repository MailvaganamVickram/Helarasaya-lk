import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi'
import { setUser } from '../redux/features/auth/authSlice'




const Login = () => {
    const [message, setMessage] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch();
    const[loginUser, {isLoading : loginLoading}] = useLoginUserMutation()
    const navigate = useNavigate()
    

    // handle login and password
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

       try {
        
        const response = await loginUser(data).unwrap();
        console.log(response)
        const {token, user} = response
        dispatch(setUser({user}))
        alert("Login successful");
        navigate("/")
       
       } catch (error) {
        setMessage("Please provide a valid email and password")
       }

    }
  return (
    <section className='login-section h-screen flex items-center justify-center'>
    <div className='login-container'>
        <h2 className='login-title'>Please Login</h2>
        <form onSubmit={handleLogin} className='login-form space-y-5 max-w-sm mx-auto pt-8'>
            <input 
                onChange={(e) => setEmail(e.target.value)}
                type='email' 
                name='email' 
                id='email' 
                placeholder='Enter your email' 
                required 
                className='login-input' 
            />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                type='password' 
                name='password' 
                id='password' 
                placeholder='Enter your password' 
                required 
                className='login-input' 
            />

            {message && <p className='login-error'>{message}</p>}

            <button type='submit' className='login-button'>
                Login
            </button>

            <p className='login-redirect'>
                Don't have an account? <Link to="/register">Click</Link> Here
            </p>
        </form>
    </div>
</section>

  )
}

export default Login
