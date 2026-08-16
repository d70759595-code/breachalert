import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Mail, 
  Server, 
  Settings, 
  LogOut, 
  Plus, 
  HeartPulse, 
  Zap, 
  HelpCircle, 
  CheckCircle2,
  Bell,
  Search,
  RefreshCw
} from 'lucide-react';
import { EmailList } from '../components/EmailList';
import { BreachTimeline } from '../components/BreachTimeline';
import { AddIdentityModal } from '../components/AddIdentityModal';
import { LogoutModal } from '../components/LogoutModal';
import { BreachDetailModal } from '../components/BreachDetailModal';
import { NotificationsDrawer } from '../components/NotificationsDrawer';
import { UpgradeModal } from '../components/UpgradeModal';
import { useToast } from '../components/Toast';

const API_BASE = 'http://localhost:3000';

interface DashboardProps {
  token: string | null;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Modal States
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedBreach, setSelectedBreach] = useState<any | null>(null);

  const loadDashboard = () => {
    if (!token) return;
    setLoading(true);
    setError('');

    fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load security dashboard telemetry.');
        return res.json();
      })
      .then((data) => {
        setDashboard(data);
      })
      .catch((err) => {
        console.error('Error loading dashboard:', err);
        setError('Unable to connect to the server. Please verify backend connection.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadDashboard();
  }, [token]);

  const handleScanNow = async (emailId: number) => {
    try {
      const res = await fetch(`${API_BASE}/emails/${emailId}/scan-now`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan request failed');

      showToast('Dark web recon scan queued successfully!', 'success');
      setTimeout(loadDashboard, 2000);
    } catch (err: any) {
      showToast(err.message || 'Scan failed. Please try again.', 'error');
    }
  };

  if (!token) return null;

  const emails = dashboard?.emails || [];
  const timeline = dashboard?.timeline || [];

  // Filtering based on search query
  const filteredEmails = emails.filter((e: any) =>
    e.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTimeline = timeline.filter((ev: any) =>
    ev.breach_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ev.data_classes || []).some((dc: string) => dc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const verifiedEmails = emails.filter((e: any) => e.verified);
  const verifiedCount = verifiedEmails.length;
  const breachedEmailIds = new Set(timeline.map((ev: any) => ev.monitored_email_id));
  const breachedCount = verifiedEmails.filter((e: any) => breachedEmailIds.has(e.id)).length;

  const healthScore = verifiedCount === 0
    ? 100
    : Math.round(((verifiedCount - breachedCount) / verifiedCount) * 100);
  const scoreClamped = Math.max(0, Math.min(100, healthScore));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (scoreClamped / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#070707] text-white flex selection:bg-[#FF6A2A] selection:text-black">
      
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#0B0B0B] border-r border-white/[0.08] flex-col p-6 min-h-screen text-left">
        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
          <div className="w-8 h-8 rounded-full bg-[#FF6A2A] flex items-center justify-center shadow-[0_0_15px_rgba(255,106,42,0.5)]">
            <Shield className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            BREACH<span className="text-[#FF6A2A]">ALERT</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#35D07F]/10 border border-[#35D07F]/20 text-[#35D07F] font-mono text-[10px] font-bold tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
          VIGILANCE ENGINE ACTIVE
        </div>

        <nav className="flex flex-col gap-1.5 text-xs font-medium">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30' : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'}`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'timeline' ? 'bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30' : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'}`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Breach Timeline</span>
          </button>

          <button 
            onClick={() => setActiveTab('identities')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'identities' ? 'bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30' : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'}`}
          >
            <Mail className="w-4 h-4" />
            <span>Monitored Identities</span>
          </button>

          <button 
            onClick={() => setActiveTab('threats')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeTab === 'threats' ? 'bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30' : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'}`}
          >
            <Server className="w-4 h-4" />
            <span>Threat Intelligence</span>
          </button>

          <Link 
            to="/settings"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/[0.06]">
          <button 
            onClick={() => setUpgradeModalOpen(true)}
            className="flex items-center gap-2 justify-center px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-bold text-xs shadow-[0_0_15px_rgba(255,106,42,0.3)] transition-all hover:brightness-110"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Upgrade Protection</span>
          </button>

          <Link 
            to="/support"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-400 hover:text-white text-xs transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </Link>

          <button 
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#FF3B30] hover:bg-[#FF3B30]/10 text-xs transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN COMMAND CENTER CONTENT */}
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-x-hidden text-left">
        
        {/* Top Command Bar Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Security Command Center</h1>
            <p className="text-xs text-[#929292] mt-1">Real-time digital identity status & dark web breach telemetry</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search identities or breaches..."
                className="w-full bg-[#141414] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            {/* Notification Bell Button */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="w-9 h-9 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors relative shrink-0"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#FF3B30] absolute top-1.5 right-1.5" />
            </button>

            <Link to="/settings" className="w-9 h-9 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors shrink-0">
              <Settings className="w-4 h-4" />
            </Link>

            <button 
              onClick={() => setLogoutModalOpen(true)}
              className="w-9 h-9 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="p-12 text-center rounded-3xl bg-[#141414] border border-white/[0.08] flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#FF6A2A] animate-spin" />
            <p className="text-xs font-mono text-neutral-400">Loading security telemetry data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-6 rounded-2xl bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={loadDashboard}
              className="px-4 py-1.5 rounded-full bg-[#FF3B30] text-white font-bold text-xs hover:bg-red-600 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Main Dashboard Workspace */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Health Gauge, Add Target & Priority Timeline */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Health Score Gauge Card */}
              <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 flex flex-col items-center shadow-2xl relative">
                <div className="w-full flex justify-between items-center mb-6">
                  <h3 className="font-mono text-xs text-[#FF6A2A] uppercase tracking-widest flex items-center gap-2 font-semibold">
                    <HeartPulse className="w-4 h-4 text-[#FF6A2A]" /> Identity Health Score
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                    LIVE DIAGNOSTIC
                  </span>
                </div>

                {/* Radial Gauge SVG */}
                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-neutral-800" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4" />
                    <circle
                      className="text-[#FF6A2A] transition-all duration-1000 ease-out"
                      cx="50" cy="50" fill="none" r="45"
                      stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white tracking-tight">{scoreClamped}</span>
                    <span className="font-mono text-[10px] text-[#FF6A2A] font-semibold tracking-widest mt-1">/ 100 INDEX</span>
                  </div>
                </div>

                <div className="bg-[#0B0B0B] rounded-2xl p-4 w-full border border-white/[0.06] text-center">
                  <p className="text-xs text-[#929292]">
                    {timeline.length === 0 ? (
                      <span className="text-[#35D07F] font-medium flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> No active leaks found on your target identities.
                      </span>
                    ) : (
                      <>Discovered <span className="text-[#FF3B30] font-bold">{timeline.length} breach incident{timeline.length !== 1 ? 's' : ''}</span> across your monitored targets.</>
                    )}
                  </p>
                </div>
              </section>

              {/* Add Target Email Action Card */}
              <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-6 shadow-2xl flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-xs text-neutral-200 uppercase tracking-widest font-semibold flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#FF6A2A]" /> Add Target Identity
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Monitor a new email address 24/7</p>
                </div>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-bold text-xs shadow-[0_0_15px_rgba(255,106,42,0.3)] hover:brightness-110 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Identity</span>
                </button>
              </section>

              {/* Priority Alerts / Breach Timeline */}
              <div onClick={(e: any) => {
                const target = e.target.closest('[data-breach-id]');
                if (target) {
                  const id = Number(target.getAttribute('data-breach-id'));
                  const ev = timeline.find((item: any) => item.id === id);
                  if (ev) setSelectedBreach(ev);
                }
              }}>
                <BreachTimeline events={filteredTimeline} />
              </div>

            </div>

            {/* Right Column: Monitored Identities List */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <EmailList emails={filteredEmails} verifiedCount={verifiedCount} onScanNow={handleScanNow} />
            </div>

          </div>
        )}

      </main>

      {/* Interactive Modals */}
      <AddIdentityModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        token={token}
        onSuccess={loadDashboard}
      />

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={onLogout}
      />

      <BreachDetailModal
        isOpen={!!selectedBreach}
        onClose={() => setSelectedBreach(null)}
        event={selectedBreach}
      />

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

    </div>
  );
};
