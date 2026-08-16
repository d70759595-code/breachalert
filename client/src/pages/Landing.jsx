import { Navbar, Footer } from '../components/HeaderFooter';
import { Link } from 'react-router-dom';

function Landing({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between">
      <Navbar user={user} onLogout={onLogout} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
          BreachAlert
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8">
          Automated identity surveillance & dark web breach monitoring. Protect your email addresses and digital identities.
        </p>

        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg">
            Get Started
          </Link>
          <Link to="/pricing" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg">
            View Pricing
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;