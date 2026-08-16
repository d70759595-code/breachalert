import { Link } from 'react-router-dom';

export function Navbar({ user, onLogout }) {
  return (
    <header className="border-b border-gray-800 bg-gray-950 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-white tracking-tight">
        BreachAlert
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-white text-gray-400">Home</Link>
        <Link to="/pricing" className="hover:text-white text-gray-400">Pricing</Link>
        <Link to="/support" className="hover:text-white text-gray-400">Support</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-white text-gray-400">Dashboard</Link>
            <Link to="/settings" className="hover:text-white text-gray-400">Settings</Link>
            <button onClick={onLogout} className="text-red-400 hover:text-red-300">Logout</button>
          </>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8 text-center text-xs text-gray-500">
      <p>© {new Date().getFullYear()} BreachAlert. All rights reserved.</p>
    </footer>
  );
}
