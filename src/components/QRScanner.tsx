import { useState } from 'react';
import { Scanner, CheckCircle, XCircle, User, Droplet, MapPin, Calendar, Award, AlertCircle } from 'lucide-react';

interface DonorData {
  donorId: string;
  name: string;
  bloodType: string;
  phone: string;
  dateOfBirth: string;
  generatedAt: number;
  type: string;
}

interface QRScannerProps {
  onClose: () => void;
  onValidate: (data: DonorData, donationDetails: { center: string; volume: number }) => void;
}

export function QRScanner({ onClose, onValidate }: QRScannerProps) {
  const [scanResult, setScanResult] = useState<DonorData | null>(null);
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Détails du don à enregistrer
  const [selectedCenter, setSelectedCenter] = useState('CHU Sylvanus Olympio');
  const [bloodVolume, setBloodVolume] = useState(450); // en ml

  const centers = [
    'CHU Sylvanus Olympio',
    'CHU Campus',
    'Centre de Transfusion Sanguine',
    'CHR Kara',
    'CHR Sokodé',
    'Hôpital de Tsévié',
    'Hôpital d\'Aného'
  ];

  // Simulation du scan - En production, utiliser une bibliothèque de scan QR
  const handleSimulateScan = () => {
    // Données de test - Carte donneur
    const testData: DonorData = {
      donorId: 'DNR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name: 'Jean Mensah',
      bloodType: 'A+',
      phone: '+228 90 12 34 56',
      dateOfBirth: '15/03/1990',
      generatedAt: Date.now(),
      type: 'DONOR_CARD'
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
      setScanResult(data);
      setError('');
    } catch (e) {
      setError('Code invalide. Veuillez vérifier le format.');
    }
  };

  const handleValidateDonation = () => {
    if (scanResult) {
      const donationDetails = {
        center: selectedCenter,
        volume: bloodVolume
      };
      
      onValidate(scanResult, donationDetails);
      setIsValidated(true);
      setShowSuccessMessage(true);
      
      // Réinitialiser après 3 secondes pour un nouveau scan
      setTimeout(() => {
        setScanResult(null);
        setIsValidated(false);
        setShowSuccessMessage(false);
        setError('');
        setManualCode('');
        setBloodVolume(450);
      }, 3000);
    }
  };

  const calculatePoints = (bloodType: string) => {
    // Points selon la rareté du groupe sanguin
    const points: { [key: string]: number } = {
      'AB-': 150,
      'B-': 125,
      'A-': 125,
      'O-': 150,
      'AB+': 100,
      'B+': 100,
      'A+': 100,
      'O+': 100
    };
    return points[bloodType] || 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Scanner className="w-8 h-8" />
              <h2 className="text-2xl">Scanner QR Code</h2>
            </div>
          </div>
          <p className="text-blue-100 text-sm">
            Scannez le QR code du donneur pour valider le don et attribuer les points
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
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    <div className="relative z-10 text-center">
                      <Scanner className="w-24 h-24 text-white/60 mx-auto mb-4 animate-pulse" />
                      <p className="text-white/80 mb-6">Positionnez le QR code devant la caméra</p>
                      
                      {/* Scan Frame */}
                      <div className="w-48 h-48 mx-auto border-4 border-white/50 rounded-xl relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-xl"></div>
                      </div>
                    </div>
                  </div>

                  {/* Demo Scan Button */}
                  <button
                    onClick={handleSimulateScan}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Scanner className="w-5 h-5" />
                    Scanner le code (Démo)
                  </button>

                  {/* Manual Entry */}
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 mb-3">Ou entrez le code manuellement :</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder="Collez le code ici..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      <div className="font-medium">QR Code scanné avec succès</div>
                      <div className="text-sm text-green-600">Vérifiez les informations ci-dessous</div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Carte Donneur Scannée
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Nom complet</span>
                        <span className="font-medium text-gray-900">{scanResult.name}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">ID Donneur</span>
                        <span className="font-mono text-sm font-medium text-gray-900">{scanResult.donorId}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Groupe sanguin</span>
                        <span className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
                          <span className="font-medium text-lg text-red-600">{scanResult.bloodType}</span>
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Téléphone</span>
                        <span className="font-medium text-gray-900">{scanResult.phone}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Date de naissance</span>
                        <span className="font-medium text-gray-900">{scanResult.dateOfBirth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Donation Details Form */}
                  <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Détails du don</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Centre de collecte
                        </label>
                        <select
                          value={selectedCenter}
                          onChange={(e) => setSelectedCenter(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {centers.map(center => (
                            <option key={center} value={center}>{center}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Volume collecté (ml)
                        </label>
                        <div className="flex gap-2">
                          {[350, 450, 500].map(vol => (
                            <button
                              key={vol}
                              type="button"
                              onClick={() => setBloodVolume(vol)}
                              className={`flex-1 py-2 rounded-lg border transition ${
                                bloodVolume === vol
                                  ? 'bg-red-600 text-white border-red-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                              }`}
                            >
                              {vol} ml
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Date du don</span>
                          <span className="font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Heure</span>
                          <span className="font-medium">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points to Award */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          Points à attribuer
                        </h3>
                        <p className="text-sm text-gray-600">
                          Selon le groupe sanguin {scanResult.bloodType}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-yellow-600">
                          +{calculatePoints(scanResult.bloodType)}
                        </div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleValidateDonation}
                      className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Valider le don
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
              
              <h3 className="text-2xl text-gray-900 mb-2">Don validé avec succès !</h3>
              <p className="text-gray-600 mb-6">
                Les points ont été attribués au donneur
              </p>
              
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div className="text-4xl font-bold text-green-600">
                    +{scanResult && calculatePoints(scanResult.bloodType)}
                  </div>
                </div>
                <p className="text-gray-700">{scanResult?.name}</p>
                <p className="text-sm text-gray-500">{scanResult?.donorId}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedCenter} • {bloodVolume}ml
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Prêt pour un nouveau scan dans quelques secondes...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
