import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';

interface MapSelectorProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

export function MapSelector({ latitude, longitude, onLocationChange }: MapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Charger Leaflet dynamiquement
  useEffect(() => {
    // Ajouter le CSS de Leaflet
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Charger le script Leaflet
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

  // Initialiser la carte
  useEffect(() => {
    if (!loading && !error && mapRef.current && !map && window.L) {
      try {
        // Créer la carte
        const newMap = window.L.map(mapRef.current).setView([latitude, longitude], 13);

        // Ajouter les tuiles OpenStreetMap
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19
        }).addTo(newMap);

        // Créer une icône personnalisée
        const customIcon = window.L.divIcon({
          html: `<div style="background-color: #dc2626; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-center;">
            <svg style="width: 16px; height: 16px; transform: rotate(45deg); color: white;" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
          </div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        // Ajouter le marqueur initial
        const newMarker = window.L.marker([latitude, longitude], {
          icon: customIcon,
          draggable: true
        }).addTo(newMap);

        newMarker.bindPopup('<b>Votre position</b><br>Faites glisser pour ajuster').openPopup();

        // Événement de déplacement du marqueur
        newMarker.on('dragend', (e: any) => {
          const position = e.target.getLatLng();
          onLocationChange(position.lat, position.lng);
          newMap.setView(position, newMap.getZoom());
        });

        // Événement de clic sur la carte
        newMap.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          newMarker.setLatLng([lat, lng]);
          onLocationChange(lat, lng);
          newMarker.openPopup();
        });

        setMap(newMap);
        setMarker(newMarker);
      } catch (err) {
        console.error('Erreur initialisation carte:', err);
        setError('Erreur lors de l\'initialisation de la carte');
      }
    }
  }, [loading, error, map, latitude, longitude]);

  // Mettre à jour la position du marqueur si les props changent
  useEffect(() => {
    if (marker && map) {
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude]);
    }
  }, [latitude, longitude, marker, map]);

  // Obtenir la localisation de l'utilisateur
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setUserLocation({ lat, lng });
          onLocationChange(lat, lng);
          if (map && marker) {
            marker.setLatLng([lat, lng]);
            map.setView([lat, lng], 15);
            marker.openPopup();
          }
          setLoading(false);
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
          setLoading(false);
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

  // Rechercher une adresse (version simplifiée)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Utiliser Nominatim (API de géocodage d'OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery + ', Togo')}&format=json&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);
        
        onLocationChange(newLat, newLng);
        if (map && marker) {
          marker.setLatLng([newLat, newLng]);
          map.setView([newLat, newLng], 15);
          marker.openPopup();
        }
      } else {
        alert('Adresse non trouvée. Veuillez réessayer avec une adresse plus précise.');
      }
    } catch (err) {
      console.error('Erreur recherche:', err);
      alert('Erreur lors de la recherche de l\'adresse');
    } finally {
      setSearching(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-800">{error}</p>
        <p className="text-sm text-red-600 mt-2">La carte ne peut pas être chargée pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Barre de recherche et bouton de géolocalisation */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
            placeholder="Rechercher une adresse au Togo..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="button"
          onClick={searchLocation}
          disabled={searching || !searchQuery.trim()}
          className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {searching ? <Loader className="w-5 h-5 animate-spin" /> : 'Rechercher'}
        </button>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
          title="Ma position actuelle"
        >
          <Navigation className="w-5 h-5" />
        </button>
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
          className="w-full h-80 rounded-xl border-2 border-gray-300 shadow-inner"
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900 mb-1">💡 Comment utiliser la carte :</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>Cliquez</strong> sur la carte pour placer le marqueur</li>
          <li>• <strong>Faites glisser</strong> le marqueur pour ajuster la position</li>
          <li>• <strong>Recherchez</strong> une adresse dans la barre ci-dessus</li>
          <li>• <strong>Utilisez</strong> le bouton GPS pour votre position actuelle</li>
        </ul>
      </div>

      {/* Coordonnées actuelles */}
      <div className="text-xs text-gray-600 text-center">
        Position : {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </div>
    </div>
  );
}
