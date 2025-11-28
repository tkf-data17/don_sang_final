import { Heart, Users, MapPin, Clock, CheckCircle, ArrowRight, Droplet, AlertCircle, Calendar, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Don de Sang Togo</h1>
                <p className="text-xs text-gray-600">Sauvez des vies, donnez du sang</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Se connecter
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Sauvez jusqu'à 3 vies avec un seul don</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl text-gray-900 mb-6">
              Votre sang peut
              <span className="text-red-600 block mt-2">sauver des vies</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Rejoignez la communauté des donneurs de sang au Togo. Chaque don compte, chaque donneur est un héros.
              Trouvez un centre près de chez vous et prenez rendez-vous en quelques clics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Commencer maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-gray-600">Donneurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600">Centres de collecte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">30,000+</div>
              <div className="text-gray-600">Vies sauvées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Pourquoi donner son sang ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Le don de sang est un acte solidaire essentiel qui sauve des milliers de vies chaque année
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-4">Sauvez des vies</h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque don de sang peut sauver jusqu'à 3 vies. Les victimes d'accidents, les femmes en couches,
                les patients opérés et ceux atteints de maladies graves dépendent de votre générosité.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-4">Bilan de santé gratuit</h3>
              <p className="text-gray-600 leading-relaxed">
                Avant chaque don, un contrôle médical complet est effectué : pression artérielle, hémoglobine,
                dépistage de maladies. C'est un check-up santé gratuit.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-4">Solidarité nationale</h3>
              <p className="text-gray-600 leading-relaxed">
                Rejoignez une communauté de héros du quotidien. Le don de sang crée un réseau de solidarité
                essentiel pour notre système de santé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Donner son sang n'a jamais été aussi simple avec notre plateforme
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                1
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">Inscrivez-vous</h3>
              <p className="text-gray-600">
                Créez votre compte en quelques minutes avec vos informations personnelles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                2
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">Trouvez un centre</h3>
              <p className="text-gray-600">
                Localisez le centre de don le plus proche de vous sur la carte
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                3
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">Prenez RDV</h3>
              <p className="text-gray-600">
                Réservez votre créneau en ligne selon vos disponibilités
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                4
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">Donnez votre sang</h3>
              <p className="text-gray-600">
                Rendez-vous au centre et sauvez des vies en 45 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Preview Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl text-gray-900 mb-4">Puis-je donner mon sang ?</h2>
                <p className="text-lg text-gray-600">
                  Vérifiez rapidement si vous êtes éligible au don de sang
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-gray-900 mb-1">Âge : 18 à 65 ans</div>
                    <div className="text-sm text-gray-600">Vous devez être majeur et en bonne santé</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-gray-900 mb-1">Poids minimum : 50 kg</div>
                    <div className="text-sm text-gray-600">Nécessaire pour assurer votre sécurité</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-gray-900 mb-1">Bonne santé générale</div>
                    <div className="text-sm text-gray-600">Pas de maladie chronique grave ou infection en cours</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-gray-900 mb-1">Délai entre les dons</div>
                    <div className="text-sm text-gray-600">8 semaines minimum entre deux dons de sang total</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Vérifier mon éligibilité complète</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-12 border-2 border-orange-200">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-4">Besoin urgent de sang</h2>
              <p className="text-xl text-gray-700 mb-6">
                Les stocks de sang sont bas dans plusieurs régions du Togo. Votre don est plus important que jamais.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-white rounded-full border-2 border-red-500 text-red-600">
                  🩸 O- urgent
                </span>
                <span className="px-4 py-2 bg-white rounded-full border-2 border-orange-500 text-orange-600">
                  🩸 A+ nécessaire
                </span>
                <span className="px-4 py-2 bg-white rounded-full border-2 border-yellow-500 text-yellow-700">
                  🩸 B- faible
                </span>
              </div>
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition inline-flex items-center gap-2 shadow-lg"
              >
                <span>Donner maintenant</span>
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Prêt à devenir un héros ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers de donneurs qui sauvent des vies chaque jour au Togo
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-100 transition inline-flex items-center gap-3 shadow-xl text-lg"
          >
            <span>Commencer mon inscription</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-lg">Don de Sang Togo</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sauvez des vies, donnez du sang. Ensemble pour une meilleure santé au Togo.
              </p>
            </div>

            <div>
              <h3 className="mb-4">À propos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Notre mission</a></li>
                <li><a href="#" className="hover:text-white transition">Qui sommes-nous</a></li>
                <li><a href="#" className="hover:text-white transition">Nos partenaires</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Guides du donneur</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Blog santé</a></li>
                <li><a href="#" className="hover:text-white transition">Statistiques</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Légal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">CGU</a></li>
                <li><a href="#" className="hover:text-white transition">Mentions légales</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Don de Sang Togo. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
