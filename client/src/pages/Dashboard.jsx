import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailList from '../EmailList';
import BreachTimeline from '../BreachTimeline';
import { fetchWithAuth } from '../api';
import { Navbar, Footer } from '../components/HeaderFooter';

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

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      <Navbar user={user} onLogout={onLogout} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Manage monitored email addresses and view breach alerts.</p>
        </div>

        {/* Add Email */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-white mb-3">Add Monitored Email</h2>
          <form onSubmit={handleAddEmail} className="flex gap-3">
            <input
              type="email"
              required
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="user@example.com"
              className="flex-1 bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded"
            >
              Add Target
            </button>
          </form>
          {addStatus && (
            <p className="text-xs text-indigo-400 mt-2">{addStatus}</p>
          )}
        </section>

        {/* Monitored List & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EmailList emails={emails} verifiedCount={verifiedCount} onScanNow={handleScanNow} />
          <BreachTimeline events={timeline} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;