import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import our global styles
import Dashboard from './pages/Dashboard';
import PnL from './pages/PnL';
import Ledger from './pages/Ledger';
import Trades from './pages/Trade';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* We will add PnL, Ledger, Trades later */}
        <Route path="/pnl" element={<PnL />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;