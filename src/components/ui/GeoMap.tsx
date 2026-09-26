import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { GeoLocation } from '../../types';
import { Globe, MapPin } from 'lucide-react';

// Custom blue/red pin icon for Leaflet light theme
const createCustomIcon = (isHighRisk = true) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="relative inline-flex rounded-full h-4 w-4 ${isHighRisk ? 'bg-red-600' : 'bg-blue-600'} border-2 border-white shadow-md"></span>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

interface GeoMapProps {
  location: GeoLocation;
  height?: string;
  zoom?: number;
}

export const GeoMap: React.FC<GeoMapProps> = ({ location, height = '320px', zoom = 4 }) => {
  const position: [number, number] = [location.latitude || 50.1109, location.longitude || 8.6821];

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
      {/* Required Approximate IP Geolocation Disclaimer tag */}
      <div className="absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-md bg-white/90 border border-slate-200 text-[11px] font-sans text-slate-700 backdrop-blur-sm flex items-center gap-1.5 shadow-xs">
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-medium">Approximate IP-based location</span>
      </div>

      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#F8FAFC' }}
        >
          {/* Light OpenStreetMap base tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={createCustomIcon(true)}>
            <Popup className="soc-custom-popup">
              <div className="p-1 font-sans text-xs bg-white text-slate-900 rounded space-y-1">
                <div className="font-bold text-red-700 font-mono">SOURCE LOCATION</div>
                <div>IP Address: <span className="font-mono text-slate-900 font-semibold">{location.ip}</span></div>
                <div>Location: <span className="text-slate-800">{location.city}, {location.country}</span></div>
                <div>ISP: <span className="text-slate-600">{location.isp}</span></div>
                <div>ASN: <span className="font-mono text-slate-500">{location.asn}</span></div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Location Details Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Location</span>
          <span className="text-slate-900 font-semibold">{location.city}, {location.country} ({location.countryCode})</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">ISP / Network</span>
          <span className="text-slate-700 truncate block">{location.isp}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Coordinates</span>
          <span className="text-slate-700 font-mono">{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Timezone</span>
          <span className="text-slate-700">{location.timezone}</span>
        </div>
      </div>
    </div>
  );
};
