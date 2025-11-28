import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle, Download, Gift, Calendar, MapPin, AlertCircle, Star } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  partner: string;
  icon: any;
  terms?: string;
}

interface RewardQRCodeProps {
  reward: Reward;
  onClose: () => void;
}

export function RewardQRCode({ reward, onClose }: RewardQRCodeProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  // Générer un code unique pour cette récompense
  const rewardCode = `RWD-${reward.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // Valable 30 jours

  // Données encodées dans le QR code
  const qrData = JSON.stringify({
    type: 'REWARD_VOUCHER',
    rewardId: reward.id,
    rewardCode: rewardCode,
    rewardTitle: reward.title,
    partner: reward.partner,
    points: reward.points,
    issuedAt: Date.now(),
    expiresAt: expiryDate.getTime(),
    status: 'ACTIVE'
  });

  const handleDownload = () => {
    const svg = document.getElementById('reward-qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.download = `recompense-${rewardCode}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl my-auto">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl">Échange réussi !</h2>
                <p className="text-green-100 text-sm">Votre bon est prêt</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Reward Info */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                {reward.icon && <reward.icon className="w-6 h-6 text-orange-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-900 font-medium">{reward.partner}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white p-5 rounded-2xl shadow-2xl border-2 border-gray-100">
                <div className="flex items-center justify-center">
                  <QRCodeSVG
                    id="reward-qr-code"
                    value={qrData}
                    size={220}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <Gift className="w-4 h-4" />
                <span>Bon valide</span>
              </div>
            </div>

            {/* Code & Expiry */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Code de bon</span>
                <span className="font-mono font-medium text-gray-900">{rewardCode}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Valide jusqu'au</span>
                <span className="font-medium text-gray-900">
                  {expiryDate.toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Points échangés</span>
                <span className="font-medium text-red-600 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {reward.points} pts
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
            <h4 className="font-medium text-blue-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Comment utiliser votre bon ?
            </h4>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Rendez-vous chez le partenaire : <strong>{reward.partner}</strong></li>
              <li>Présentez ce QR code au personnel</li>
              <li>Le personnel scanne votre code pour valider</li>
              <li>Profitez de votre récompense !</li>
            </ol>

            {reward.terms && (
              <div className="pt-2 border-t border-blue-200">
                <p className="text-xs text-blue-900">
                  <strong>Conditions :</strong> {reward.terms}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-5 h-5" />
              Télécharger le bon
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition"
            >
              Retour aux récompenses
            </button>
          </div>

          {/* Info Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              💡 Le bon est également disponible dans l'historique de vos récompenses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
