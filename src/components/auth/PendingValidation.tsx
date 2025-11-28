import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Mail, Phone, FileText, Users, Heart, AlertCircle, Download } from 'lucide-react';

interface PendingValidationProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bloodType: string;
    city: string;
    region: string;
    submittedAt: string;
  };
}

export function PendingValidation({ userData }: PendingValidationProps) {
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateElapsedTime = () => {
      const submitted = new Date(userData.submittedAt);
      const now = new Date();
      const diffMs = now.getTime() - submitted.getTime();
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeElapsed(`${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`);
      } else {
        setTimeElapsed(`${minutes} minute${minutes > 1 ? 's' : ''}`);
      }
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [userData.submittedAt]);

  const downloadReceipt = () => {
    const receipt = `
DON DE SANG TOGO - RÉCÉPISSÉ D'INSCRIPTION
═══════════════════════════════════════════

Date de soumission : ${new Date(userData.submittedAt).toLocaleString('fr-FR')}

INFORMATIONS DU DONNEUR
───────────────────────
Nom complet    : ${userData.firstName} ${userData.lastName}
Groupe sanguin : ${userData.bloodType}
Email          : ${userData.email}
Téléphone      : ${userData.phone}
Localisation   : ${userData.city}, ${userData.region}

STATUT
──────
✓ Dossier reçu et en cours d'examen
⏳ Validation sous 48 heures

PROCHAINES ÉTAPES
─────────────────
1. Examen du questionnaire médical
2. Vérification des documents
3. Validation par l'équipe médicale
4. Notification par email et SMS

CONTACT
───────
Email    : support@donsangtogo.tg
Téléphone: +228 90 00 00 00
Horaires : Lun-Ven 8h-18h, Sam 8h-12h

═══════════════════════════════════════════
Don de Sang Togo - Sauvons des vies ensemble
    `.trim();

    const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `recepisse_inscription_${userData.lastName}_${new Date().getTime()}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-2">Inscription Soumise avec Succès !</h1>
          <p className="text-gray-600">
            Bienvenue dans la communauté des donneurs de sang du Togo 🇹🇬
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-6">
          {/* Status Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl mb-1">Dossier en cours d'examen</h2>
                <p className="text-blue-100 text-sm">
                  Soumis il y a {timeElapsed}
                </p>
              </div>
              <Clock className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900 mb-3">Vos informations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="text-gray-900">{userData.firstName} {userData.lastName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Groupe sanguin</p>
                  <p className="text-red-600 font-semibold">{userData.bloodType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 text-sm break-all">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="text-gray-900">{userData.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <h3 className="text-gray-900 mb-4">Processus de validation</h3>
            <div className="space-y-4">
              {/* Step 1 - Completed */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-green-600 mt-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="text-gray-900 mb-1">Dossier reçu ✓</h4>
                  <p className="text-sm text-gray-600">
                    Votre inscription a été enregistrée avec succès dans notre système.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(userData.submittedAt).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>

              {/* Step 2 - In Progress */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="text-gray-900 mb-1">Examen en cours ⏳</h4>
                  <p className="text-sm text-gray-600">
                    Notre équipe médicale examine votre questionnaire de santé et vos documents.
                  </p>
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      <strong>Durée estimée :</strong> 24-48 heures ouvrables
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Pending */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="text-gray-500 mb-1">Décision médicale</h4>
                  <p className="text-sm text-gray-600">
                    Validation finale de votre éligibilité par notre médecin responsable.
                  </p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 mb-1">Notification</h4>
                  <p className="text-sm text-gray-600">
                    Vous recevrez un email et un SMS avec le résultat de votre demande.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-t border-yellow-200">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Que se passe-t-il maintenant ?
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-yellow-600 font-semibold">1.</span>
                <div>
                  <p className="text-gray-900 font-medium">Vérification médicale</p>
                  <p className="text-sm text-gray-700">
                    Un médecin examine votre questionnaire de santé pour confirmer votre éligibilité.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-yellow-600 font-semibold">2.</span>
                <div>
                  <p className="text-gray-900 font-medium">Validation des documents</p>
                  <p className="text-sm text-gray-700">
                    Vérification de votre pièce d'identité et photo d'identité.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-yellow-600 font-semibold">3.</span>
                <div>
                  <p className="text-gray-900 font-medium">Notification de décision</p>
                  <p className="text-sm text-gray-700">
                    Vous recevrez un email détaillé à <strong>{userData.email}</strong> et un SMS au <strong>{userData.phone}</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-yellow-600 font-semibold">4.</span>
                <div>
                  <p className="text-gray-900 font-medium">Accès à l'application</p>
                  <p className="text-sm text-gray-700">
                    Si validé, vous pourrez vous connecter et commencer à sauver des vies ! 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={downloadReceipt}
            className="bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-3 shadow-md"
          >
            <Download className="w-5 h-5" />
            Télécharger le récépissé
          </button>

          <a
            href="mailto:support@donsangtogo.tg"
            className="bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-3 shadow-md"
          >
            <Mail className="w-5 h-5" />
            Contacter le support
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Besoin d'aide ?
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Email :</strong> support@donsangtogo.tg
              </p>
              <p className="text-gray-700">
                <strong>Téléphone :</strong> +228 90 00 00 00
              </p>
              <p className="text-gray-700">
                <strong>Horaires :</strong> Lun-Ven 8h-18h, Sam 8h-12h
              </p>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-3">Questions fréquentes</h3>
            <div className="space-y-3 text-sm">
              <details className="cursor-pointer">
                <summary className="text-gray-900 font-medium">Combien de temps pour la validation ?</summary>
                <p className="text-gray-600 mt-2 ml-4">
                  Généralement 24-48h ouvrables. Vous serez notifié par email et SMS.
                </p>
              </details>

              <details className="cursor-pointer">
                <summary className="text-gray-900 font-medium">Puis-je modifier mes informations ?</summary>
                <p className="text-gray-600 mt-2 ml-4">
                  Contactez-nous par email à support@donsangtogo.tg avec votre demande.
                </p>
              </details>

              <details className="cursor-pointer">
                <summary className="text-gray-900 font-medium">Que faire si je suis refusé ?</summary>
                <p className="text-gray-600 mt-2 ml-4">
                  L'email de notification expliquera les raisons et les démarches possibles.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h3 className="text-gray-900 mb-2">Merci de votre engagement !</h3>
            <p className="text-gray-600 max-w-2xl">
              Votre geste solidaire va permettre de sauver des vies. Chaque don compte, et nous sommes fiers de vous compter parmi nos futurs donneurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
