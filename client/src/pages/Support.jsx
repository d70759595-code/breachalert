import { Navbar, Footer } from '../components/HeaderFooter';

function Support({ user }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 text-center w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Support & Help Center</h1>
        <p className="text-gray-400 mb-8">Frequently asked questions and security support.</p>

        <div className="space-y-4 text-left max-w-2xl mx-auto">
          <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <h3 className="font-semibold text-white text-sm mb-1">How often are email addresses scanned?</h3>
            <p className="text-xs text-gray-400">Manual scans can be triggered anytime. Family plan users receive automated daily sweeps.</p>
          </div>

          <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <h3 className="font-semibold text-white text-sm mb-1">What should I do if a breach is detected?</h3>
            <p className="text-xs text-gray-400">Immediately change your password on the affected service and enable multi-factor authentication (MFA).</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Support;
