import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/outbound', label: 'Outbound Links' },
  { to: '/form', label: 'Form' },
  { to: '/video', label: 'Video' },
  { to: '/download', label: 'Download' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display text-xl font-semibold text-stone-900 tracking-tight">
          Demo<span className="text-stone-400">Site</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-stone-900 bg-stone-100'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* User info + logout */}
          {user && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-stone-200">
              <span className="text-xs text-stone-400 font-mono">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 hover:border-stone-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium border-b border-stone-100 ${
                  isActive ? 'text-stone-900 bg-stone-100' : 'text-stone-600 hover:text-stone-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <div className="px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 border border-stone-200 px-3 py-1.5 hover:border-stone-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
