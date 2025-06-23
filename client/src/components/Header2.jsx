import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';


const Header2 = () => {
    const navigate = useNavigate();
    return (
        <div className="login-header">
            <div className="project-name" style={{
                backgroundImage: 'linear-gradient(to right,rgba(19, 181, 187, 0.61),rgba(172, 46, 221, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}>
                <h2>MutualMind</h2>
            </div>
            <div className="header2-right">
                <button className="header2-btn" onClick={() => navigate('/')}>
                    Saved
                </button>
                <button className="header2-btn" onClick={() => navigate('/')}>
                    Profile
                </button>
            </div>
        </div>
    )
}

export default Header2