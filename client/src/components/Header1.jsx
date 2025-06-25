import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Header1 = () => {
    const navigate = useNavigate();
    return (
        <div className="login-header">
            <div className="project-name">
                <p style={{
                    backgroundImage: 'linear-gradient(to right,rgba(19, 181, 187, 0.61),rgba(172, 46, 221, 0.7))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    fontSize:"1.5rem",
                    fontWeight:"700"
                }}>MutualMind</p>
            </div>
            <div className="header1-buttons">
                <button className="header1-btn" onClick={()=>navigate('/login')}>
                    Login
                </button>
                <button className="header1-reg-btn" onClick={()=>navigate('/register')}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Header1