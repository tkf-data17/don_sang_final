import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Loader, X, ChevronRight, ExternalLink } from 'lucide-react';

interface Center {
  id: number;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  type: 'CHU' | 'CHR' | 'Centre' | 'Mobile';
  distance?: number; // en km
}

// VRAIS CENTRES DE COLLECTE DU TOGO (coordonnées GPS réelles)
const CENTERS: Center[] = [
  // LOMÉ - RÉGION MARITIME
  {
    id: 1,
    name: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Boulevard du 13 Janvier, Lomé',
    phone: '+228 22 21 25 01',
    hours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    lat: 6.1319,
    lng: 1.2223,
    type: 'CHU'
  },
  {
    id: 2,
    name: 'CHU Campus (Tokoin)',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Route d\'Aného, Tokoin, Lomé',
    phone: '+228 22 25 58 42',
    hours: 'Lun-Sam: 7h30-18h',
    lat: 6.1633,
    lng: 1.2255,
    type: 'CHU'
  },
  {
    id: 3,
    name: 'Centre National de Transfusion Sanguine (CNTS)',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Rue du Commerce, Lomé',
    phone: '+228 22 21 44 88',
    hours: 'Lun-Ven: 7h-19h, Sam-Dim: 8h-14h',
    lat: 6.1256,
    lng: 1.2116,
    type: 'Centre'
  },
  {
    id: 4,
    name: 'Hôpital Régional de Tsévié',
    city: 'Tsévié',
    region: 'Maritime',
    address: 'Route Nationale 1, Tsévié',
    phone: '+228 25 31 03 45',
    hours: 'Lun-Ven: 8h-16h',
    lat: 6.4264,
    lng: 1.2139,
    type: 'Centre'
  },
  {
    id: 5,
    name: 'Hôpital d\'Aného',
    city: 'Aného',
    region: 'Maritime',
    address: 'Centre-ville, Aného',
    phone: '+228 23 30 01 23',
    hours: 'Lun-Ven: 8h-15h',
    lat: 6.2311,
    lng: 1.5925,
    type: 'Centre'
  },

  // RÉGION PLATEAUX
  {
    id: 6,
    name: 'CHR Atakpamé',
    city: 'Atakpamé',
    region: 'Plateaux',
    address: 'Route de Kpalimé, Atakpamé',
    phone: '+228 24 40 01 56',
    hours: 'Lun-Ven: 8h-16h',
    lat: 7.5333,
    lng: 1.1167,
    type: 'CHR'
  },
  {
    id: 7,
    name: 'Hôpital de Kpalimé',
    city: 'Kpalimé',
    region: 'Plateaux',
    address: 'Avenue de la République, Kpalimé',
    phone: '+228 24 41 01 67',
    hours: 'Lun-Ven: 8h-16h',
    lat: 6.9000,
    lng: 0.6333,
    type: 'Centre'
  },
  {
    id: 8,
    name: 'Hôpital de Notsé',
    city: 'Notsé',
    region: 'Plateaux',
    address: 'Centre-ville, Notsé',
    phone: '+228 24 42 01 89',
    hours: 'Lun-Ven: 8h-15h',
    lat: 6.9500,
    lng: 1.1667,
    type: 'Centre'
  },

  // RÉGION CENTRALE
  {
    id: 9,
    name: 'CHR Sokodé',
    city: 'Sokodé',
    region: 'Centrale',
    address: 'Route Nationale 1, Sokodé',
    phone: '+228 25 50 01 23',
    hours: 'Lun-Ven: 8h-16h',
    lat: 8.9833,
    lng: 1.1333,
    type: 'CHR'
  },
  {
    id: 10,
    name: 'Hôpital de Tchamba',
    city: 'Tchamba',
    region: 'Centrale',
    address: 'Centre-ville, Tchamba',
    phone: '+228 25 51 01 34',
    hours: 'Lun-Ven: 8h-15h',
    lat: 9.0333,
    lng: 1.4167,
    type: 'Centre'
  },

  // RÉGION KARA
  {
    id: 11,
    name: 'CHR Kara',
    city: 'Kara',
    region: 'Kara',
    address: 'Avenue de la Kozah, Kara',
    phone: '+228 26 60 01 45',
    hours: 'Lun-Ven: 8h-16h',
    lat: 9.5511,
    lng: 1.1864,
    type: 'CHR'
  },
  {
    id: 12,
    name: 'Hôpital de Bassar',
    city: 'Bassar',
    region: 'Kara',
    address: 'Route de Kara, Bassar',
    phone: '+228 26 61 01 56',
    hours: 'Lun-Ven: 8h-15h',
    lat: 9.2500,
    lng: 0.7833,
    type: 'Centre'
  },

  // RÉGION SAVANES
  {
    id: 13,
    name: 'CHR Dapaong',
    city: 'Dapaong',
    region: 'Savanes',
    address: 'Route de Cinkassé, Dapaong',
    phone: '+228 27 70 01 78',
    hours: 'Lun-Ven: 8h-16h',
    lat: 10.8667,
    lng: 0.2000,
    type: 'CHR'
  },
  {
    id: 14,
    name: 'Hôpital de Mango',
    city: 'Mango',
    region: 'Savanes',
    address: 'Centre-ville, Mango',
    phone: '+228 27 71 01 89',
    hours: 'Lun-Ven: 8h-15h',
    lat: 10.3592,
    lng: 0.4711,
    type: 'Centre'
  },

  // COLLECTES MOBILES (coordonnées variables)
  {
    id: 15,
    name: 'Collecte Mobile - Université de Lomé',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Campus universitaire, Lomé',
    phone: '+228 90 12 34 56',
    hours: 'Vendredi 28/11: 9h-16h',
    lat: 6.1683,
    lng: 1.2100,
    type: 'Mobile'
  }
];

