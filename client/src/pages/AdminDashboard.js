import React from 'react';

const AdminDashboard = () => {
    const logout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <div style={{padding: '2rem', color: 'var(--text-main)', background: 'var(--bg-body)', minHeight: '100vh'}}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Administrator.</p>
            <button onClick={logout} className="btn" style={{marginTop:'1rem', background:'var(--danger)', color:'white', border:'none'}}>Logout</button>
        </div>
    );
};

export default AdminDashboard;