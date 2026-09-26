import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { GeoLocation } from '../../types';
import { MapPin, Globe } from 'lucide-react';

// Custom dark red marker icon for Leaflet
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-slate-900 shadow-lg shadow-red-500/50"></span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

interface GeoMapProps {
  location: GeoLocation;
  height?: string;
  zoom?: number;
}

export const GeoMap: React.FC<GeoMapProps> = ({ location, height = '300px', zoom = 4 }) => {
  const position: [number, number] = [location.latitude || 50.1109, location.longitude || 8.6821];

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
      {/* Disclaimer tag */}
      <div className="absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
        <Globe className="w-3.5 h-3.5 text-blue-400" />
        <span>Approximate IP Geolocation</span>
      </div>

      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#090D16' }}
        >
          {/* Dark map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={createCustomIcon()}>
            <Popup className="soc-custom-popup">
              <div className="p-1 font-sans text-xs bg-slate-900 text-slate-100 rounded">
                <div className="font-bold text-red-400 font-mono mb-1">THREAT SOURCE IP</div>
                <div>IP: <span className="font-mono text-white">{location.ip}</span></div>
                <div>Location: <span className="text-slate-200">{location.city}, {location.country}</span></div>
                <div>ISP: <span className="text-slate-300">{location.isp}</span></div>
                <div>ASN: <span className="font-mono text-slate-400">{location.asn}</span></div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Geolocation Details Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div>
          <span className="text-slate-500 block text-[10px]">COUNTRY / CITY</span>
          <span className="text-slate-200 font-semibold">{location.city}, {location.country} ({location.countryCode})</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">ISP / ASN</span>
          <span className="text-slate-300 truncate block">{location.isp}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">COORDINATES</span>
          <span className="text-slate-300">{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">TIMEZONE</span>
          <span className="text-slate-300">{location.timezone}</span>
        </div>
      </div>
    </div>
  );
};
