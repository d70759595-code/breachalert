import { Navbar, Footer } from '../components/HeaderFooter';
import { fetchWithAuth } from '../api';
import { useState } from 'react';

function Pricing({ user }) {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth('/billing/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Pricing Plans</h1>
        <p className="text-gray-400 mb-10">Select the surveillance plan that fits your security needs.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Free Tier</h2>
              <p className="text-2xl font-bold text-white mb-4">$0 / mo</p>
              <ul className="text-sm text-gray-400 space-y-2 mb-6">
                <li>• 1 Monitored Email</li>
                <li>• Manual Threat Scans</li>
              </ul>
            </div>
            <button className="w-full py-2 bg-gray-800 text-gray-400 text-sm font-medium rounded cursor-default">
              Current Plan
            </button>
          </div>

          <div className="bg-gray-900 border border-indigo-500/50 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-indigo-400 mb-2">Family Plan</h2>
              <p className="text-2xl font-bold text-white mb-4">$10 / mo</p>
              <ul className="text-sm text-gray-400 space-y-2 mb-6">
                <li>• Up to 5 Monitored Emails</li>
                <li>• Automated Daily Dark Web Scans</li>
                <li>• Instant SMS Alert Dispatches</li>
              </ul>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded transition"
            >
              {loading ? 'Processing...' : 'Upgrade to Family'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;