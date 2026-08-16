import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmailList from '../EmailList';
import BreachTimeline from '../BreachTimeline';
import { fetchWithAuth } from '../api';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [addStatus, setAddStatus] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const res = await fetchWithAuth('/dashboard');
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadDashboard();
  }, [user]);

  async function handleAddEmail(e) {
    e.preventDefault();
    setAddStatus('');
    try {
      const res = await fetchWithAuth('/emails', {
        method: 'POST',
        body: JSON.stringify({ email: newEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Could not add email');
      setAddStatus(data.message || 'Verification link sent to target email.');
      setNewEmail('');
      loadDashboard();
    } catch (err) {
      setAddStatus(err.message);
    }
  }

  async function handleScanNow(emailId) {
    try {
      const res = await fetchWithAuth(`/emails/${emailId}/scan-now`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Scan request failed');
      setTimeout(loadDashboard, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user && !loading) return null;

  const emails = dashboard?.emails || [];
  const timeline = dashboard?.timeline || [];
  const stats = dashboard?.stats || {};
  const verifiedEmails = emails.filter(e => e.verified);
  const verifiedCount = verifiedEmails.length;
  const healthScore = stats.healthScore ?? 100;
  const scoreClamped = Math.max(0, Math.min(100, healthScore));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (scoreClamped / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex flex-col">
      
      {/* COMMAND CENTER TOP NAVBAR */}
      <header className="border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-xl px-4 sm:px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#FF6A2A] flex items-center justify-center shadow-lg shadow-[#FF6A2A]/30">
                <span className="material-symbols-outlined text-black font-bold text-lg">shield</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight font-display">BreachAlert</span>
            </Link>
            <span className="text-xs text-[#626262] font-mono hidden sm:inline">/ Command Center</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#121212] border border-white/[0.08] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#45D483] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Automated Monitoring Active</span>
            </div>

            <Link 
              to="/settings" 
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              title="Settings"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
            </Link>

            <button
              onClick={onLogout}
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.1] hover:border-red-500/30 flex items-center justify-center text-neutral-300 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* DASHBOARD MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8">
        
        {/* Title Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Security Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#969696] mt-1">
            Real-time visibility into your digital identity & automated breach surveillance status.
          </p>
        </div>

        {/* TOP METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121212] border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#626262]">Security Index</span>
              <span className="material-symbols-outlined text-[#FF6A2A] text-lg">health_and_safety</span>
            </div>
            <div className="text-3xl font-bold text-[#45D483] font-display">{scoreClamped}%</div>
            <p className="text-[11px] text-[#969696] mt-1">Overall identity health score</p>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#626262]">Monitored Emails</span>
              <span className="material-symbols-outlined text-[#FF6A2A] text-lg">mail</span>
            </div>
            <div className="text-3xl font-bold text-white font-display">{emails.length}</div>
            <p className="text-[11px] text-[#969696] mt-1">{verifiedCount} verified identities</p>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#626262]">Breaches Detected</span>
              <span className="material-symbols-outlined text-red-400 text-lg">warning</span>
            </div>
            <div className="text-3xl font-bold text-red-400 font-display">{timeline.length}</div>
            <p className="text-[11px] text-[#969696] mt-1">Across monitored identities</p>
          </div>

          <div className="bg-[#121212] border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#626262]">Surveillance Engine</span>
              <span className="material-symbols-outlined text-emerald-400 text-lg animate-pulse">radar</span>
            </div>
            <div className="text-3xl font-bold text-white font-display">Active</div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">Scheduled & on-demand</p>
          </div>
        </div>

        {/* MAIN DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Health Score Ring */}
            <section className="bg-[#121212] rounded-3xl p-6 border border-white/[0.08] flex flex-col items-center backdrop-blur-xl relative overflow-hidden">
              <div className="w-full flex justify-between items-center mb-4">
                <h3 className="font-mono text-xs text-[#FF6A2A] uppercase tracking-widest flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-sm">health_and_safety</span> Security Index
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {stats.highestRiskLevel || 'EXCELLENT'}
                </span>
              </div>

              <div className="relative w-44 h-44 flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-neutral-800" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="6" />
                  <circle
                    className="text-[#FF6A2A] transition-all duration-1000 ease-out"
                    cx="50" cy="50" fill="none" r="45"
                    stroke="currentColor" strokeWidth="7" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl text-white font-bold tracking-tight">{scoreClamped}</span>
                  <span className="font-mono text-[10px] text-[#FF6A2A] tracking-widest uppercase">/ 100 Index</span>
                </div>
              </div>

              <div className="bg-[#0D0D0D] rounded-2xl p-3.5 w-full border border-white/[0.06] text-center mt-2">
                <p className="text-xs text-[#969696]">
                  {timeline.length === 0
                    ? 'No breaches detected across your monitored identities.'
                    : <>Found <span className="text-red-400 font-semibold">{timeline.length} breach{timeline.length !== 1 ? 'es' : ''}</span> requiring action.</>}
                </p>
              </div>
            </section>

            {/* Add Target Email Form */}
            <section className="bg-[#121212] rounded-3xl p-6 border border-white/[0.08] backdrop-blur-xl">
              <h3 className="font-mono text-xs text-[#FF6A2A] uppercase tracking-widest flex items-center gap-2 mb-3 font-semibold">
                <span className="material-symbols-outlined text-sm">add_moderator</span> Add Monitored Target
              </h3>
              
              <form onSubmit={handleAddEmail} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="target-email@example.com"
                  className="flex-1 bg-[#181818] border border-white/[0.1] rounded-xl px-3.5 py-2.5 font-mono text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
                />
                <button 
                  type="submit" 
                  className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add</span>
                </button>
              </form>

              {addStatus && (
                <p className="font-mono text-[11px] text-[#FF6A2A] bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 p-2.5 rounded-xl mt-3">
                  {addStatus}
                </p>
              )}
            </section>

            <BreachTimeline events={timeline} />

          </div>

          <div className="lg:col-span-7 flex flex-col">
            <EmailList emails={emails} verifiedCount={verifiedCount} onScanNow={handleScanNow} />
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;