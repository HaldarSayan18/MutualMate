import React, { useEffect } from 'react'
import '../App.css';
import Header1 from '../components/Header1';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../components/API';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        try {
            const { data } = await axios.post(`${BASE_URL}/login`, values);
            toast.success("Logged in Successfully!", {
                // autoClose: 2000,
                position: "top-center",
                pauseOnHover: false,
                onClose: () => navigate('/'),
            });
            localStorage.setItem('user', JSON.stringify({ ...data, password: "" }));
        } catch (error) {
            toast.error("Invalid credentials. Please try again.", {
                position: "top-center"
            });
            console.log(error);
        }
    };
    // prevent for login user & protect the route
    useEffect(() => {
        const users = localStorage.getItem("user");
        console.log('users====>', users);
        if (users) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Header1 />
            <ToastContainer />
            <div className="login-page">
                <h2 className='welcome'>Welcome Back</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className='login-form-attributes'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' className='login-form-input' id='email' name='email' placeholder='Enter email' required />
                    </div>
                    <div className='login-form-attributes'>
                        <label htmlFor="password">Password</label>
                        <input type='password' className='login-form-input' name='password' id='password' placeholder='Enter password' required />
                    </div>
                    <button type='submit' className='login-btn'>Login</button>
                    <div className='signup-section'>
                        <p>Don't have an Account? </p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "700", color: 'blueviolet', cursor: "pointer" }} onClick={() => navigate('/register')}>Sign Up</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login