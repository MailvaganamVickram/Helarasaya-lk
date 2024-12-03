import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [registerUser, {isLoading}] = useRegisterUserMutation();
    const navigate = useNavigate()
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        }
        console.log(data);

        try {
            await registerUser(data).unwrap();
            alert("Registration successful!")
            navigate('/login')
        } catch (error) {
            setMessage("Registration failed")
        }
    }

    return (
        <section className='login-section h-screen flex items-center justify-center'>
            <div className='login-container'>
                <h2 className='login-title'>Please Register</h2>
                <form onSubmit={handleRegister} className='login-form space-y-5 max-w-sm mx-auto pt-8'>
                    <input 
                        onChange={(e) => setUsername(e.target.value)}
                        type='text' 
                        name='username' 
                        id='username' 
                        placeholder='Enter your username' 
                        required 
                        className='login-input' 
                    />

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
                        Register
                    </button>

                    <p className='login-redirect'>
                        Already have an account? <Link to="/login">Click</Link> Here
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register
