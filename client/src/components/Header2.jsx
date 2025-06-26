import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Header2 = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    // logout handler
    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.warning("Logging out!", {
            position:"top-center",
            onClose: () => navigate('/login')
        });
    };
    return (
        <div className="login-header">
            <ToastContainer />
            <h2 className="project-name" style={{
                backgroundImage: 'linear-gradient(to right,rgba(19, 181, 187, 0.61),rgba(172, 46, 221, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                marginLeft:"-60vw",
            }}
                onClick={() => navigate('/')}
            >
                MutualMind
            </h2>
            <div className="header2-right">
                <button type='button' className="header2-btn" id='profile-btn' onClick={() => navigate('/')}>
                    Hi {user.fullname || "User"}
                </button>
                <button className="header2-btn" onClick={() => navigate(`/save/${user._id}`)}>
                    Saved
                </button>
                <button className="header2-btn" id='profile-btn' onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    )
}

export default Header2