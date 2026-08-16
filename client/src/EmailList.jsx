import { useState } from 'react';

function EmailList({ emails, verifiedCount, onScanNow }) {
  const [scanningIds, setScanningIds] = useState({});

  async function handleScan(id) {
    setScanningIds(prev => ({ ...prev, [id]: true }));
    await onScanNow(id);
    setTimeout(() => {
      setScanningIds(prev => ({ ...prev, [id]: false }));
    }, 1500);
  }

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-sm font-semibold text-white mb-1">Monitored Identities</h2>
      <p className="text-xs text-gray-400 mb-4">{verifiedCount} of {emails.length} verified</p>

      {emails.length === 0 ? (
        <p className="text-xs text-gray-500 py-6 text-center">No emails added yet.</p>
      ) : (
        <div className="space-y-3">
          {emails.map(e => (
            <div key={e.id} className="p-3 bg-gray-950 border border-gray-800 rounded flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{e.email}</p>
                <p className="text-xs text-gray-400">
                  {e.verified ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
              {e.verified && (
                <button
                  onClick={() => handleScan(e.id)}
                  disabled={scanningIds[e.id]}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 rounded disabled:opacity-50"
                >
                  {scanningIds[e.id] ? 'Scanning...' : 'Scan Now'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EmailList;