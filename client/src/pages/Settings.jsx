import { Navbar, Footer } from '../components/HeaderFooter';
import { useState } from 'react';

function Settings({ user, onLogout }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      <Navbar user={user} onLogout={onLogout} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-xl">
          <h2 className="text-sm font-semibold text-white mb-4">Profile & SMS Alerts</h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Account Email</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Phone Number (E.164 format e.g. +15550199283)</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="+15550199283"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded"
            >
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Settings;