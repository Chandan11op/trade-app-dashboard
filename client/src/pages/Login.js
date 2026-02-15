import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    // Changed 'username' to 'mob_num' to match backend
    const [mob_num, setMobNum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sending 'mob_num' instead of 'username'
            const { data } = await axios.post('http://localhost:5000/api/users/login', {
                mob_num, 
                password
            });

            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.user.status === 'active') {
                 // specific check for admin role if you have it in your User model
                 // For now, redirecting everyone to dashboard
                 navigate('/dashboard');
            } else {
                 setError('Account is not active');
            }

        } catch (err) {
            // detailed error message from backend
            setError(err.response?.data?.msg || 'Invalid Mobile Number or Password');
        }
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--bg-body)', color: 'var(--text-main)'
        }}>
            <div className="card" style={{width: '100%', maxWidth: '400px', padding: '2.5rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <div style={{
                        width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px',
                        display: 'grid', placeItems: 'center', color: 'white', fontSize: '1.5rem', margin: '0 auto 1rem'
                    }}>
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <h2 style={{fontSize: '1.5rem', fontWeight: '700'}}>BrokerConnect</h2>
                    <p className="text-muted">Sign in with Mobile Number</p>
                </div>

                {error && <div style={{
                    background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px',
                    borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div style={{marginBottom: '1.2rem'}}>
                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Mobile Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={mob_num} 
                            onChange={(e) => setMobNum(e.target.value)}
                            style={{width: '100%', padding: '12px', background: 'var(--bg-body)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px'}}
                            placeholder="Enter mobile number"
                        />
                    </div>
                    <div style={{marginBottom: '1.5rem'}}>
                        <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem'}}>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style={{width: '100%', padding: '12px', background: 'var(--bg-body)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px'}}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '12px', fontSize: '1rem'}}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;