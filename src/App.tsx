import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import AuthApp from './AuthApp';
import UserApp from './UserApp';

type AppMode = 'landing' | 'auth' | 'user';
type AuthScreen = 'login' | 'register';

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [userEmail, setUserEmail] = useState('');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login'); // New state for AuthApp's internal mode

  const handleGetStarted = () => {
    setMode('auth');
    setAuthScreen('login'); // Reset to login when entering auth flow
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setMode('user');
  };

  const handleLogout = () => {
    setUserEmail('');
    setMode('landing');
    setAuthScreen('login'); // Reset auth screen on logout
  };

  return (
    <>
      {mode === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {mode === 'auth' && (
        <AuthApp
          onLogin={handleLogin}
          authScreen={authScreen}
          setAuthScreen={setAuthScreen}
        />
      )}
      {mode === 'user' && <UserApp onLogout={handleLogout} userEmail={userEmail} />}
    </>
  );
}
