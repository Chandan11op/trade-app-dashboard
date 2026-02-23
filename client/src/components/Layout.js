import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
    // Initialize state from localStorage to persist theme across page changes
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('appTheme') === 'dark';
    });

    // Toggle Theme Logic
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Apply theme to body and save preference to localStorage
    useEffect(() => {
        if (darkMode) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('appTheme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('appTheme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="app-container">
            <Sidebar />
            
            <main className="main-content">
                {/* Top Bar Header */}
                <header className="top-bar">
                    <h2 style={{fontSize: '1.1rem', fontWeight: '600'}}>{title}</h2>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <button className="btn" style={{padding:'8px'}} onClick={toggleTheme}>
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div style={{textAlign: 'right'}}>
                                <div style={{fontSize: '0.85rem', fontWeight: '600'}}>Client #1029</div>
                                <div style={{fontSize: '0.75rem', color: 'var(--success)'}}>Online</div>
                            </div>
                            <div style={{width: '36px', height: '36px', background: 'var(--secondary)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'white'}}>
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="scroll-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;