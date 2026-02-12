import React from 'react';
import Layout from '../components/Layout';

const Settings = () => {
    // In a real app, we would fetch this from the user session
    // For now, we will hardcode the user we seeded in the DB
    const user = {
        name: 'John Doe',
        email: 'john.doe@client.com',
        phone: '+91 98765 43210',
        clientId: 'XC-1029'
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        alert("Password update feature is disabled in this demo.");
    };

    return (
        <Layout title="Settings">
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                <div className="card">
                    {/* Profile Section */}
                    <div style={{marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem'}}>
                        <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem'}}>Profile Information</h3>
                        
                        <div style={{marginBottom: '1.2rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>Full Name</label>
                            <input type="text" value={user.name} readOnly 
                                style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-body)', cursor: 'not-allowed', color: 'var(--text-main)'}} />
                            <small style={{fontSize: '0.75rem', marginTop: '4px', display: 'block', color: 'var(--text-muted)'}}>Contact Admin to update personal details.</small>
                        </div>

                        <div style={{marginBottom: '1.2rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>Email Address</label>
                            <input type="email" value={user.email} readOnly 
                                style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-body)', color: 'var(--text-main)'}} />
                        </div>
                         <div style={{marginBottom: '1.2rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>Client ID</label>
                            <input type="text" value={user.clientId} readOnly 
                                style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-body)', color: 'var(--text-main)', fontFamily: 'monospace'}} />
                        </div>
                    </div>

                    {/* Security Section */}
                    <div style={{marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem'}}>
                        <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem'}}>Security</h3>
                        
                        <div style={{marginBottom: '1.2rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>Current Password</label>
                            <input type="password" placeholder="••••••••" 
                                style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-body)', color: 'var(--text-main)'}} />
                        </div>

                        <div style={{marginBottom: '1.2rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)'}}>New Password</label>
                            <input type="password" placeholder="Enter new password" 
                                style={{width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-body)', color: 'var(--text-main)'}} />
                        </div>

                        <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
                        
                        <p style={{marginTop: '1rem', fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <i className="fas fa-lock"></i> Note: Forgot Password is disabled. Contact support@broker.com for resets.
                        </p>
                    </div>

                    {/* Preferences Section */}
                    <div>
                        <h3 style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem'}}>Preferences</h3>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                            <span>Email Daily Reports</span>
                            <input type="checkbox" defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;