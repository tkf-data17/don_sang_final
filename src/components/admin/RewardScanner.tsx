import { useState } from 'react';
import { Scanner, CheckCircle, XCircle, Gift, AlertCircle, User, MapPin, Calendar, Star } from 'lucide-react';

interface RewardVoucher {
  type: string;
  rewardId: string;
  rewardCode: string;
  rewardTitle: string;
  partner: string;
  points: number;
  issuedAt: number;
  expiresAt: number;
  status: string;
}

export function RewardScanner() {
  const [scanResult, setScanResult] = useState<RewardVoucher | null>(null);
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Simulation du scan - En production, utiliser une bibliothèque de scan QR
  const handleSimulateScan = () => {
    // Données de test - Bon de récompense
    const testData: RewardVoucher = {
      type: 'REWARD_VOUCHER',
      rewardId: 'coffee-1',
      rewardCode: 'RWD-COFFEE-1-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      rewardTitle: 'Café gratuit',
      partner: 'Centres de Don',
      points: 50,
      issuedAt: Date.now() - 24 * 60 * 60 * 1000, // Hier
      expiresAt: Date.now() + 29 * 24 * 60 * 60 * 1000, // Dans 29 jours
      status: 'ACTIVE'
    };
    
    setScanResult(testData);
    setError('');
  };

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      setError('Veuillez entrer un code valide');
      return;
    }

    try {
      const data = JSON.parse(manualCode);
      if (data.type !== 'REWARD_VOUCHER') {
        setError('Ce QR code n\'est pas un bon de récompense valide');
        return;
      }
      setScanResult(data);
      setError('');
    } catch (e) {
      setError('Code invalide. Veuillez vérifier le format.');
    }
  };

  const handleValidateVoucher = () => {
    if (scanResult) {
      // Vérifier si le bon est expiré
      if (scanResult.expiresAt < Date.now()) {
        setError('Ce bon a expiré');
        return;
      }

      // Vérifier si le bon est déjà utilisé
      if (scanResult.status !== 'ACTIVE') {
        setError('Ce bon a déjà été utilisé');
        return;
      }

      setIsValidated(true);
      
      // Réinitialiser après 3 secondes pour un nouveau scan
      setTimeout(() => {
        setScanResult(null);
        setIsValidated(false);
        setError('');
        setManualCode('');
      }, 3000);
    }
  };

  const isExpiringSoon = scanResult && (scanResult.expiresAt - Date.now()) < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Scanner className="w-8 h-8" />
            <h2 className="text-2xl">Scanner Récompenses</h2>
          </div>
        </div>
        <p className="text-purple-100 text-sm">
          Scannez le QR code du donneur pour valider l'utilisation de sa récompense
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {!isValidated ? (
          <>
            {/* Scanner Area */}
            {!scanResult && (
              <div className="space-y-6">
                {/* Simulated Camera View */}
                <div className="bg-gray-900 rounded-xl p-8 relative overflow-hidden aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                  <div className="relative z-10 text-center">
                    <Gift className="w-24 h-24 text-white/60 mx-auto mb-4 animate-pulse" />
                    <p className="text-white/80 mb-6">Positionnez le bon de récompense devant la caméra</p>
                    
                    {/* Scan Frame */}
                    <div className="w-48 h-48 mx-auto border-4 border-white/50 rounded-xl relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-400 rounded-tl-xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-400 rounded-tr-xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-400 rounded-bl-xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Demo Scan Button */}
                <button
                  onClick={handleSimulateScan}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Scanner className="w-5 h-5" />
                  Scanner le bon (Démo)
                </button>

                {/* Manual Entry */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-3">Ou entrez le code manuellement :</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Collez le code du bon ici..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleManualEntry}
                      className="px-6 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition"
                    >
                      Valider
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Scan Result */}
            {scanResult && !isValidated && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Bon de récompense scanné</div>
                    <div className="text-sm text-green-600">Vérifiez les informations ci-dessous</div>
                  </div>
                </div>

                {/* Voucher Information */}
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-600" />
                    Détails du bon
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Récompense</span>
                      <span className="font-medium text-gray-900">{scanResult.rewardTitle}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Code du bon</span>
                      <span className="font-mono text-sm font-medium text-gray-900">{scanResult.rewardCode}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Partenaire</span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">{scanResult.partner}</span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Valeur</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium text-gray-900">{scanResult.points} points</span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Émis le</span>
                      <span className="font-medium text-gray-900">
                        {new Date(scanResult.issuedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Expire le</span>
                      <span className={`font-medium ${isExpiringSoon ? 'text-orange-600' : 'text-gray-900'}`}>
                        {new Date(scanResult.expiresAt).toLocaleDateString('fr-FR')}
                        {isExpiringSoon && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            Expire bientôt
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning if expiring soon */}
                {isExpiringSoon && (
                  <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">Ce bon expire dans moins de 7 jours</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleValidateVoucher}
                    className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Valider l'utilisation
                  </button>
                  
                  <button
                    onClick={() => {
                      setScanResult(null);
                      setError('');
                    }}
                    className="px-6 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Validation Success */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h3 className="text-2xl text-gray-900 mb-2">Bon validé avec succès !</h3>
            <p className="text-gray-600 mb-6">
              La récompense a été marquée comme utilisée
            </p>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900">{scanResult?.rewardTitle}</p>
              <p className="text-sm text-gray-500 mt-1">{scanResult?.rewardCode}</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span>{scanResult?.points} points utilisés</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Prêt pour scanner un nouveau bon dans quelques secondes...
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <h3 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Instructions
        </h3>
        <ul className="space-y-1 text-sm text-purple-800">
          <li>• Demandez au donneur de présenter son bon de récompense</li>
          <li>• Scannez le QR code avec cette interface</li>
          <li>• Vérifiez les détails du bon avant validation</li>
          <li>• Validez pour marquer le bon comme utilisé</li>
          <li>• Les bons expirés ne peuvent pas être validés</li>
        </ul>
      </div>
    </div>
  );
}
