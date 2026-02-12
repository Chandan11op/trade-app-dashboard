import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Trades = () => {
    const [trades, setTrades] = useState([]);
    const [filteredTrades, setFilteredTrades] = useState([]);
    
    // Filters State
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [startDate, setStartDate] = useState('2025-10-01'); // Default start matching your data
    const [endDate, setEndDate] = useState('2025-12-31');

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/trades');
                setTrades(data);
                setFilteredTrades(data);
            } catch (error) {
                console.error("Error fetching trades:", error);
            }
        };
        fetchTrades();
    }, []);

    // Filter Logic
    const handleFilter = () => {
        let temp = trades;

        // 1. Search Filter (Script Name)
        if (search) {
            temp = temp.filter(t => t.script.toLowerCase().includes(search.toLowerCase()));
        }

        // 2. Type Filter (BUY/SELL)
        if (typeFilter !== 'ALL') {
            temp = temp.filter(t => t.type === typeFilter);
        }

        // 3. Date Filter
        if (startDate) {
            temp = temp.filter(t => new Date(t.date) >= new Date(startDate));
        }
        if (endDate) {
            temp = temp.filter(t => new Date(t.date) <= new Date(endDate));
        }

        setFilteredTrades(temp);
    };

    const exportToExcel = () => {
        alert("Exporting to Excel... (Feature coming soon)");
    };

    return (
        <Layout title="Trade History">
            <div className="card">
                {/* Filter Bar */}
                <div style={{
                    display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', 
                    background: 'var(--bg-body)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border)'
                }}>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} 
                        style={{padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none'}} />
                    
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} 
                        style={{padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none'}} />

                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                        style={{padding: '9px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none'}}>
                        <option value="ALL">All Types</option>
                        <option value="BUY">Buy</option>
                        <option value="SELL">Sell</option>
                    </select>

                    <input type="text" placeholder="Search Script..." value={search} onChange={(e) => setSearch(e.target.value)}
                        style={{flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none', minWidth: '150px'}} />

                    <button className="btn btn-primary" onClick={handleFilter}>
                        <i className="fas fa-search"></i> Filter
                    </button>
                    <button className="btn" onClick={exportToExcel}>
                        <i className="fas fa-file-excel"></i> Excel
                    </button>
                </div>

                {/* Table */}
                <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: '0'}}>
                        <thead>
                            <tr style={{textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase'}}>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Date</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Script</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Type</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Qty</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Price</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Total</th>
                                <th style={{padding: '12px', borderBottom: '2px solid var(--border)'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrades.map(t => (
                                <tr key={t._id}>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)'}}>{new Date(t.date).toLocaleDateString()}</td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)', fontWeight: '600'}}>{t.script}</td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)'}}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600',
                                            background: t.type === 'BUY' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: t.type === 'BUY' ? 'var(--success)' : 'var(--danger)'
                                        }}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)'}}>{t.qty}</td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)'}}>{t.price}</td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace', fontWeight:'600'}}>
                                        ₹ {t.total.toLocaleString()}
                                    </td>
                                    <td style={{padding: '14px 12px', borderBottom: '1px solid var(--border)', fontSize:'0.85rem'}}>{t.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Trades;