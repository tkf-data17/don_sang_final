import React, { useState } from 'react';
import { AlertCircle, User, Calendar, Mail, Phone, MapPin, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react'; // Added Lock, Eye, EyeOff
import { MapSelector } from './MapSelector';
import { supabase } from '../../lib/supabase'; // Import Supabase client

interface RegisterProps {
  onSwitchToLogin: () => void;
  onRegister: (email: string) => void; // Keeping email for now, will adjust if needed
}

export function Register({ onSwitchToLogin, onRegister }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Informations personnelles
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female',
    bloodType: '',
    
    // Step 2: Contact & Localisation
    email: '',
    phone: '',
    city: '',
    customCity: '', // Pour "Autre"
    region: 'Maritime',
    address: '',
    latitude: 6.1319,
    longitude: 1.2223,
    // New: Password fields
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false); // New state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state
  const [loading, setLoading] = useState(false); // New loading state

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];
  const cities = {
    'Maritime': ['Lomé', 'Aného', 'Tsévié', 'Vogan', 'Tabligbo', 'Agbodrafo', 'Kévé', 'Autre (village, localité...)'],
    'Plateaux': ['Atakpamé', 'Kpalimé', 'Notsé', 'Badou', 'Kpélé', 'Amlamé', 'Anié', 'Autre (village, localité...)'],
    'Centrale': ['Sokodé', 'Tchamba', 'Sotouboua', 'Blitta', 'Tchamba', 'Autre (village, localité...)'],
    'Kara': ['Kara', 'Bassar', 'Niamtougou', 'Kandé', 'Bafilo', 'Pagouda', 'Autre (village, localité...)'],
    'Savanes': ['Dapaong', 'Mango', 'Cinkassé', 'Tandjoaré', 'Korbongou', 'Autre (village, localité...)']
  };

  const validateStep1 = () => {
    const newErrors: string[] = [];
    if (!formData.firstName) newErrors.push("Le prénom est requis.");
    if (!formData.lastName) newErrors.push("Le nom est requis.");
    if (!formData.dateOfBirth) newErrors.push("La date de naissance est requise.");
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      //age--; // This line was commented out in the original code, keeping it that way.
    }
    // Age validation is commented out, but if it were active, it would be here.
    // if (age < 18 || age > 65) newErrors.push("Vous devez avoir entre 18 et 65 ans."); 
    if (!formData.gender) newErrors.push("Le sexe est requis.");
    if (!formData.bloodType) newErrors.push("Le groupe sanguin est requis.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep2 = () => {
    const newErrors: string[] = [];
    if (!formData.email) newErrors.push("L'adresse email est requise.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.push("L'adresse email n'est pas valide.");
    if (!formData.phone) newErrors.push("Le numéro de téléphone est requis.");
    if (!/^\+?\d{8,}$/.test(formData.phone)) newErrors.push("Le numéro de téléphone n'est pas valide.");
    if (!formData.region) newErrors.push("La région est requise.");
    if (!formData.city) newErrors.push("La ville/localité est requise.");
    if (formData.city.includes('Autre') && !formData.customCity) newErrors.push("Veuillez préciser votre localité.");
    if (!formData.address) newErrors.push("L'adresse complète est requise.");
    if (!formData.password) newErrors.push("Le mot de passe est requis.");
    if (formData.password.length < 6) newErrors.push("Le mot de passe doit contenir au moins 6 caractères.");
    if (formData.password !== formData.confirmPassword) newErrors.push("Les mots de passe ne correspondent pas.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
    // If there were more steps, additional validation and setStep calls would go here.
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 2 || !validateStep2()) {
            return;
        }

        setLoading(true);
        setErrors([]);

        // Étape 1: Créer l'utilisateur et passer les données du profil en même temps.
        // Le trigger `handle_new_user` dans Supabase s'occupera de créer le profil.
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    date_of_birth: formData.dateOfBirth,
                    gender: formData.gender,
                    blood_type: formData.bloodType,
                    phone: formData.phone,
                    city: formData.city.includes('Autre') ? formData.customCity : formData.city,
                    custom_city: formData.customCity, // Ajout de ce champ
                    region: formData.region,
                    address: formData.address,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                }
            }
        });

        setLoading(false);

        if (authError) {
            setErrors([`Erreur lors de l'inscription: ${authError.message}`]);
            return;
        }

        if (!authData.user) {
            setErrors(["Erreur: Aucun utilisateur n'a été créé. Veuillez réessayer."]);
            return;
        }

        console.log('User signed up successfully:', authData.user);
        alert('Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.');
        onRegister(formData.email);
    };







  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-gray-900">Inscription donneur</h2>
          <span className="text-sm text-gray-600">Étape {step} sur 2</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
        
        {/* Step Labels */}
        <div className="flex justify-between mt-3 text-xs text-gray-600">
          <span className={step === 1 ? 'text-red-600 font-semibold' : ''}>Personnel</span>
          <span className={step === 2 ? 'text-red-600 font-semibold' : ''}>Contact</span>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-900 mb-1">Veuillez corriger les erreurs suivantes :</h4>
              <ul className="text-sm text-red-800 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}



      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Informations personnelles */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-gray-900 mb-1">Informations personnelles</h3>
                <p className="text-sm text-gray-600">Renseignez vos informations de base</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">18-65 ans requis</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Sexe <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 rounded-lg cursor-pointer transition hover:border-red-500">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                        className="text-red-600"
                      />
                      <span>Homme</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 rounded-lg cursor-pointer transition hover:border-red-500">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                        className="text-red-600"
                      />
                      <span>Femme</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Groupe sanguin <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, bloodType: type })}
                      className={`py-3 rounded-lg border-2 transition ${
                        formData.bloodType === type
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Localisation */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-gray-900 mb-1">Contact et localisation</h3>
                <p className="text-sm text-gray-600">Comment vous contacter et vous localiser</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="exemple@email.tg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+228 90 12 34 56"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Région <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value, city: '', customCity: '' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Ville / Localité <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value, customCity: '' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Sélectionnez une ville ou localité</option>
                    {cities[formData.region as keyof typeof cities]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Champ personnalisé si "Autre" est sélectionné */}
              {formData.city.includes('Autre') && (
                <div className="animate-fadeIn">
                  <label className="block text-sm text-gray-700 mb-2">
                    Précisez votre localité <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.customCity}
                      onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: Village de Kpadapé, Quartier Adétikopé..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Indiquez le nom exact de votre village, quartier ou localité
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Adresse complète <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Quartier, rue, numéro..."
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Carte Interactive */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Localisation précise <span className="text-gray-500">(optionnel)</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Cliquez sur la carte pour indiquer votre position exacte (aide à trouver les centres les plus proches)
                </p>
                <MapSelector
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onLocationChange={(lat, lng) => {
                    setFormData({ ...formData, latitude: lat, longitude: lng });
                  }}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
              >
                Précédent
              </button>
            )}
            
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Continuer
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Finaliser l'inscription
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-red-600 hover:underline font-semibold"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}
