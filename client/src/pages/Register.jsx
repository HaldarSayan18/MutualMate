import React from 'react'
import Header1 from '../components/Header1';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    };
    return (
        <>
            <Header1 />
            <div className="register-page">
                <h2 className='welcome'>New Registration</h2>
                <form action="" className="register-form">
                    <div style={{ display: "flex", gap: "2rem", width: "88%" }}>
                        <div className='register-form-attributes'>
                            <h4>Full Name</h4>
                            <input className='register-form-input' placeholder='Enter your fullname' />
                        </div>
                        <div className='register-form-attributes'>
                            <h4>Contact Number</h4>
                            <input className='register-form-input' placeholder='Enter mobile number' />
                        </div>
                    </div>
                    <div className='register-form-attributes'>
                        <h4>Email Address</h4>
                        <input className='register-form-input' placeholder='Enter email id' />
                    </div>
                    <div style={{ display: "flex", gap: "2rem", width: "88%" }}>
                        <div className='register-form-attributes'>
                            <h4>Password</h4>
                            <input className='register-form-input' placeholder='Enter password' />
                        </div>
                        <div className='register-form-attributes'>
                            <h4>Confirm Password</h4>
                            <input className='register-form-input' placeholder='Re-enter password' />
                        </div>
                    </div>
                    <button type='button' className='register-btn'>Create Account</button>
                    <div className='signin-section'>
                        <p>Already have an Account? </p>
                        <h3 style={{ color: 'blueviolet', cursor:"pointer" }} onClick={handleClick}>Sign In</h3>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register