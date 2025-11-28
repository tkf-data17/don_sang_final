import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Plus, X, Edit2, Trash2, CheckCircle } from 'lucide-react';

interface Appointment {
  id: number;
  center: string;
  date: string;
  time: string;
  address: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    center: 'CHU Sylvanus Olympio',
    date: '2025-12-02',
    time: '10:00',
    address: 'Boulevard du 13 Janvier, Lomé',
    status: 'confirmed'
  },
  {
    id: 2,
    center: 'Centre de Transfusion Sanguine',
    date: '2025-10-15',
    time: '14:30',
    address: 'Rue du Commerce, Lomé',
    status: 'completed'
  }
];

interface AppointmentsProps {
  prefillCenter?: string;
}

export function Appointments({ prefillCenter }: AppointmentsProps) {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState<number | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  
  // New appointment form state
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Effect to pre-fill center if provided
  useEffect(() => {
    if (prefillCenter) {
      setSelectedCenter(prefillCenter);
      setShowNewAppointment(true); // Open the new appointment form if prefillCenter is provided
    }
  }, [prefillCenter]);

  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  const centers = [
    { name: 'CHU Sylvanus Olympio', address: 'Boulevard du 13 Janvier, Lomé' },
    { name: 'CHU Campus', address: 'Avenue de la Libération, Lomé' },
    { name: 'Centre de Transfusion Sanguine', address: 'Rue du Commerce, Lomé' },
    { name: 'CHR Kara', address: 'Centre-ville, Kara' },
    { name: 'CHR Sokodé', address: 'Avenue Centrale, Sokodé' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const centerInfo = centers.find(c => c.name === selectedCenter);
    
    if (editingAppointment) {
      // Mode modification
      setAppointments(prev => prev.map(apt => 
        apt.id === editingAppointment.id
          ? { ...apt, center: selectedCenter, date: selectedDate, time: selectedTime, address: centerInfo?.address || apt.address }
          : apt
      ));
      setConfirmationMessage('Rendez-vous modifié avec succès !');
      setEditingAppointment(null);
    } else {
      // Mode création
      const newAppointment: Appointment = {
        id: Date.now(),
        center: selectedCenter,
        date: selectedDate,
        time: selectedTime,
        address: centerInfo?.address || '',
        status: 'confirmed'
      };
      setAppointments(prev => [...prev, newAppointment]);
      setConfirmationMessage(`Rendez-vous confirmé pour ${selectedCenter} !`);
    }
    
    setShowNewAppointment(false);
    resetForm();
  };

  const handleEdit = (apt: Appointment) => {
    setEditingAppointment(apt);
    setSelectedCenter(apt.center);
    setSelectedDate(apt.date);
    setSelectedTime(apt.time);
    setShowNewAppointment(true);
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    setShowCancelConfirm(null);
    alert('Rendez-vous annulé avec succès');
  };

  const resetForm = () => {
    setSelectedCenter('');
    setSelectedDate('');
    setSelectedTime('');
    setEditingAppointment(null);
  };

  const handleClose = () => {
    setShowNewAppointment(false);
    resetForm();
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">Confirmé</span>;
      case 'pending':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">En attente</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Complété</span>;
    }
  };

  if (showNewAppointment) {
    return (
      <div className="p-4 pb-24">
        <div className="mb-6">
          <button
            onClick={handleClose}
            className="text-red-600 hover:underline mb-2 flex items-center gap-1"
          >
            ← Retour
          </button>
          <h2 className="text-gray-900">
            {editingAppointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {editingAppointment ? 'Modifiez les détails de votre rendez-vous' : 'Planifiez votre prochain don de sang'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Center Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Centre de don <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Sélectionnez un centre</option>
              {centers.map(center => (
                <option key={center.name} value={center.name}>{center.name}</option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Heure <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg border transition ${
                    selectedTime === time
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-blue-900 mb-2">📋 À savoir avant votre don</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mangez normalement avant le don</li>
              <li>• Buvez beaucoup d'eau (au moins 2 verres)</li>
              <li>• Apportez une pièce d'identité</li>
              <li>• Prévoyez 30-45 minutes pour le don complet</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              {editingAppointment ? 'Enregistrer' : 'Confirmer le RDV'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      {confirmationMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-sm text-green-800">{confirmationMessage}</p>
          </div>
          <button onClick={() => setConfirmationMessage(null)} className="text-green-600 hover:text-green-800">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header with CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Mes rendez-vous</h2>
          <p className="text-sm text-gray-600 mt-1">Gérez vos dons de sang</p>
        </div>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">À venir</h3>
          <div className="space-y-3">
            {upcomingAppointments.map(apt => (
              <div key={apt.id} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900">{apt.center}</h4>
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {new Date(apt.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{apt.address}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(apt)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-sm flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button 
                    onClick={() => setShowCancelConfirm(apt.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition text-sm flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Annuler
                  </button>
                  <button 
                    onClick={() => setShowDetails(showDetails === apt.id ? null : apt.id)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                  >
                    <ChevronRight className={`w-5 h-5 transition ${showDetails === apt.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {/* Détails étendus */}
                {showDetails === apt.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h5 className="text-green-900 font-medium mb-2">Rappels :</h5>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ SMS de rappel 24h avant</li>
                        <li>✓ Bien vous hydrater la veille</li>
                        <li>✓ Petit déjeuner léger le jour J</li>
                        <li>✓ Carte d'identité obligatoire</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {upcomingAppointments.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Aucun rendez-vous prévu</h3>
          <p className="text-sm text-gray-600 mb-4">
            Planifiez votre prochain don de sang dès maintenant
          </p>
          <button
            onClick={() => setShowNewAppointment(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nouveau rendez-vous
          </button>
        </div>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">Historique récent</h3>
          <div className="space-y-3">
            {pastAppointments.map(apt => (
              <div key={apt.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-700">{apt.center}</h4>
                      {getStatusBadge(apt.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(apt.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de confirmation d'annulation */}
      {showCancelConfirm !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirmer l'annulation</h3>
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est irréversible.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Non, garder
              </button>
              <button
                onClick={() => handleCancelAppointment(showCancelConfirm)}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                Oui, annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
