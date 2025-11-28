import React from 'react'; // Import React for React.Dispatch
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

type AuthScreen = 'login' | 'register';

interface AuthAppProps {
  onLogin: (email: string) => void;
  authScreen: AuthScreen;
  setAuthScreen: React.Dispatch<React.SetStateAction<AuthScreen>>;
}

export default function AuthApp({ onLogin, authScreen, setAuthScreen }: AuthAppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🩸</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Don de Sang Togo</h1>
                <p className="text-xs text-gray-600">Sauvez des vies, donnez du sang</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {authScreen === 'login' ? (
          <Login key="login" onSwitchToRegister={() => setAuthScreen('register')} onLogin={onLogin} />
        ) : (
          <Register key="register" onSwitchToLogin={() => setAuthScreen('login')} onRegister={onLogin} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Don de Sang Togo. Tous droits réservés.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-red-600 transition">Conditions d'utilisation</a>
              <span>•</span>
              <a href="#" className="hover:text-red-600 transition">Confidentialité</a>
              <span>•</span>
              <a href="#" className="hover:text-red-600 transition">Aide</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
