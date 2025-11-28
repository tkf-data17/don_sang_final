import { Heart, Users, Award, Shield, Target, Zap, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export function About() {
  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 fill-white" />
          </div>
          <h1 className="text-3xl mb-2">Don de Sang Togo</h1>
          <p className="text-red-100 text-sm mb-4">
            Ensemble, sauvons des vies 🩸
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm">Version 1.0.0 • Novembre 2025</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-gray-900">Notre Mission</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Faciliter et encourager le don de sang au Togo en connectant les donneurs, 
            les centres de collecte et les équipes médicales à travers une plateforme 
            moderne, accessible et ludique. Notre objectif est d'augmenter les stocks 
            de sang disponibles et de sauver plus de vies.
          </p>
        </div>

        {/* Impact */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
          <h2 className="text-gray-900 mb-4">Impact au Togo</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">75%</div>
              <p className="text-xs text-gray-600">des hôpitaux manquent de sang</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
              <p className="text-xs text-gray-600">vies sauvées par don</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">10k+</div>
              <p className="text-xs text-gray-600">dons nécessaires/an</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">7</div>
              <p className="text-xs text-gray-600">centres partenaires</p>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <h2 className="text-gray-900 mb-4">Fonctionnalités Clés</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm mb-1">Localisation des Centres</h3>
                <p className="text-xs text-gray-600">
                  Trouvez facilement les centres de don près de chez vous avec itinéraires GPS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm mb-1">Carte QR Code</h3>
                <p className="text-xs text-gray-600">
                  Carte donneur digitale permanente pour validation rapide des dons
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm mb-1">Système de Points</h3>
                <p className="text-xs text-gray-600">
                  Gagnez des points à chaque don et débloquez des récompenses exclusives
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900 text-sm mb-1">Alertes Urgentes</h3>
                <p className="text-xs text-gray-600">
                  Recevez des notifications pour les besoins urgents près de vous
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Équipe */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-gray-900">Partenaires</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white">
                🏥
              </div>
              <div>
                <h3 className="text-sm text-gray-900">Ministère de la Santé</h3>
                <p className="text-xs text-gray-600">Supervision et coordination</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                🩸
              </div>
              <div>
                <h3 className="text-sm text-gray-900">Centre National de Transfusion</h3>
                <p className="text-xs text-gray-600">Gestion des stocks nationaux</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
                ➕
              </div>
              <div>
                <h3 className="text-sm text-gray-900">Croix-Rouge Togolaise</h3>
                <p className="text-xs text-gray-600">Sensibilisation et collectes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-gray-900">Sécurité & Confidentialité</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Données personnelles chiffrées et sécurisées</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>QR Codes uniques et vérifiés</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Conformité aux normes de santé togolaises</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Aucune donnée vendue à des tiers</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <h2 className="text-gray-900 mb-4">Nous Contacter</h2>
          <div className="space-y-3">
            <a href="mailto:contact@donsang-togo.org" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Email</p>
                <p className="text-xs text-gray-600">contact@donsang-togo.org</p>
              </div>
            </a>

            <a href="tel:+22890123456" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Téléphone</p>
                <p className="text-xs text-gray-600">+228 90 12 34 56</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Adresse</p>
                <p className="text-xs text-gray-600">Lomé, Togo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux Sociaux */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 text-white">
          <h2 className="mb-3">Suivez-nous</h2>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-lg hover:bg-white/30 transition">
              <span className="text-sm">Facebook</span>
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-lg hover:bg-white/30 transition">
              <span className="text-sm">Twitter</span>
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-lg hover:bg-white/30 transition">
              <span className="text-sm">Instagram</span>
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <h2 className="text-gray-900 mb-4">Nos Réalisations</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-700">Donneurs Inscrits</span>
              <span className="font-bold text-red-600">10,000+</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Dons Collectés</span>
              <span className="font-bold text-blue-600">3,500+</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Vies Sauvées</span>
              <span className="font-bold text-green-600">10,500+</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Points Distribués</span>
              <span className="font-bold text-purple-600">350,000+</span>
            </div>
          </div>
        </div>

        {/* Reconnaissance */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
          <div className="text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h2 className="text-gray-900 mb-2">Merci à Tous nos Héros !</h2>
            <p className="text-sm text-gray-700">
              Chaque donneur, chaque centre, chaque membre de l'équipe contribue 
              à sauver des vies. Vous êtes les véritables héros de cette histoire.
            </p>
          </div>
        </div>

        {/* Mentions Légales */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <button className="hover:text-red-600 transition">
              Conditions d'utilisation
            </button>
            <span>•</span>
            <button className="hover:text-red-600 transition">
              Politique de confidentialité
            </button>
          </div>
          <div className="text-xs text-gray-500">
            © 2025 Don de Sang Togo. Tous droits réservés.
          </div>
          <div className="text-xs text-gray-500">
            Version 1.0.0 • Made with ❤️ in Togo
          </div>
        </div>
      </div>
    </div>
  );
}
