import { useState } from 'react';
import { Home } from './components/Home';
import { Centers } from './components/Centers';
import { Appointments } from './components/Appointments';
import { Alerts } from './components/Alerts';
import { History } from './components/History';
import { Eligibility } from './components/Eligibility';
import { Profile } from './components/Profile';
import { Education } from './components/Education';
import { Rewards } from './components/Rewards';
import { About } from './components/About';
import { Feedback, FeedbackButton } from './components/Feedback';
import { Home as HomeIcon, MapPin, Calendar, AlertCircle, Clock, Info, User, BookOpen, Award, Menu, X, LogOut, MessageCircle } from 'lucide-react';

type PageName = 'home' | 'centers' | 'appointments' | 'alerts' | 'history' | 'eligibility' | 'profile' | 'education' | 'rewards' | 'about';

interface PageState {
  page: PageName;
  data?: any;
}

export default function UserApp({ onLogout, userEmail }: UserAppProps) {
  const [currentPage, setCurrentPage] = useState<PageState>({ page: 'home' });
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSetPage = (pageName: PageName, data?: any) => {
    setCurrentPage({ page: pageName, data });
  };

  const renderPage = () => {
    switch (currentPage.page) {
      case 'home':
        return <Home onNavigate={handleSetPage} />;
      case 'centers':
        return <Centers />;
      case 'appointments':
        return <Appointments prefillCenter={currentPage.data?.centerName} />;
      case 'alerts':
        return <Alerts onNavigate={handleSetPage} />;
      case 'history':
        return <History />;
      case 'eligibility':
        return <Eligibility />;
      case 'profile':
        return <Profile onLogout={onLogout} onNavigate={handleSetPage} />;
      case 'education':
        return <Education />;
      case 'rewards':
        return <Rewards />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={handleSetPage} />;
    }
  };

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: HomeIcon },
    { id: 'centers', label: 'Centres', icon: MapPin },
    { id: 'appointments', label: 'Rendez-vous', icon: Calendar },
    { id: 'alerts', label: 'Alertes', icon: AlertCircle, badge: true },
    { id: 'rewards', label: 'Récompenses', icon: Award },
    { id: 'history', label: 'Historique', icon: Clock },
    { id: 'education', label: 'Éducation', icon: BookOpen },
    { id: 'about', label: 'À propos', icon: Info },
  ];

  const handleLogoutClick = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      onLogout();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header avec Navigation */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menu Hamburger Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-white hover:bg-red-700 rounded-lg transition-all"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo Centré */}
            <div className="flex items-center gap-3 cursor-pointer absolute left-1/2 transform -translate-x-1/2" onClick={() => handleSetPage('home')}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-red-600 text-xl">🩸</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-white">Don de Sang Togo</h1>
                <p className="text-xs text-red-100">Sauvez des vies</p>
              </div>
            </div>

            {/* Profil Button */}
            <button
              onClick={() => handleSetPage('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition font-medium ${
                currentPage.page === 'profile'
                  ? 'bg-white text-red-600 shadow-md'
                  : 'bg-red-700 text-white hover:bg-red-800'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profil</span>
            </button>
          </div>

          {/* Menu Hamburger Dropdown */}
          {showMobileMenu && (
            <div className="border-t border-red-500 py-4 animate-in slide-in-from-top bg-red-600">
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleSetPage(item.id as PageName);
                        setShowMobileMenu(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition relative ${
                        currentPage.page === item.id
                          ? 'bg-white text-red-600 font-semibold shadow-md'
                          : 'text-white hover:bg-red-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      )}
                    </button>
                  );
                })}
                <div className="border-t border-red-500 mt-2 pt-2">
                  <button
                    onClick={() => {
                      handleSetPage('profile');
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition w-full ${
                      currentPage.page === 'profile'
                        ? 'bg-white text-red-600 font-semibold shadow-md'
                        : 'text-white hover:bg-red-700'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Mon Profil</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowFeedback(true);
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-red-700 rounded-lg transition w-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Feedback</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleLogoutClick();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-red-800 rounded-lg transition w-full border-t border-red-500 mt-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Se déconnecter</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-red-600">🩸</span>
              <span className="text-sm">© 2025 Don de Sang Togo - Tous droits réservés</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button onClick={() => handleSetPage('about')} className="hover:text-red-600 transition">
                À propos
              </button>
              <span>•</span>
              <button onClick={() => setShowFeedback(true)} className="hover:text-red-600 transition">
                Contact
              </button>
              <span>•</span>
              <button className="hover:text-red-600 transition">
                Confidentialité
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      {showFeedback && <Feedback onClose={() => setShowFeedback(false)} />}
    </div>
  );
}
