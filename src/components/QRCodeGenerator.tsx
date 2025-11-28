import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { User, Droplet, Download, Phone, Calendar, Award, X, HelpCircle } from 'lucide-react';
import { QRCodeHelp } from './QRCodeHelp';

interface QRCodeGeneratorProps {
  donor: {
    id: string;
    name: string;
    bloodType: string;
    phone: string;
    dateOfBirth: string;
    totalDonations: number;
    points: number;
  };
  onClose: () => void;
}

export function QRCodeGenerator({ donor, onClose }: QRCodeGeneratorProps) {
  const [showHelp, setShowHelp] = useState(false);
  
  // Données encodées dans le QR code - Carte d'identité du donneur
  const qrData = JSON.stringify({
    donorId: donor.id,
    name: donor.name,
    bloodType: donor.bloodType,
    phone: donor.phone,
    dateOfBirth: donor.dateOfBirth,
    generatedAt: Date.now(),
    type: 'DONOR_CARD'
  });

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
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
        downloadLink.download = `carte-donneur-${donor.id}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl">Ma Carte Donneur</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelp(true)}
                className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
                title="Aide"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-red-100 text-sm">
            Votre carte d'identité de donneur de sang
          </p>
        </div>

        {/* QR Code */}
        <div className="p-6 md:p-8">
          {/* QR Code Display */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl border-2 border-gray-200 mb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-2xl border-2 border-gray-100">
                <div className="flex items-center justify-center">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={qrData}
                    size={240}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2.5 rounded-full text-sm font-medium">
                <Droplet className="w-4 h-4 fill-red-700" />
                <span>Carte permanente valide</span>
              </div>
            </div>
          </div>

          {/* Donor Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Nom complet</div>
                <div className="font-medium">{donor.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-5 h-5 text-gray-400 flex items-center justify-center text-sm">🆔</div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">ID Donneur</div>
                <div className="font-medium font-mono text-sm">{donor.id}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Groupe sanguin</div>
                <div className="font-medium text-lg text-red-600">{donor.bloodType}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Téléphone</div>
                <div className="font-medium">{donor.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Date de naissance</div>
                <div className="font-medium">{donor.dateOfBirth}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-yellow-50 -mx-2 px-2 py-2 rounded-lg">
              <Award className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Statistiques</div>
                <div className="font-medium">{donor.totalDonations} dons • {donor.points} points</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger le QR Code
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition"
            >
              Fermer
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-900 mb-2">
                💡 <strong>Comment utiliser votre carte ?</strong>
              </p>
              <ol className="text-xs text-blue-800 space-y-1">
                <li>1. Présentez-vous dans n'importe quel centre de collecte</li>
                <li>2. Montrez ce QR code au personnel</li>
                <li>3. Le centre scanne pour vous identifier</li>
                <li>4. Effectuez votre don</li>
                <li>5. Vos points sont ajoutés automatiquement !</li>
              </ol>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-xs text-yellow-900 text-center">
                ⚡ <strong>Points par don :</strong> 100-150 pts selon votre groupe sanguin
              </p>
            </div>

            <div className="p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-xs text-green-900 text-center">
                📱 Gardez cette carte dans votre téléphone ou téléchargez-la
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && <QRCodeHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
}
