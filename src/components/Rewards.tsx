import { useState } from 'react';
import { Gift, Coffee, Dumbbell, ShoppingBag, Utensils, Fuel, Award, ChevronRight, Star, Zap, Heart, QrCode, X, CheckCircle, Users } from 'lucide-react';
import { RewardQRCode } from './RewardQRCode';
import { ReferralSystem } from './ReferralSystem';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'food' | 'fitness' | 'shopping' | 'health' | 'fuel' | 'premium';
  icon: any;
  partner: string;
  available: number;
  image?: string;
  terms?: string;
}

export function Rewards() {
  const [activeTab, setActiveTab] = useState<'rewards' | 'referral'>('rewards');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);

  // Points de l'utilisateur
  const userPoints = 450;
  const userLevel = 'Bronze';

  const categories = [
    { id: 'all', label: 'Tout', icon: Gift },
    { id: 'food', label: 'Cafés & Resto', icon: Coffee },
    { id: 'fitness', label: 'Sport', icon: Dumbbell },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'health', label: 'Santé', icon: Heart },
    { id: 'fuel', label: 'Carburant', icon: Fuel },
  ];

  const rewards: Reward[] = [
    // Food & Beverages
    {
      id: 'coffee-1',
      title: 'Café gratuit',
      description: 'Un café ou thé au centre de collecte',
      points: 50,
      category: 'food',
      icon: Coffee,
      partner: 'Centres de Don',
      available: 999,
      terms: 'Valable après chaque don de sang'
    },
    {
      id: 'coffee-2',
      title: '3 Cafés gratuits',
      description: 'Pack de 3 cafés ou thés au centre',
      points: 120,
      category: 'food',
      icon: Coffee,
      partner: 'Centres de Don',
      available: 250,
      terms: 'Valable 30 jours'
    },
    {
      id: 'meal-1',
      title: 'Menu sandwich',
      description: 'Sandwich + boisson au snack du centre',
      points: 150,
      category: 'food',
      icon: Utensils,
      partner: 'Snack Centres',
      available: 180,
      terms: 'Valable dans les centres partenaires'
    },
    {
      id: 'restaurant-1',
      title: 'Bon repas 5000 CFA',
      description: 'Bon d\'achat dans les restaurants partenaires',
      points: 300,
      category: 'food',
      icon: Utensils,
      partner: 'Restaurants Partenaires',
      available: 50,
      terms: 'Liste des restaurants disponible'
    },

    // Fitness
    {
      id: 'gym-1',
      title: '2 heures salle de gym',
      description: 'Accès gratuit pendant 2 heures',
      points: 200,
      category: 'fitness',
      icon: Dumbbell,
      partner: 'Fitness Zone Lomé',
      available: 100,
      terms: 'Réservation obligatoire'
    },
    {
      id: 'gym-2',
      title: '1 semaine de gym',
      description: 'Abonnement d\'une semaine complet',
      points: 400,
      category: 'fitness',
      icon: Dumbbell,
      partner: 'Fitness Zone & Partenaires',
      available: 45,
      terms: 'Tous les équipements inclus'
    },
    {
      id: 'gym-3',
      title: '1 mois de gym',
      description: 'Abonnement mensuel complet',
      points: 1200,
      category: 'fitness',
      icon: Dumbbell,
      partner: 'Fitness Zone Premium',
      available: 20,
      terms: 'Accès illimité + coaching'
    },
    {
      id: 'yoga-1',
      title: '3 séances de yoga',
      description: 'Pack de 3 cours de yoga ou pilates',
      points: 350,
      category: 'fitness',
      icon: Heart,
      partner: 'Zen Studio',
      available: 30,
      terms: 'Valable 1 mois'
    },

    // Shopping
    {
      id: 'shop-1',
      title: 'Bon d\'achat 2000 CFA',
      description: 'À utiliser dans les magasins partenaires',
      points: 250,
      category: 'shopping',
      icon: ShoppingBag,
      partner: 'Magasins Partenaires',
      available: 80,
      terms: 'Non cumulable'
    },
    {
      id: 'shop-2',
      title: 'Bon d\'achat 5000 CFA',
      description: 'Shopping dans les boutiques partenaires',
      points: 600,
      category: 'shopping',
      icon: ShoppingBag,
      partner: 'Boutiques Premium',
      available: 40,
      terms: 'Valable 60 jours'
    },
    {
      id: 'shop-3',
      title: 'Bon d\'achat 10000 CFA',
      description: 'Grand shopping partenaires premium',
      points: 1100,
      category: 'shopping',
      icon: ShoppingBag,
      partner: 'Shopping Centers',
      available: 25,
      terms: 'Valable dans tous les centres'
    },

    // Health
    {
      id: 'health-1',
      title: 'Consultation médicale',
      description: 'Consultation gratuite + bilan de santé',
      points: 400,
      category: 'health',
      icon: Heart,
      partner: 'Cliniques Partenaires',
      available: 60,
      terms: 'Sur rendez-vous'
    },
    {
      id: 'health-2',
      title: 'Bilan sanguin complet',
      description: 'Analyse sanguine complète gratuite',
      points: 500,
      category: 'health',
      icon: Heart,
      partner: 'Laboratoires Médicaux',
      available: 35,
      terms: 'Rendez-vous obligatoire'
    },
    {
      id: 'health-3',
      title: 'Kit premiers secours',
      description: 'Kit complet de premiers secours',
      points: 300,
      category: 'health',
      icon: Heart,
      partner: 'Pharmacies Partenaires',
      available: 50,
      terms: 'Retrait en pharmacie'
    },

    // Fuel
    {
      id: 'fuel-1',
      title: 'Carburant 2000 CFA',
      description: 'Bon essence ou diesel',
      points: 250,
      category: 'fuel',
      icon: Fuel,
      partner: 'Stations Total & Shell',
      available: 150,
      terms: 'Valable 30 jours'
    },
    {
      id: 'fuel-2',
      title: 'Carburant 5000 CFA',
      description: 'Bon essence ou diesel',
      points: 600,
      category: 'fuel',
      icon: Fuel,
      partner: 'Stations Total & Shell',
      available: 70,
      terms: 'Valable 30 jours'
    },
    {
      id: 'fuel-3',
      title: 'Carburant 10000 CFA',
      description: 'Bon essence ou diesel premium',
      points: 1100,
      category: 'fuel',
      icon: Fuel,
      partner: 'Toutes Stations',
      available: 40,
      terms: 'Valable 60 jours'
    },
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setRedeemedReward(selectedReward);
      setShowRedeemModal(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">Mes Récompenses</h1>
            <p className="text-white/90 text-sm">Échangez vos points contre des cadeaux</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8" />
          </div>
        </div>

        {/* Points Balance */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Mes points disponibles</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-xs opacity-90">Niveau {userLevel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{userPoints}</div>
            <Zap className="w-6 h-6 fill-yellow-300 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-xl p-2">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
            activeTab === 'rewards' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Gift className="w-5 h-5" />
          Récompenses
        </button>
        <button
          onClick={() => setActiveTab('referral')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition ${
            activeTab === 'referral' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Users className="w-5 h-5" />
          Parrainage
        </button>
      </div>

      {/* Content based on tab */}
      {activeTab === 'referral' ? (
        <ReferralSystem />
      ) : (
        <>
      {/* Original Rewards Content */}

      {/* Categories */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-red-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-3">
        {filteredRewards.map((reward) => {
          const Icon = reward.icon;
          const canAfford = userPoints >= reward.points;
          const pointsNeeded = reward.points - userPoints;

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-xl border-2 transition ${
                canAfford
                  ? 'border-green-200 hover:border-green-400 hover:shadow-lg'
                  : 'border-gray-200 opacity-75'
              }`}
            >
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    canAfford ? 'bg-gradient-to-br from-red-100 to-orange-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-7 h-7 ${canAfford ? 'text-red-600' : 'text-gray-400'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{reward.title}</h3>
                      {!canAfford && (
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">
                          +{pointsNeeded} pts
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{reward.points} pts</span>
                        </div>
                        <span className="text-xs text-gray-500">• {reward.partner}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleRedeemReward(reward)}
                  disabled={!canAfford}
                  className={`w-full mt-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                    canAfford
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? (
                    <>
                      <Gift className="w-4 h-4" />
                      <span>Échanger maintenant</span>
                    </>
                  ) : (
                    <span>Points insuffisants</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Comment gagner plus de points ?
        </h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Faire un don de sang : 100-150 points</li>
          <li>• Parrainer un ami : 50 points</li>
          <li>• Compléter votre profil : 25 points</li>
          <li>• Don pendant une alerte urgente : +50 points bonus</li>
        </ul>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl">Confirmer l'échange</h2>
                <button
                  onClick={() => setShowRedeemModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100`}>
                  {selectedReward.icon && <selectedReward.icon className="w-10 h-10 text-red-600" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{selectedReward.title}</h3>
                <p className="text-sm text-gray-600">{selectedReward.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Partenaire</span>
                  <span className="font-medium text-gray-900">{selectedReward.partner}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coût</span>
                  <span className="font-medium text-red-600">{selectedReward.points} points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Points restants</span>
                  <span className="font-medium text-gray-900">{userPoints - selectedReward.points} points</span>
                </div>
              </div>

              {selectedReward.terms && (
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-blue-900">
                    📋 <strong>Conditions :</strong> {selectedReward.terms}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRedeemModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmRedeem}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition shadow-lg"
                >
                  Confirmer l'échange
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with QR Code */}
      {showSuccessModal && redeemedReward && (
        <RewardQRCode
          reward={redeemedReward}
          onClose={() => {
            setShowSuccessModal(false);
            setRedeemedReward(null);
            setSelectedReward(null);
          }}
        />
      )}
      </>
      )}
    </div>
  );
}
