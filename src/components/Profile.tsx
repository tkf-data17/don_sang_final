import { useState } from 'react';
import { User, Mail, Phone, MapPin, Droplet, Calendar, Shield, Bell, LogOut, ChevronRight, Edit2, QrCode, Info, Award, Gift } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';

interface ProfileProps {
  onLogout?: () => void;
  onNavigate?: (page: 'about' | 'rewards') => void;
}

export function Profile({ onLogout, onNavigate }: ProfileProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    id: 'DNR-2024-00156',
    name: 'Koffi Mensah',
    email: 'koffi.mensah@example.tg',
    phone: '+228 90 12 34 56',
    bloodType: 'O+',
    dateOfBirth: '15/03/1995',
    city: 'Lomé',
    region: 'Maritime',
    totalDonations: 5,
    points: 450,
    nextDonation: '2025-12-29',
    memberSince: '2024-01-15'
  });

  // Form state pour édition
  const [editForm, setEditForm] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    city: userData.city,
    region: userData.region
  });

  const handleEditProfile = () => {
    setEditForm({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      city: userData.city,
      region: userData.region
    });
    setShowEditProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({
      ...userData,
      ...editForm
    });
    setShowEditProfile(false);
    alert('Profil mis à jour avec succès !');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Informations personnelles',
      description: 'Modifier mon profil',
      action: handleEditProfile
    },
    {
      icon: Droplet,
      label: 'Mon groupe sanguin',
      description: userData.bloodType,
      action: () => alert('Le groupe sanguin ne peut pas être modifié. Contactez un administrateur si nécessaire.')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: notificationsEnabled ? 'Activées' : 'Désactivées',
      hasToggle: true,
      toggleValue: notificationsEnabled,
      onToggle: setNotificationsEnabled
    },
    {
      icon: MapPin,
      label: 'Localisation',
      description: locationEnabled ? 'Activée' : 'Désactivée',
      hasToggle: true,
      toggleValue: locationEnabled,
      onToggle: setLocationEnabled
    },
    {
      icon: Shield,
      label: 'Confidentialité et sécurité',
      description: 'Gérer mes données',
      action: () => alert('Fonctionnalité à venir')
    },
    {
      icon: Info,
      label: 'À propos',
      description: 'Version, contacts et partenaires',
      action: () => onNavigate?.('about')
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* QR Code Card Banner */}
      <button
        onClick={() => setShowQRCode(true)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg mb-1">Ma Carte Donneur</h3>
              <p className="text-sm opacity-90">Scannez pour valider vos dons</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </button>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2>{userData.name}</h2>
              <p className="text-sm opacity-90">{userData.city}, {userData.region}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
                  Groupe {userData.bloodType}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleEditProfile}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.totalDonations}</p>
            <p className="text-xs opacity-90 mt-1">Dons</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.totalDonations * 3}</p>
            <p className="text-xs opacity-90 mt-1">Vies sauvées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {Math.floor((new Date().getTime() - new Date(userData.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 30))}
            </p>
            <p className="text-xs opacity-90 mt-1">Mois</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">Coordonnées</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="text-gray-900">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date de naissance</p>
              <p className="text-gray-900">
                {new Date(userData.dateOfBirth).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Points & Rewards Summary */}
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg mb-1">Mes Points</h3>
            <p className="text-sm opacity-90">Échangez contre des récompenses</p>
          </div>
          <Award className="w-8 h-8" />
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Points disponibles</span>
            <span className="text-xs px-2 py-1 bg-white/20 rounded-full">Niveau Bronze</span>
          </div>
          <div className="text-3xl font-bold">{userData.points} pts</div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('rewards')}
          className="w-full bg-white text-orange-600 py-3 rounded-xl hover:bg-orange-50 transition flex items-center justify-center gap-2"
        >
          <Gift className="w-5 h-5" />
          Voir mes récompenses
        </button>
      </div>

      {/* Next Donation Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-900">Prochain don possible</h3>
            <p className="text-sm text-blue-700">
              {new Date(userData.nextDonation).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <h3 className="text-gray-900 px-4 pt-4 pb-3">Paramètres</h3>
        <div className="divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              {item.hasToggle ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onToggle?.(!item.toggleValue);
                  }}
                  className={`relative w-14 h-7 rounded-full transition cursor-pointer ${
                    item.toggleValue ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition transform ${
                      item.toggleValue ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">À propos</h3>
        <div className="space-y-2">
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Conditions d'utilisation
          </button>
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Politique de confidentialité
          </button>
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Aide et support
          </button>
          <div className="pt-2">
            <p className="text-sm text-gray-600">Version 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="w-full bg-red-50 border border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Se déconnecter
      </button>

      {/* Footer Info */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Membre depuis {new Date(userData.memberSince).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Don de Sang Togo • Sauvez des vies
        </p>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <QRCodeGenerator
          donor={{
            id: userData.id,
            name: userData.name,
            bloodType: userData.bloodType,
            phone: userData.phone,
            dateOfBirth: userData.dateOfBirth,
            totalDonations: userData.totalDonations,
            points: userData.points
          }}
          onClose={() => setShowQRCode(false)}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl sticky top-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl">Modifier mon profil</h2>
                  <p className="text-red-100 text-sm mt-1">Mettez à jour vos informations</p>
                </div>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Ville <span className="text-red-500">*</span>
                </label>
                <select
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Lomé">Lomé</option>
                  <option value="Kara">Kara</option>
                  <option value="Sokodé">Sokodé</option>
                  <option value="Atakpamé">Atakpamé</option>
                  <option value="Kpalimé">Kpalimé</option>
                  <option value="Dapaong">Dapaong</option>
                  <option value="Tsévié">Tsévié</option>
                  <option value="Aného">Aného</option>
                  <option value="Bassar">Bassar</option>
                  <option value="Niamtougou">Niamtougou</option>
                </select>
              </div>

              {/* Région */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Région <span className="text-red-500">*</span>
                </label>
                <select
                  value={editForm.region}
                  onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Maritime">Maritime</option>
                  <option value="Plateaux">Plateaux</option>
                  <option value="Centrale">Centrale</option>
                  <option value="Kara">Kara</option>
                  <option value="Savanes">Savanes</option>
                </select>
              </div>

              {/* Info non modifiable */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Informations non modifiables :</strong>
                </p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>• Groupe sanguin : <strong>{userData.bloodType}</strong></p>
                  <p>• Date de naissance : <strong>{userData.dateOfBirth}</strong></p>
                  <p>• ID donneur : <strong>{userData.id}</strong></p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Pour modifier ces informations, contactez un administrateur
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
