import React from 'react'
import '../App.css';
import Header1 from '../components/Header1';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleRegClick = () => {
        navigate('/register')
    }
    return (
        <>
            <Header1 />
            <div className="login-page">
                <h2 className='welcome'>Welcome Back</h2>
                <form action="" className="login-form">
                    <div className='login-form-attributes'>
                        <h4>Email Address</h4>
                        <input className='login-form-input' placeholder='Enter username' />
                    </div>
                    <div className='login-form-attributes'>
                        <h4>Password</h4>
                        <input className='login-form-input' placeholder='Enter password' />
                    </div>
                    <button type='button' className='login-btn'>Login</button>
                    <div className='signup-section'>
                        <p>Don't have an Account? </p>
                        <h3 style={{color:'blueviolet', cursor:"pointer"}} onClick={handleRegClick}>Sign Up</h3>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login