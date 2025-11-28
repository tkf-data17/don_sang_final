import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Map } from 'lucide-react';
import { InteractiveCentersMap } from './InteractiveCentersMap';

interface Center {
  id: number;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  distance: string;
  lat: number;
  lng: number;
  type: 'CHU' | 'CHR' | 'Centre' | 'Mobile';
}

const centers: Center[] = [
  {
    id: 1,
    name: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Boulevard du 13 Janvier, Lomé',
    phone: '+228 22 21 25 01',
    hours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    distance: '2.3 km',
    lat: 6.1319,
    lng: 1.2223,
    type: 'CHU'
  },
  {
    id: 2,
    name: 'CHU Campus',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Route d\'Aného, Lomé',
    phone: '+228 22 25 58 42',
    hours: 'Lun-Sam: 7h30-18h',
    distance: '4.8 km',
    lat: 6.1633,
    lng: 1.2255,
    type: 'CHU'
  },
  {
    id: 3,
    name: 'CHR Kara',
    city: 'Kara',
    region: 'Kara',
    address: 'Avenue de la Kozah, Kara',
    phone: '+228 26 60 01 45',
    hours: 'Lun-Ven: 8h-16h',
    distance: '420 km',
    lat: 9.5511,
    lng: 1.1864,
    type: 'CHR'
  },
  {
    id: 4,
    name: 'CHR Sokodé',
    city: 'Sokodé',
    region: 'Centrale',
    address: 'Route Nationale 1, Sokodé',
    phone: '+228 25 50 01 23',
    hours: 'Lun-Ven: 8h-16h',
    distance: '340 km',
    lat: 8.9833,
    lng: 1.1333,
    type: 'CHR'
  },
  {
    id: 5,
    name: 'Centre de Transfusion Sanguine',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Rue du Commerce, Lomé',
    phone: '+228 22 21 44 88',
    hours: 'Lun-Ven: 7h-19h, Sam-Dim: 8h-14h',
    distance: '1.5 km',
    lat: 6.1256,
    lng: 1.2116,
    type: 'Centre'
  },
  {
    id: 6,
    name: 'Collecte Mobile - Marché de Tsévié',
    city: 'Tsévié',
    region: 'Maritime',
    address: 'Place du Marché Central',
    phone: '+228 90 12 34 56',
    hours: 'Aujourd\'hui: 9h-15h',
    distance: '32 km',
    lat: 6.4264,
    lng: 1.2139,
    type: 'Mobile'
  }
];

export function Centers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showMap, setShowMap] = useState(true);

  const regions = ['all', 'Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || center.region === selectedRegion;
    const matchesType = selectedType === 'all' || center.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  const getTypeColor = (type: Center['type']) => {
    switch (type) {
      case 'CHU': return 'bg-red-100 text-red-700 border-red-200';
      case 'CHR': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Centre': return 'bg-green-100 text-green-700 border-green-200';
      case 'Mobile': return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const types = ['all', 'CHU', 'CHR', 'Centre', 'Mobile'];

  return (
    <div className="space-y-4 pb-6">
      {/* Toggle Map/List */}
      <div className="flex gap-2 p-2 bg-gray-100 rounded-xl">
        <button
          onClick={() => setShowMap(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
            showMap ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <Map className="w-5 h-5" />
          Carte
        </button>
        <button
          onClick={() => setShowMap(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
            !showMap ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          <MapPin className="w-5 h-5" />
          Liste
        </button>
      </div>

      {/* Interactive Map */}
      {showMap && (
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <InteractiveCentersMap 
            selectedRegion={selectedRegion !== 'all' ? selectedRegion : undefined}
            selectedType={selectedType !== 'all' ? selectedType : undefined}
          />
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un centre ou une ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filters */}
        <div className="space-y-2">
          {/* Region Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedRegion === region
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {region === 'all' ? 'Toutes les régions' : region}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition border-2 ${
                  selectedType === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                {type === 'all' ? 'Tous les types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Centers List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">{filteredCenters.length} centres trouvés</h3>
            <button className="text-sm text-red-600 hover:underline">Trier par distance</button>
          </div>

          {filteredCenters.map(center => (
            <div key={center.id} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{center.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(center.type)}`}>
                      {center.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{center.city} • {center.region}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-blue-600">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">{center.distance}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-900">{center.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a href={`tel:${center.phone}`} className="text-sm text-blue-600 hover:underline">
                    {center.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-900">{center.hours}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Fonctionnalité de prise de rendez-vous à ${center.name} en cours d'implémentation. Utilisez la page Rendez-vous pour réserver.`)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Prendre RDV
                </button>
                <button 
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="flex-1 bg-gray-100 text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-1"
                >
                  <Navigation className="w-4 h-4" />
                  Itinéraire
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">Aucun centre trouvé</p>
            <p className="text-sm text-gray-500 mt-1">Essayez de modifier vos filtres</p>
          </div>
        )}
      </div>
    </div>
  );
}
