import { useState } from 'react';
import { Calendar, Droplet, Award, TrendingUp, Download } from 'lucide-react';

interface Donation {
  id: number;
  date: string;
  center: string;
  city: string;
  bloodType: string;
  volume: number;
  status: 'completed' | 'scheduled';
}

const mockDonations: Donation[] = [
  {
    id: 1,
    date: '2025-10-15',
    center: 'Centre de Transfusion Sanguine',
    city: 'Lomé',
    bloodType: 'O+',
    volume: 450,
    status: 'completed'
  },
  {
    id: 2,
    date: '2025-07-08',
    center: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    bloodType: 'O+',
    volume: 450,
    status: 'completed'
  },
  {
    id: 3,
    date: '2025-04-02',
    center: 'CHU Campus',
    city: 'Lomé',
    bloodType: 'O+',
    volume: 450,
    status: 'completed'
  },
  {
    id: 4,
    date: '2024-12-18',
    center: 'Centre de Transfusion Sanguine',
    city: 'Lomé',
    bloodType: 'O+',
    volume: 450,
    status: 'completed'
  },
  {
    id: 5,
    date: '2024-09-10',
    center: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    bloodType: 'O+',
    volume: 450,
    status: 'completed'
  }
];

export function History() {
  const [donations] = useState<Donation[]>(mockDonations);
  
  const totalDonations = donations.filter(d => d.status === 'completed').length;
  const totalVolume = donations.reduce((sum, d) => d.status === 'completed' ? sum + d.volume : sum, 0);
  const livesSaved = totalDonations * 3; // 1 don = 3 vies
  
  // Calculate next possible donation date (90 days after last donation)
  const lastDonation = donations.find(d => d.status === 'completed');
  const nextPossibleDate = lastDonation 
    ? new Date(new Date(lastDonation.date).getTime() + 90 * 24 * 60 * 60 * 1000)
    : new Date();
  
  const daysUntilNext = Math.ceil((nextPossibleDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const canDonateNow = daysUntilNext <= 0;

  // Group donations by year
  const donationsByYear: { [key: string]: Donation[] } = {};
  donations.forEach(donation => {
    const year = new Date(donation.date).getFullYear().toString();
    if (!donationsByYear[year]) {
      donationsByYear[year] = [];
    }
    donationsByYear[year].push(donation);
  });

  return (
    <div className="p-4 pb-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Mon historique</h2>
        <p className="text-sm text-gray-600 mt-1">Suivez vos dons et votre impact</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5" />
            <p className="text-sm opacity-90">Dons effectués</p>
          </div>
          <p className="text-3xl font-bold">{totalDonations}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <p className="text-sm opacity-90">Vies sauvées</p>
          </div>
          <p className="text-3xl font-bold">{livesSaved}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5" />
            <p className="text-sm opacity-90">Volume total</p>
          </div>
          <p className="text-3xl font-bold">{(totalVolume / 1000).toFixed(1)}L</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <p className="text-sm opacity-90">Niveau</p>
          </div>
          <p className="text-3xl font-bold">
            {totalDonations >= 10 ? 'Gold' : totalDonations >= 5 ? 'Silver' : 'Bronze'}
          </p>
        </div>
      </div>

      {/* Next Donation Card */}
      <div className={`rounded-xl p-4 shadow-md border-2 ${
        canDonateNow 
          ? 'bg-green-50 border-green-300' 
          : 'bg-blue-50 border-blue-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            canDonateNow ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={canDonateNow ? 'text-green-900' : 'text-blue-900'}>
              {canDonateNow ? 'Vous pouvez donner !' : 'Prochain don possible'}
            </h3>
            <p className={`text-sm ${canDonateNow ? 'text-green-700' : 'text-blue-700'}`}>
              {canDonateNow 
                ? 'Vous êtes éligible pour faire un don maintenant'
                : `Dans ${daysUntilNext} jours (${nextPossibleDate.toLocaleDateString('fr-FR')})`
              }
            </p>
          </div>
        </div>
        {canDonateNow && (
          <button 
            onClick={() => alert('Redirection vers la page Rendez-vous. Utilisez la navigation pour prendre un RDV.')}
            className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Prendre rendez-vous
          </button>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">🏆 Badges obtenus</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 1 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">🩸</div>
            <p className="text-xs text-gray-700">Premier don</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 5 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">⭐</div>
            <p className="text-xs text-gray-700">5 dons</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 10 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">🏅</div>
            <p className="text-xs text-gray-700">10 dons</p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button 
        onClick={() => {
          // Créer un PDF ou CSV de l'historique
          const csvContent = [
            ['Date', 'Centre', 'Ville', 'Groupe sanguin', 'Volume (ml)', 'Statut'],
            ...donations.map(d => [
              d.date,
              d.center,
              d.city,
              d.bloodType,
              d.volume,
              d.status === 'completed' ? 'Complété' : 'Programmé'
            ])
          ].map(row => row.join(',')).join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `historique_dons_${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
        }}
        className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Télécharger mon historique
      </button>

      {/* Donations Timeline */}
      <div>
        <h3 className="text-gray-900 mb-3">Historique détaillé</h3>
        {Object.keys(donationsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
          <div key={year} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-gray-700">{year}</h4>
              <span className="text-sm text-gray-500">
                ({donationsByYear[year].length} don{donationsByYear[year].length > 1 ? 's' : ''})
              </span>
            </div>
            <div className="space-y-3">
              {donationsByYear[year].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              ).map((donation, index) => (
                <div key={donation.id} className="flex gap-3">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 && year === new Date().getFullYear().toString()
                        ? 'bg-red-600'
                        : 'bg-gray-300'
                    }`}>
                      <Droplet className={`w-5 h-5 ${
                        index === 0 && year === new Date().getFullYear().toString()
                          ? 'text-white'
                          : 'text-white'
                      }`} />
                    </div>
                    {index < donationsByYear[year].length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200" />
                    )}
                  </div>

                  {/* Donation Card */}
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900">{donation.center}</h4>
                        <p className="text-sm text-gray-600">{donation.city}</p>
                      </div>
                      <span className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded-full border border-red-200">
                        {donation.bloodType}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(donation.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        <span>{donation.volume}ml</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {donations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Aucun don enregistré</h3>
          <p className="text-sm text-gray-600 mb-4">
            Commencez votre parcours de donneur de sang aujourd'hui
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition">
            Prendre mon premier RDV
          </button>
        </div>
      )}
    </div>
  );
}
