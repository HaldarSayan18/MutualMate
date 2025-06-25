import React, { useEffect } from 'react'
import Header1 from '../components/Header1';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../components/API';

const Register = () => {
    const navigate = useNavigate();

    // registration form handler
    const handleRegistration = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {
            fullname: formData.get("fullname"),
            contact: formData.get("contact"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("re-password"),
            terms: formData.get("terms"),
        };
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("password mismatched!")
            return
        };
        try {
            await axios.post(`${BASE_URL}/register`, values, {
                headers: { "Content-Type": "application/json" }
            });
            toast.success("Registration Successfull!")
            navigate("/login");
        } catch (error) {
            toast.error("Check your data properly.")
            console.log("Error during registration - ", error);
        }
        console.log('form-values==>', values);
    };

    // prevent for logged in user
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/login")
        }
    }, [navigate]);

    return (
        <>
            <Header1 />
            <ToastContainer autoClose={2000} position="top-center" pauseOnHover={false} />
            <div className="register-page">
                <h2 className='welcome'>New Registration</h2>
                <form className="register-form" method='post' onSubmit={handleRegistration}>
                    <div style={{ display: "flex", gap: "2rem", width: "88%" }}>
                        <div className='register-form-attributes'>
                            <label htmlFor='fullname'>Full Name</label>
                            <input type='text' className='register-form-input' name='fullname' id='fullname' placeholder='Enter your fullname' required />
                        </div>
                        <div className='register-form-attributes'>
                            <label htmlFor='contact'>Contact Number</label>
                            <input type='tel' className='register-form-input' name='contact' id='contact' placeholder='Enter mobile number' required />
                        </div>
                    </div>
                    <div className='register-form-attributes'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' className='register-form-input' name='email' id='email' placeholder='Enter email id' required />
                    </div>
                    <div style={{ display: "flex", gap: "2rem", width: "88%" }}>
                        <div className='register-form-attributes'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='register-form-input' name='password' id='password' placeholder='Enter password' required />
                        </div>
                        <div className='register-form-attributes'>
                            <label htmlFor='re-password'>Confirm Password</label>
                            <input type='password' className='register-form-input' name='re-password' id='re-password' placeholder='Re-enter password' required />
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem"
                    }}>
                        <input type='checkbox' defaultValue name='terms' id='terms' required />
                        <label htmlFor="terms"> I agree with the <Link to='#'>terms & conditions</Link>.</label>
                    </div>
                    <button type='submit' className='register-btn'>Create Account</button>
                    <div className='signin-section'>
                        <p>Already have an Account? </p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "700", color: 'blueviolet', cursor: "pointer" }} onClick={() => navigate('/login')}>Sign In</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register