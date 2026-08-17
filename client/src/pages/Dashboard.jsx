import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmailList from '../EmailList';
import BreachTimeline from '../BreachTimeline';

const API_BASE = 'http://localhost:3000';

function Dashboard({ token, onLogout }) {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [addStatus, setAddStatus] = useState('');

  function loadDashboard() {
    fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setDashboard);
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadDashboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddEmail(e) {
    e.preventDefault();
    setAddStatus('');
    try {
      const res = await fetch(`${API_BASE}/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: newEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not add email');
      setAddStatus('Verification link sent — check the server console (stub mailer).');
      setNewEmail('');
      loadDashboard();
    } catch (err) {
      setAddStatus(err.message);
    }
  }

  async function handleScanNow(emailId) {
    try {
      const res = await fetch(`${API_BASE}/emails/${emailId}/scan-now`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Scan request failed');
      setTimeout(loadDashboard, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  if (!token) return null;

  const emails = dashboard?.emails || [];
  const timeline = dashboard?.timeline || [];
  const verifiedEmails = emails.filter(e => e.verified);
  const verifiedCount = verifiedEmails.length;
  const breachedEmailIds = new Set(timeline.map(ev => ev.monitored_email_id));
  const breachedCount = verifiedEmails.filter(e => breachedEmailIds.has(e.id)).length;
  const healthScore = verifiedCount === 0
    ? 100
    : Math.round(((verifiedCount - breachedCount) / verifiedCount) * 100);
  const scoreClamped = Math.max(0, Math.min(100, healthScore));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (scoreClamped / 100) * circumference;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.05),_transparent_60%)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
        <div>
          <Link to="/" className="font-display text-xl font-bold text-on-surface flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">shield_person</span>
            BreachAlert
          </Link>
          <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-2 font-bold tracking-tight">Command Center</h2>
          <p className="font-body text-sm text-on-surface-variant/80">Real-time threat monitoring and identity status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/settings" className="flex items-center gap-2 bg-surface-container/50 border border-white/5 px-3 py-1.5 rounded-full text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">settings</span>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-surface-container/50 border border-white/5 px-3 py-1.5 rounded-full text-on-surface-variant hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
          </button>
          <div className="flex items-center gap-2 bg-surface-container/50 border border-white/5 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Vigilance Active</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
          <section className="glass-panel rounded-2xl p-8 flex flex-col items-center border border-white/5">
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">health_and_safety</span> Overall Health
              </h3>
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-variant/50" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4" />
                <circle
                  className="text-primary transition-all duration-1000 ease-out"
                  cx="50" cy="50" fill="none" r="45"
                  stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl text-on-surface font-bold tracking-tighter">{scoreClamped}</span>
                <span className="font-mono text-[10px] text-primary/70 tracking-widest mt-1">/ 100</span>
              </div>
            </div>
            <div className="bg-surface-container-high/50 rounded-xl p-4 w-full border border-white/5">
              <p className="font-body text-sm text-on-surface-variant text-center">
                {timeline.length === 0
                  ? 'No breaches detected across your monitored identities.'
                  : <>Found <span className="text-error font-medium">{timeline.length} breach{timeline.length !== 1 ? 'es' : ''}</span> across your monitored identities.</>}
              </p>
            </div>
          </section>

          <section className="glass-panel rounded-2xl p-6 border border-white/5">
            <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-sm">add_moderator</span> Add Target
            </h3>
            <form onSubmit={handleAddEmail} className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="new-email@example.com"
                className="flex-1 bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60"
              />
              <button type="submit" className="bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </form>
            {addStatus && <p className="font-mono text-xs text-on-surface-variant/80 mt-3">{addStatus}</p>}
          </section>

          <BreachTimeline events={timeline} />
        </div>

        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          <EmailList emails={emails} verifiedCount={verifiedCount} onScanNow={handleScanNow} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;