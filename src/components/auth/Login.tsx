import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // Import Supabase client

interface LoginProps {
  onSwitchToRegister: () => void;
  onLogin: (email: string) => void;
}

export function Login({ onSwitchToRegister, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => { // Make handleSubmit async
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true); // Set loading to true
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false); // Set loading to false

    if (signInError) {
      console.error('Supabase sign-in error:', signInError);
      setError('Erreur de connexion: ' + signInError.message);
    } else {
      console.log('User signed in successfully');
      onLogin(email); // Call onLogin on successful sign-in
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
          <span className="text-4xl">❤️</span>
        </div>
        <h2 className="text-gray-900 mb-2">Bon retour !</h2>
        <p className="text-gray-600">Connectez-vous à votre compte donneur</p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.tg"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Se souvenir de moi</span>
            </label>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OU</span>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous n'avez pas encore de compte ?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-red-600 hover:underline font-semibold"
            >
              Inscrivez-vous
            </button>
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className="text-blue-900 mb-1">Pourquoi créer un compte ?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Prenez rendez-vous facilement</li>
              <li>• Suivez votre historique de dons</li>
              <li>• Recevez des alertes personnalisées</li>
              <li>• Contribuez à sauver des vies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