interface InteractiveCentersMapProps {
  userLocation?: { lat: number; lng: number };
  selectedRegion?: string;
  selectedType?: string;
}

export function InteractiveCentersMap({ userLocation, selectedRegion, selectedType }: InteractiveCentersMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [centersWithDistance, setCentersWithDistance] = useState<Center[]>(CENTERS);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<{ lat: number; lng: number } | null>(
    userLocation || null
  );

  // Calculer la distance entre deux points (formule Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Mettre à jour les distances si la position de l'utilisateur change
  useEffect(() => {
    if (currentUserLocation) {
      const centersWithDist = CENTERS.map(center => ({
        ...center,
        distance: calculateDistance(
          currentUserLocation.lat,
          currentUserLocation.lng,
          center.lat,
          center.lng
        )
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      setCentersWithDistance(centersWithDist);
    } else {
      setCentersWithDistance(CENTERS);
    }
  }, [currentUserLocation]);

  // Obtenir la localisation de l'utilisateur
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setCurrentUserLocation(newLocation);
          
          if (map && userMarker) {
            userMarker.setLatLng([latitude, longitude]);
            map.setView([latitude, longitude], 12);
          } else if (map) {
            addUserMarker(latitude, longitude);
            map.setView([latitude, longitude], 12);
          }
          
          setGettingLocation(false);
        },
        (err) => {
          console.error('Erreur géolocalisation:', err.message, err.code);
          
          let errorMessage = 'Impossible d\'obtenir votre position. ';
          
          switch(err.code) {
            case err.PERMISSION_DENIED:
              errorMessage += 'Veuillez autoriser l\'accès à votre localisation dans les paramètres de votre navigateur.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage += 'Position indisponible. Vérifiez votre connexion GPS.';
              break;
            case err.TIMEOUT:
              errorMessage += 'La demande de localisation a expiré. Réessayez.';
              break;
            default:
              errorMessage += 'Une erreur inconnue s\'est produite.';
          }
          
          alert(errorMessage);
          setGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  };

  // Charger Leaflet
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        setLoading(false);
      };
      script.onerror = () => {
        setError('Impossible de charger la carte');
        setLoading(false);
      };
      document.body.appendChild(script);
    } else {
      setLoading(false);
    }
  }, []);

  // Ajouter marqueur utilisateur
  const addUserMarker = (lat: number, lng: number) => {
    if (!window.L || !map) return;

    const userIcon = window.L.divIcon({
      html: `<div style="background-color: #2563eb; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = window.L.marker([lat, lng], { icon: userIcon }).addTo(map);
    marker.bindPopup('<b>Votre position</b>');
    setUserMarker(marker);
  };

  // Initialiser la carte
  useEffect(() => {
    if (!loading && !error && mapRef.current && !map && window.L) {
      try {
        // Centre par défaut: Lomé
        const defaultCenter: [number, number] = currentUserLocation 
          ? [currentUserLocation.lat, currentUserLocation.lng]
          : [6.1319, 1.2223];
        
        const newMap = window.L.map(mapRef.current).setView(defaultCenter, 8);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19
        }).addTo(newMap);

        setMap(newMap);

        // Ajouter marqueur utilisateur si position connue
        if (currentUserLocation) {
          addUserMarker(currentUserLocation.lat, currentUserLocation.lng);
        }
      } catch (err) {
        console.error('Erreur initialisation carte:', err);
        setError('Erreur lors de l\'initialisation de la carte');
      }
    }
  }, [loading, error, map, currentUserLocation]);

  // Ajouter les marqueurs des centres
  useEffect(() => {
    if (!map || !window.L) return;

    // Supprimer anciens marqueurs
    markers.forEach(marker => map.removeLayer(marker));

    // Filtrer les centres
    let filtered = centersWithDistance;
    if (selectedRegion) {
      filtered = filtered.filter(c => c.region === selectedRegion);
    }
    if (selectedType) {
      filtered = filtered.filter(c => c.type === selectedType);
    }

    // Créer les marqueurs
    const newMarkers = filtered.map(center => {
      // Couleur selon type
      const color = 
        center.type === 'CHU' ? '#dc2626' :
        center.type === 'CHR' ? '#ea580c' :
        center.type === 'Mobile' ? '#7c3aed' :
        '#059669';

      const markerIcon = window.L.divIcon({
        html: `
          <div style="position: relative;">
            <div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
              <svg style="width: 16px; height: 16px; transform: rotate(45deg); color: white;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            ${center.distance !== undefined ? `
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ${center.distance.toFixed(1)} km
              </div>
            ` : ''}
          </div>
        `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = window.L.marker([center.lat, center.lng], { icon: markerIcon }).addTo(map);

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${center.name}</h3>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Type:</strong> ${center.type}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Ville:</strong> ${center.city}</p>
          ${center.distance !== undefined ? `
            <p style="margin: 4px 0; font-size: 12px; color: #2563eb;"><strong>Distance:</strong> ${center.distance.toFixed(1)} km</p>
          ` : ''}
          <button 
            onclick="window.selectCenter(${center.id})" 
            style="margin-top: 8px; width: 100%; background: #dc2626; color: white; padding: 6px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;"
          >
            Voir les détails
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedCenter(center);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fonction globale pour sélectionner un centre
    (window as any).selectCenter = (id: number) => {
      const center = CENTERS.find(c => c.id === id);
      if (center) {
        setSelectedCenter(center);
      }
    };

    // Ajuster la vue pour montrer tous les marqueurs
    if (newMarkers.length > 0) {
      const group = window.L.featureGroup(newMarkers);
      if (currentUserLocation && userMarker) {
        group.addLayer(userMarker);
      }
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      (window as any).selectCenter = undefined;
    };
  }, [map, centersWithDistance, selectedRegion, selectedType, currentUserLocation, userMarker]);

  // Navigation GPS
  const navigateToCenter = (center: Center) => {
    if (currentUserLocation) {
      // Google Maps avec itinéraire
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentUserLocation.lat},${currentUserLocation.lng}&destination=${center.lat},${center.lng}&travelmode=driving`;
      window.open(url, '_blank');
    } else {
      // Juste ouvrir Google Maps au centre
      const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
      window.open(url, '_blank');
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre d'actions */}
      <div className="flex gap-2 items-center">
        <button
          onClick={getUserLocation}
          disabled={gettingLocation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {gettingLocation ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Navigation className="w-5 h-5" />
          )}
          Ma position
        </button>

        {currentUserLocation && (
          <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
            ✓ Position activée
          </div>
        )}
      </div>

      {/* Carte */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-xl">
            <div className="text-center">
              <Loader className="w-8 h-8 text-red-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-xl border-2 border-gray-300 shadow-lg"
          style={{ zIndex: 0 }}
        />

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-[1000]">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Légende</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span>CHU (Centre Hospitalier Universitaire)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-600"></div>
              <span>CHR (Centre Hospitalier Régional)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <span>Centre de collecte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <span>Collecte mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span>Votre position</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal détails centre */}
      {selectedCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`p-6 ${
              selectedCenter.type === 'CHU' ? 'bg-red-600' :
              selectedCenter.type === 'CHR' ? 'bg-orange-600' :
              selectedCenter.type === 'Mobile' ? 'bg-purple-600' :
              'bg-green-600'
            } text-white rounded-t-2xl`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm mb-2">
                    {selectedCenter.type}
                  </div>
                  <h3 className="text-xl mb-1">{selectedCenter.name}</h3>
                  <p className="text-white text-opacity-90">{selectedCenter.city}, {selectedCenter.region}</p>
                </div>
                <button
                  onClick={() => setSelectedCenter(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {selectedCenter.distance !== undefined && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Distance depuis votre position</p>
                      <p className="text-2xl font-bold text-blue-900">{selectedCenter.distance.toFixed(1)} km</p>
                    </div>
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">Adresse</p>
                    <p className="text-gray-900">{selectedCenter.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">Téléphone</p>
                    <a href={`tel:${selectedCenter.phone}`} className="text-blue-600 hover:underline">
                      {selectedCenter.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">Horaires</p>
                    <p className="text-gray-900">{selectedCenter.hours}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <a
                  href={`tel:${selectedCenter.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  <Phone className="w-5 h-5" />
                  Appeler
                </a>
                <button
                  onClick={() => navigateToCenter(selectedCenter)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  <Navigation className="w-5 h-5" />
                  Itinéraire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des centres à proximité */}
      {currentUserLocation && centersWithDistance.filter(c => c.distance !== undefined).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Centres les plus proches
          </h3>
          <div className="space-y-2">
            {centersWithDistance
              .filter(c => c.distance !== undefined)
              .slice(0, 5)
              .map(center => (
                <button
                  key={center.id}
                  onClick={() => {
                    setSelectedCenter(center);
                    if (map) {
                      map.setView([center.lat, center.lng], 14);
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-left"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{center.name}</p>
                    <p className="text-xs text-gray-800">{center.city}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-600">{center.distance?.toFixed(1)} km</p>
                      <p className="text-xs text-gray-700">{center.type}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
