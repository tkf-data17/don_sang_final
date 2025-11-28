import { useState } from 'react';
import AuthApp from './AuthApp';
import App from './App';
import AdminApp from './AdminApp';

type AppMode = 'auth' | 'user' | 'admin';

export default function MainApp() {
  const [mode, setMode] = useState<AppMode>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate authentication
  const handleLogin = (userType: 'user' | 'admin') => {
    setIsAuthenticated(true);
    setMode(userType);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMode('auth');
  };

  // Mode selector for development (you can remove this in production)
  const ModeSelector = () => (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
      <p className="text-xs text-gray-600 mb-2">Mode de démonstration :</p>
      <div className="flex gap-2">
        <button
          onClick={() => setMode('auth')}
          className={`px-3 py-1 text-xs rounded ${
            mode === 'auth'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => handleLogin('user')}
          className={`px-3 py-1 text-xs rounded ${
            mode === 'user'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Donneur
        </button>
        <button
          onClick={() => handleLogin('admin')}
          className={`px-3 py-1 text-xs rounded ${
            mode === 'admin'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Admin
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ModeSelector />
      {mode === 'auth' && <AuthApp />}
      {mode === 'user' && <App />}
      {mode === 'admin' && <AdminApp />}
    </>
  );
}
