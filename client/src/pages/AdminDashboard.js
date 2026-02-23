import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    // Initialize state from localStorage to persist theme across tab changes and reloads
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('adminTheme') === 'dark';
    });
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMarketOpen, setIsMarketOpen] = useState(true);

    // Update the body attribute and save to localStorage whenever darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('adminTheme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('adminTheme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const doughnutData = {
        labels: ['Client 1', 'Client 2', 'Client 3', 'Client 4'],
        datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 0
        }]
    };

    const mockUsers = [
        { id: 1, name: 'Rahul Sharma', clientId: 'XC-1029', mob: '+91 98765 43210', margin: 468450, status: 'Active' },
        { id: 2, name: 'Amit Kumar', clientId: 'XC-1030', mob: '+91 91234 56780', margin: 150000, status: 'Active' },
        { id: 3, name: 'Priya Singh', clientId: 'XC-1031', mob: '+91 99887 76655', margin: 89000, status: 'Inactive' },
    ];

    const mockMasterTrades = [
        { id: 'MT-101', date: '2025-10-25', script: 'NIFTY 22450 CE', type: 'BUY', qty: 1000, price: 120.50, status: 'Completed' },
        { id: 'MT-102', date: '2025-10-25', script: 'RELIANCE', type: 'SELL', qty: 500, price: 2450.00, status: 'Completed' },
        { id: 'MT-103', date: '2025-10-26', script: 'BANKNIFTY 48000 PE', type: 'BUY', qty: 1200, price: 340.20, status: 'Holding' },
    ];

    const mockAllocations = [
        { id: 'AL-001', masterId: 'MT-101', client: 'XC-1029', qty: 400, buyPrice: 120.50, sellPrice: 140.00, pnl: 7800 },
        { id: 'AL-002', masterId: 'MT-101', client: 'XC-1030', qty: 600, buyPrice: 120.50, sellPrice: 135.00, pnl: 8700 },
        { id: 'AL-003', masterId: 'MT-102', client: 'XC-1029', qty: 500, buyPrice: 2400.00, sellPrice: 2450.00, pnl: -25000 },
    ];

    const mockLedger = [
        { id: 'L-001', date: '2025-10-24', client: 'XC-1029', desc: 'Initial Margin', debit: 0, credit: 500000, balance: 500000 },
        { id: 'L-002', date: '2025-10-25', client: 'XC-1029', desc: 'Trade MT-101 Profit', debit: 0, credit: 7800, balance: 507800 },
        { id: 'L-003', date: '2025-10-25', client: 'XC-1030', desc: 'Initial Margin', debit: 0, credit: 150000, balance: 150000 },
    ];

    const thStyle = { padding: '12px', borderBottom: '2px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' };
    const tdStyle = { padding: '14px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' };

    const renderContent = () => {
        switch (activeTab) {
            case 'user_detail':
                return (
                    <div className="card">
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>User Details Directory</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Client ID</th>
                                        <th style={thStyle}>Name</th>
                                        <th style={thStyle}>Mobile</th>
                                        <th style={thStyle}>Available Margin</th>
                                        <th style={thStyle}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockUsers.map(u => (
                                        <tr key={u.id}>
                                            <td style={{ ...tdStyle, fontWeight: 'bold' }}>{u.clientId}</td>
                                            <td style={tdStyle}>{u.name}</td>
                                            <td style={tdStyle}>{u.mob}</td>
                                            <td style={{ ...tdStyle, fontFamily: 'monospace' }}>₹ {u.margin.toLocaleString()}</td>
                                            <td style={tdStyle}>
                                                <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', background: u.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: u.status === 'Active' ? 'var(--success)' : 'var(--danger)' }}>
                                                    {u.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'master_tbl':
                return (
                    <div className="card">
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Master Trade Book</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Trade ID</th>
                                        <th style={thStyle}>Date</th>
                                        <th style={thStyle}>Script</th>
                                        <th style={thStyle}>Type</th>
                                        <th style={thStyle}>Qty</th>
                                        <th style={thStyle}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockMasterTrades.map(t => (
                                        <tr key={t.id}>
                                            <td style={{ ...tdStyle, fontWeight: 'bold', color: 'var(--primary)' }}>{t.id}</td>
                                            <td style={tdStyle}>{t.date}</td>
                                            <td style={{ ...tdStyle, fontWeight: '600' }}>{t.script}</td>
                                            <td style={{ ...tdStyle, color: t.type === 'BUY' ? 'var(--success)' : 'var(--danger)' }}>{t.type}</td>
                                            <td style={tdStyle}>{t.qty}</td>
                                            <td style={{ ...tdStyle, fontFamily: 'monospace' }}>₹ {t.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'allocation_tbl':
                return (
                    <div className="card">
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Trade Allocations</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Alloc ID</th>
                                        <th style={thStyle}>Master ID</th>
                                        <th style={thStyle}>Client ID</th>
                                        <th style={thStyle}>Allocated Qty</th>
                                        <th style={thStyle}>Net P&L</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockAllocations.map(a => (
                                        <tr key={a.id}>
                                            <td style={tdStyle}>{a.id}</td>
                                            <td style={{ ...tdStyle, fontWeight: 'bold', color: 'var(--primary)' }}>{a.masterId}</td>
                                            <td style={{ ...tdStyle, fontWeight: 'bold' }}>{a.client}</td>
                                            <td style={tdStyle}>{a.qty}</td>
                                            <td style={{ ...tdStyle, fontWeight: 'bold', color: a.pnl >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                                                {a.pnl > 0 ? '+' : ''}{a.pnl.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'gl_ledger':
                return (
                    <div className="card">
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Global Ledger</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Date</th>
                                        <th style={thStyle}>Client ID</th>
                                        <th style={thStyle}>Description</th>
                                        <th style={thStyle}>Credit</th>
                                        <th style={thStyle}>Debit</th>
                                        <th style={thStyle}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockLedger.map(l => (
                                        <tr key={l.id}>
                                            <td style={tdStyle}>{l.date}</td>
                                            <td style={{ ...tdStyle, fontWeight: 'bold' }}>{l.client}</td>
                                            <td style={tdStyle}>{l.desc}</td>
                                            <td style={{ ...tdStyle, color: 'var(--success)', fontFamily: 'monospace' }}>{l.credit > 0 ? `₹ ${l.credit.toLocaleString()}` : '-'}</td>
                                            <td style={{ ...tdStyle, color: 'var(--danger)', fontFamily: 'monospace' }}>{l.debit > 0 ? `₹ ${l.debit.toLocaleString()}` : '-'}</td>
                                            <td style={{ ...tdStyle, fontWeight: 'bold', fontFamily: 'monospace' }}>₹ {l.balance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="admin-grid-container">
                        <div className="card admin-grid-span" style={{ minHeight: '180px', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-card)', borderLeft: '5px solid var(--primary)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-main)', textAlign: 'center' }}>MASTER TRADE OF CURRENT WEEK</h2>
                            <p className="text-muted" style={{ fontWeight: '500' }}>(API for NIFTY INDEX) Live</p>
                            <div style={{ marginTop: '15px', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                22,450.50 <span style={{ fontSize: '1.2rem', color: 'var(--success)', marginLeft: '10px' }}><i className="fas fa-arrow-up"></i> +120.40</span>
                            </div>
                        </div>
                        <div className="card" style={{ minHeight: '350px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Details & Data Flow</h3>
                            <div style={{ padding: '1rem', background: 'var(--bg-body)', borderRadius: '8px', border: '1px dashed var(--border)', flexGrow: 1, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                                <p className="text-muted">Select a client or trade from the master table to populate data flow details here...</p>
                            </div>
                        </div>
                        <div className="card" style={{ minHeight: '350px', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'flex-start' }}>Global By User</h3>
                            <div style={{ width: '100%', height: '100%', maxHeight: '250px', display: 'flex', justifyContent: 'center' }}>
                                <Doughnut options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} data={doughnutData} />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="app-container">
            <nav className="sidebar">
                <div className="logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'grid', placeItems: 'center', color: 'white', flexShrink: 0 }}>
                        <i className="fas fa-user-shield"></i>
                    </div>
                    Admin Panel
                </div>

                <div className="nav-group">
                    <div className={`nav-item ${activeTab === 'user_detail' ? 'active' : ''}`} onClick={() => setActiveTab('user_detail')} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-user-edit"></i> 1. USER DETAIL
                    </div>
                    <div className={`nav-item ${activeTab === 'master_tbl' ? 'active' : ''}`} onClick={() => setActiveTab('master_tbl')} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-table"></i> 2. MASTER TBL
                    </div>
                    <div className={`nav-item ${activeTab === 'allocation_tbl' ? 'active' : ''}`} onClick={() => setActiveTab('allocation_tbl')} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-tasks"></i> 3. ALLOCATION TBL
                    </div>
                    <div className={`nav-item ${activeTab === 'gl_ledger' ? 'active' : ''}`} onClick={() => setActiveTab('gl_ledger')} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-book"></i> 4. GL LEDGER
                    </div>
                    <div className="nav-item" onClick={handleLogout} style={{ marginTop: 'auto', color: 'var(--danger)', cursor: 'pointer' }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                </div>
            </nav>

            <main className="main-content">
                <header className="top-bar" style={{ paddingRight: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', margin: 0, cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>ADMIN DASHBOARD</h2>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button className="btn" style={{ padding: '8px' }} onClick={() => setDarkMode(!darkMode)}>
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ textAlign: 'right' }} className="d-none d-md-block">
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Developer</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Admin</div>
                                </div>
                                <div style={{ width: '36px', height: '36px', background: 'var(--primary)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'white' }}>
                                    AD
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                <div 
                                    onClick={() => setIsMarketOpen(true)}
                                    style={{ 
                                        padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', 
                                        background: isMarketOpen ? '#10b981' : 'transparent',
                                        color: isMarketOpen ? '#ffffff' : 'var(--text-muted)', 
                                        border: `1px solid ${isMarketOpen ? '#10b981' : 'var(--border)'}`, 
                                        borderRadius: '4px', cursor: 'pointer',
                                        boxShadow: isMarketOpen ? '0 0 10px rgba(16, 185, 129, 0.6)' : 'none',
                                        opacity: isMarketOpen ? 1 : 0.6,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    OPEN
                                </div>
                                <div 
                                    onClick={() => setIsMarketOpen(false)}
                                    style={{ 
                                        padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', 
                                        background: !isMarketOpen ? '#ef4444' : 'transparent',
                                        color: !isMarketOpen ? '#ffffff' : 'var(--text-muted)', 
                                        border: `1px solid ${!isMarketOpen ? '#ef4444' : 'var(--border)'}`, 
                                        borderRadius: '4px', cursor: 'pointer',
                                        boxShadow: !isMarketOpen ? '0 0 10px rgba(239, 68, 68, 0.6)' : 'none',
                                        opacity: !isMarketOpen ? 1 : 0.6,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    CLOSE
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="scroll-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;