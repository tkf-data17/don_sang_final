import { useState } from 'react';
import { Gift, Copy, Check, Users, TrendingUp, Award, Star, Sparkles, Share2, QrCode, Download, Plus, X } from 'lucide-react';

interface ReferralCode {
  code: string;
  type: 'personal' | 'event' | 'bonus' | 'admin';
  points: number;
  createdAt: string;
  expiresAt?: string;
  usedBy: string[];
  maxUses: number;
  description: string;
  active: boolean;
}

interface Referral {
  id: number;
  referredUser: string;
  date: string;
  status: 'pending' | 'completed' | 'rewarded';
  pointsEarned: number;
  code: string;
}

export function ReferralSystem() {
  const [activeTab, setActiveTab] = useState<'generate' | 'use' | 'history' | 'stats'>('generate');
  const [personalCode, setPersonalCode] = useState('KOFFI2025');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState('');
  const [codeValidated, setCodeValidated] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showCreateBonus, setShowCreateBonus] = useState(false);
  
  // Codes générés par l'utilisateur
  const [customCodes, setCustomCodes] = useState<ReferralCode[]>([
    {
      code: 'KOFFI2025',
      type: 'personal',
      points: 50,
      createdAt: '2025-11-20',
      usedBy: ['Marie AGBO', 'Jean DOE', 'Paul KPOTI'],
      maxUses: 999,
      description: 'Mon code de parrainage personnel',
      active: true
    }
  ]);

  // Codes bonus disponibles
  const [bonusCodes] = useState<ReferralCode[]>([
    {
      code: 'WELCOME2025',
      type: 'event',
      points: 100,
      createdAt: '2025-11-01',
      expiresAt: '2025-12-31',
      usedBy: [],
      maxUses: 1,
      description: 'Code de bienvenue nouvel inscrit',
      active: true
    },
    {
      code: 'NOEL50',
      type: 'event',
      points: 50,
      createdAt: '2025-12-01',
      expiresAt: '2025-12-25',
      usedBy: [],
      maxUses: 1,
      description: 'Bonus spécial Noël',
      active: true
    },
    {
      code: 'DONNEUR100',
      type: 'bonus',
      points: 100,
      createdAt: '2025-11-15',
      expiresAt: '2025-11-30',
      usedBy: [],
      maxUses: 1,
      description: 'Bonus 100ème donneur du mois',
      active: true
    }
  ]);

  // Historique parrainages
  const [referrals] = useState<Referral[]>([
    {
      id: 1,
      referredUser: 'Marie AGBO',
      date: '2025-11-25',
      status: 'rewarded',
      pointsEarned: 100,
      code: 'KOFFI2025'
    },
    {
      id: 2,
      referredUser: 'Jean DOE',
      date: '2025-11-23',
      status: 'completed',
      pointsEarned: 50,
      code: 'KOFFI2025'
    },
    {
      id: 3,
      referredUser: 'Paul KPOTI',
      date: '2025-11-20',
      status: 'pending',
      pointsEarned: 0,
      code: 'KOFFI2025'
    }
  ]);

  // Stats
  const stats = {
    totalReferrals: 3,
    completedReferrals: 2,
    totalPointsEarned: 150,
    activeCode: 'KOFFI2025',
    rank: 12,
    nextReward: 200
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const regeneratePersonalCode = () => {
    const newCode = generateRandomCode();
    setPersonalCode(newCode);
    
    // Mettre à jour dans customCodes
    setCustomCodes(prev => prev.map(c => 
      c.type === 'personal' ? { ...c, code: newCode } : c
    ));
    
    alert(`Nouveau code généré : ${newCode}`);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const shareCode = () => {
    const text = `🩸 Rejoins-moi sur Don de Sang Togo et gagne 50 points avec mon code : ${personalCode}\n\nEnsemble, sauvons des vies ! 🇹🇬`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Don de Sang Togo - Code Parrainage',
        text: text,
        url: 'https://donsangtogo.tg'
      });
    } else {
      copyToClipboard(text);
      alert('Message copié ! Partage-le sur WhatsApp, Facebook ou SMS.');
    }
  };

  const validateCode = () => {
    if (!inputCode.trim()) {
      alert('Veuillez entrer un code');
      return;
    }

    // Simuler validation
    const allCodes = [...customCodes, ...bonusCodes];
    const foundCode = allCodes.find(c => c.code === inputCode.toUpperCase());

    if (foundCode) {
      if (!foundCode.active) {
        alert('❌ Ce code est expiré ou désactivé');
        return;
      }
      
      if (foundCode.usedBy.length >= foundCode.maxUses) {
        alert('❌ Ce code a atteint sa limite d\'utilisation');
        return;
      }

      setCodeValidated(true);
      alert(`✅ Code validé ! +${foundCode.points} points\n\n${foundCode.description}`);
      setInputCode('');
    } else {
      alert('❌ Code invalide ou inexistant');
    }
  };

  const createBonusCode = (points: number, maxUses: number, description: string, expiryDays?: number) => {
    const newCode: ReferralCode = {
      code: generateRandomCode(),
      type: 'bonus',
      points: points,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: expiryDays ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      usedBy: [],
      maxUses: maxUses,
      description: description,
      active: true
    };

    setCustomCodes(prev => [...prev, newCode]);
    setShowCreateBonus(false);
    alert(`✅ Code créé : ${newCode.code}\nPoints : ${points}\nUtilisations max : ${maxUses}`);
  };

  const downloadQR = () => {
    // En production, générer un vrai QR code
    alert('QR Code téléchargé !');
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl mb-1">Système de Parrainage</h2>
            <p className="text-purple-100">Gagne des points en invitant tes amis !</p>
          </div>
          <Gift className="w-12 h-12 text-white opacity-80" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">Parrainages</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{stats.totalReferrals}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Validés</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.completedReferrals}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-700">Points gagnés</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.totalPointsEarned}</p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-700">Rang</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">#{stats.rank}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto bg-gray-100 rounded-xl p-2">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
            activeTab === 'generate' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Générer
        </button>
        <button
          onClick={() => setActiveTab('use')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
            activeTab === 'use' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Gift className="w-5 h-5" />
          Utiliser
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
            activeTab === 'history' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Users className="w-5 h-5" />
          Historique
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
            activeTab === 'stats' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          Stats
        </button>
      </div>

      <div className="p-4">
        {/* TAB: Générer */}
        {activeTab === 'generate' && (
          <div className="space-y-6">
            {/* Code Personnel */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                <h3 className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Mon Code de Parrainage
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-4">
                    <p className="text-4xl font-bold text-purple-900 tracking-wider mb-2">
                      {personalCode}
                    </p>
                    <p className="text-sm text-purple-700">Partage ce code avec tes amis</p>
                  </div>

                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => copyToClipboard(personalCode)}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                    >
                      {copiedCode === personalCode ? (
                        <>
                          <Check className="w-5 h-5" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copier
                        </>
                      )}
                    </button>

                    <button
                      onClick={shareCode}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                      <Share2 className="w-5 h-5" />
                      Partager
                    </button>

                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                      <QrCode className="w-5 h-5" />
                      QR Code
                    </button>

                    <button
                      onClick={regeneratePersonalCode}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition"
                    >
                      <Sparkles className="w-5 h-5" />
                      Nouveau code
                    </button>
                  </div>
                </div>

                {showQR && (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="w-48 h-48 bg-white mx-auto mb-4 border-2 border-gray-300 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">{personalCode}</p>
                      </div>
                    </div>
                    <button
                      onClick={downloadQR}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mx-auto"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger QR
                    </button>
                  </div>
                )}

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">💰 Récompenses du parrainage :</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <strong>+50 points</strong> pour toi quand ton filleul s'inscrit
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <strong>+50 points</strong> pour ton filleul à l'inscription
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <strong>+100 points bonus</strong> quand ton filleul fait son 1er don
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <strong>+20 points</strong> à chaque don de ton filleul (à vie !)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mes Codes Bonus Créés */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white flex items-center justify-between">
                <h3 className="text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Mes Codes Bonus
                </h3>
                <button
                  onClick={() => setShowCreateBonus(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  <Plus className="w-5 h-5" />
                  Créer
                </button>
              </div>

              <div className="p-6">
                {customCodes.filter(c => c.type !== 'personal').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Gift className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Aucun code bonus créé</p>
                    <p className="text-sm">Crée des codes personnalisés pour des événements !</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customCodes.filter(c => c.type !== 'personal').map((code, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg text-blue-900">{code.code}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                code.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {code.active ? 'Actif' : 'Inactif'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900">{code.description}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                          >
                            {copiedCode === code.code ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>

                        <div className="flex gap-4 text-sm text-gray-900">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {code.points} pts
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {code.usedBy.length}/{code.maxUses}
                          </span>
                          {code.expiresAt && (
                            <span className="text-orange-600">
                              Expire le {new Date(code.expiresAt).toLocaleDateString('fr-FR')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Codes Événements Disponibles */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                <h3 className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Codes Événements Disponibles
                </h3>
              </div>

              <div className="p-6 space-y-3">
                {bonusCodes.map((code, index) => (
                  <div key={index} className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg text-orange-900">{code.code}</span>
                          <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs">
                            +{code.points} pts
                          </span>
                        </div>
                        <p className="text-sm text-orange-700">{code.description}</p>
                      </div>
                    </div>

                    {code.expiresAt && (
                      <p className="text-xs text-orange-600 mt-2">
                        ⏰ Expire le {new Date(code.expiresAt).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Utiliser un Code */}
        {activeTab === 'use' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                Utiliser un Code
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-900 font-medium mb-2">
                    Entre un code de parrainage ou bonus
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      placeholder="Ex: KOFFI2025"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                      maxLength={12}
                    />
                    <button
                      onClick={validateCode}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold"
                    >
                      Valider
                    </button>
                  </div>
                </div>

                {codeValidated && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <Check className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-bold text-green-900">Code validé avec succès !</p>
                        <p className="text-sm text-green-700">Les points ont été ajoutés à ton compte</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Types de codes :</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <strong>Codes de parrainage</strong> : Partagés par d'autres donneurs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <strong>Codes événements</strong> : Offerts lors de campagnes spéciales
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <strong>Codes bonus</strong> : Récompenses pour actions spécifiques
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Historique */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                <h3 className="text-lg">Mes Parrainages</h3>
                <p className="text-sm text-indigo-100">{referrals.length} personnes parrainées</p>
              </div>

              <div className="p-6">
                {referrals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>Aucun parrainage pour le moment</p>
                    <p className="text-sm">Partage ton code pour commencer !</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((referral) => (
                      <div key={referral.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{referral.referredUser}</p>
                            <p className="text-sm text-gray-900">
                              Code utilisé : <span className="font-mono font-bold">{referral.code}</span>
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            referral.status === 'rewarded' ? 'bg-green-100 text-green-700' :
                            referral.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {referral.status === 'rewarded' ? 'Récompensé' :
                             referral.status === 'completed' ? 'Validé' :
                             'En attente'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-800">
                            {new Date(referral.date).toLocaleDateString('fr-FR')}
                          </span>
                          {referral.pointsEarned > 0 && (
                            <span className="font-bold text-green-600 flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              +{referral.pointsEarned} pts
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Stats */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Mes Statistiques
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-4">📊 Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">Total parrainages</span>
                      <span className="font-bold text-purple-900">{stats.totalReferrals}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">Taux de validation</span>
                      <span className="font-bold text-purple-900">
                        {Math.round((stats.completedReferrals / stats.totalReferrals) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">Points totaux</span>
                      <span className="font-bold text-purple-900">{stats.totalPointsEarned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">Moyenne par filleul</span>
                      <span className="font-bold text-purple-900">
                        {Math.round(stats.totalPointsEarned / stats.completedReferrals)} pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Classement */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h4 className="font-semibold text-orange-900 mb-4">🏆 Classement</h4>
                  <div className="text-center mb-4">
                    <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full w-20 h-20 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold">#{stats.rank}</span>
                    </div>
                    <p className="text-sm text-orange-700">Sur 1,247 parrains actifs</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-800 font-medium mb-2">Prochain palier : Top 10</p>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-800 font-medium mt-2">Plus que 2 parrainages validés</p>
                  </div>
                </div>

                {/* Récompenses à venir */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-4">🎁 Récompenses à venir</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        5
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">5 parrainages</p>
                        <p className="text-xs text-blue-700">Badge "Ambassadeur Bronze"</p>
                      </div>
                      <span className="text-xs text-blue-600">Manque 2</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                        10
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-900">10 parrainages</p>
                        <p className="text-xs text-purple-700">+200 points bonus</p>
                      </div>
                      <span className="text-xs text-purple-600">Manque 7</span>
                    </div>
                  </div>
                </div>

                {/* Meilleurs filleuls */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-4">⭐ Meilleurs filleuls</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                          MA
                        </div>
                        <span className="text-sm text-green-900">Marie AGBO</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        +100 pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                          JD
                        </div>
                        <span className="text-sm text-green-900">Jean DOE</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        +50 pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Create Bonus Code */}
      {showCreateBonus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white rounded-t-2xl flex items-center justify-between">
              <h3 className="text-xl">Créer un Code Bonus</h3>
              <button
                onClick={() => setShowCreateBonus(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-2">Nombre de points</label>
                <input
                  type="number"
                  defaultValue={50}
                  min={10}
                  max={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="bonusPoints"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 font-medium mb-2">Utilisations max</label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={100}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="bonusMaxUses"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 font-medium mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Ex: Bonus événement campus"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="bonusDescription"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 font-medium mb-2">Expire dans (jours) - Optionnel</label>
                <input
                  type="number"
                  placeholder="Ex: 7"
                  min={1}
                  max={365}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="bonusExpiry"
                />
              </div>

              <button
                onClick={() => {
                  const points = parseInt((document.getElementById('bonusPoints') as HTMLInputElement)?.value || '50');
                  const maxUses = parseInt((document.getElementById('bonusMaxUses') as HTMLInputElement)?.value || '1');
                  const description = (document.getElementById('bonusDescription') as HTMLInputElement)?.value || 'Code bonus';
                  const expiry = parseInt((document.getElementById('bonusExpiry') as HTMLInputElement)?.value || '0');
                  
                  createBonusCode(points, maxUses, description, expiry > 0 ? expiry : undefined);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Créer le Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
