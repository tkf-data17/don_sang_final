import { X, QrCode, Smartphone, Award, CheckCircle } from 'lucide-react';

interface QRCodeHelpProps {
  onClose: () => void;
}

export function QRCodeHelp({ onClose }: QRCodeHelpProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl">Guide d'utilisation</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-100 text-sm">
            Comment utiliser votre carte donneur QR Code
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-gray-900">Ouvrez votre carte</h3>
            </div>
            <div className="pl-13 space-y-2">
              <p className="text-sm text-gray-600">
                Depuis votre profil, cliquez sur le bouton "Ma Carte Donneur" pour afficher votre QR Code.
              </p>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                <QrCode className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Votre carte s'affichera à l'écran</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-gray-900">Au centre de collecte</h3>
            </div>
            <div className="pl-13 space-y-2">
              <p className="text-sm text-gray-600">
                Présentez-vous avec votre téléphone. Le personnel scannera votre QR Code pour vous identifier.
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-900">
                  💡 Conseil : Téléchargez votre QR Code en avance si vous craignez une mauvaise connexion internet.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600">3</span>
              </div>
              <h3 className="text-gray-900">Effectuez votre don</h3>
            </div>
            <div className="pl-13 space-y-2">
              <p className="text-sm text-gray-600">
                Après l'identification, suivez le processus habituel de don de sang.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-gray-900">Recevez vos points</h3>
            </div>
            <div className="pl-13 space-y-2">
              <p className="text-sm text-gray-600">
                Le centre valide votre don et vos points sont automatiquement ajoutés !
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">Points gagnés</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Groupes rares</div>
                    <div className="font-bold text-red-600">125-150 pts</div>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Standards</div>
                    <div className="font-bold text-blue-600">100 pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="text-gray-900 mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Fonctionnalités
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">QR Code permanent et réutilisable</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">Téléchargeable au format PNG</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">Utilisable dans tous les centres</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">Pas besoin de rendez-vous obligatoire</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
            <h4 className="text-gray-900 mb-3">💡 Astuces</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Gardez votre carte accessible (ajoutez-la aux favoris)</li>
              <li>• Téléchargez-la pour l'utiliser même sans connexion</li>
              <li>• Vérifiez votre profil avant d'aller au centre</li>
              <li>• Consultez vos points après chaque don</li>
            </ul>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            J'ai compris !
          </button>
        </div>
      </div>
    </div>
  );
}
