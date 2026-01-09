"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
// Leaflet must be imported dynamically in Next.js

import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const OUTBREAKS = [
  { id: 1, lat: -17.8292, lng: 31.0522, intensity: 0.9, city: "Harare", cases: 1420 },
  { id: 2, lat: -20.1367, lng: 28.5818, intensity: 0.7, city: "Bulawayo", cases: 850 },
  { id: 3, lat: -18.9728, lng: 32.6694, intensity: 0.5, city: "Mutare", cases: 520 },
  { id: 4, lat: -19.4580, lng: 29.8166, intensity: 0.4, city: "Gweru", cases: 380 },
  { id: 5, lat: -20.0637, lng: 30.8427, intensity: 0.6, city: "Masvingo", cases: 410 },
];

export function EpidemicMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <Card className="col-span-4 h-[400px] flex items-center justify-center bg-slate-50 border-slate-200 rounded-none">
           <span className="text-slate-500">Loading Map...</span>
        </Card>
    );
  }

  return (
    <Card className="col-span-4 lg:col-span-3 h-100 p-0 overflow-hidden relative rounded-none" noPadding>
      <CardHeader className="absolute top-0 left-0 z-400 bg-white/90 backdrop-blur-md w-full border-b border-slate-200 py-3">
        <CardTitle className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
           Live Outbreak Heatmap (Zimbabwe)
        </CardTitle>
      </CardHeader>
      
      {/* 
         Note: In a real app we'd need to fix the Leaflet icon issue or use custom markers.
         For this demo, CircleMarkers are safer as they don't rely on external images.
      */}
      <MapContainer 
        center={[-19.0154, 29.1549]} 
        zoom={6} 
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        style={{ height: "100%", width: "100%", background: "#f8fafc" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {OUTBREAKS.map((outbreak) => (
          <CircleMarker
            key={outbreak.id}
            center={[outbreak.lat, outbreak.lng]}
            radius={20 * outbreak.intensity}
            pathOptions={{
                color: outbreak.intensity > 0.8 ? "#ef4444" : "#f59e0b",
                fillColor: outbreak.intensity > 0.8 ? "#ef4444" : "#f59e0b",
                fillOpacity: 0.4
            }}
          >
            <Popup className="glass-popup">
              <div className="text-slate-900">
                <strong>{outbreak.city}</strong> <br />
                Acive Cases: {outbreak.cases} <br />
                Risk: {outbreak.intensity > 0.8 ? "Critical" : "Elevated"}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Card>
  );
}
