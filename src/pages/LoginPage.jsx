import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in — redirect away
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    // Simulate slight delay for realism
    await new Promise((r) => setTimeout(r, 500));
    const result = login(form.username, form.password);
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <p className="font-display text-3xl font-semibold text-stone-900 tracking-tight">
            Demo<span className="text-stone-400">Site</span>
          </p>
          <p className="text-sm text-stone-400 mt-2 font-mono tracking-wide">Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 p-8">

          {/* Hint box */}
          <div className="bg-stone-50 border border-stone-200 px-4 py-3 mb-6">
            <p className="text-xs text-stone-500 font-mono leading-relaxed">
              <span className="text-stone-700 font-semibold">Demo credentials</span><br />
              admin / admin123<br />
              demo / demo2024
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                autoFocus
                placeholder="admin"
                value={form.username}
                onChange={handleChange}
                className={`w-full border px-4 py-3 text-sm bg-white placeholder-stone-300 outline-none transition-colors ${
                  error ? 'border-red-400' : 'border-stone-200 focus:border-stone-900'
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 pr-12 text-sm bg-white placeholder-stone-300 outline-none transition-colors ${
                    error ? 'border-red-400' : 'border-stone-200 focus:border-stone-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors text-xs font-mono"
                >
                  {showPassword ? 'hide' : 'show'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <span>✕</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6 font-mono">
          Analytics Demo · React + Vite
        </p>
      </div>
    </div>
  );
}
