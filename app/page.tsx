'use client';

import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';
import { Upload, TrendingUp, AlertTriangle, Activity, Calendar, Users, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import dynamic from 'next/dynamic';

// Dynamically import map components (client-side only)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Zimbabwe provinces with coordinates
const ZIMBABWE_PROVINCES = {
  'Harare': { lat: -17.8252, lng: 31.0335, name: 'Harare' },
  'Bulawayo': { lat: -20.1594, lng: 28.5833, name: 'Bulawayo' },
  'Manicaland': { lat: -18.9167, lng: 32.6667, name: 'Manicaland' },
  'Mashonaland Central': { lat: -16.7667, lng: 31.1167, name: 'Mashonaland Central' },
  'Mashonaland East': { lat: -18.0000, lng: 31.5000, name: 'Mashonaland East' },
  'Mashonaland West': { lat: -17.4500, lng: 29.8167, name: 'Mashonaland West' },
  'Masvingo': { lat: -20.0667, lng: 30.8333, name: 'Masvingo' },
  'Matabeleland North': { lat: -18.5000, lng: 27.5000, name: 'Matabeleland North' },
  'Matabeleland South': { lat: -21.0000, lng: 29.0000, name: 'Matabeleland South' },
  'Midlands': { lat: -19.4500, lng: 29.8167, name: 'Midlands' }
};

export default function InfluenzaPredictor() {
  const [data, setData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
    initializeModel();
  }, []);

  const initializeModel = async () => {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [7], units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' })
      ]
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    setModel(model);
  };

  const processCSV = (file) => {
    setLoading(true);
    
    Papa.parse(file, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: async (results) => {
        try {
          console.log('Parsed data:', results.data.slice(0, 5));
          
          const records = results.data.filter(row => {
            if (!row.date || !row.cases) return false;
            const date = new Date(row.date);
            if (isNaN(date.getTime())) return false;
            return true;
          }).map(row => ({
            ...row,
            cases: Number(row.cases) || 0,
            location: row.location || row.province || 'Unknown'
          }));
          
          console.log('Valid records:', records.length);
          
          if (records.length === 0) {
            alert('No valid data found. Please ensure CSV has "date" and "cases" columns with valid values.');
            setLoading(false);
            return;
          }

          records.sort((a, b) => new Date(a.date) - new Date(b.date));
          setData(records);

          const weekly = aggregateWeekly(records);
          console.log('Weekly data:', weekly);
          setWeeklyData(weekly);

          const locationStats = aggregateByLocation(records);
          console.log('Location stats:', locationStats);
          setLocationData(locationStats);

          if (model && weekly.length >= 4) {
            await trainAndPredict(weekly);
          }

          const risk = calculateRisk(weekly);
          setRiskAssessment(risk);

        } catch (error) {
          console.error('Error processing data:', error);
          alert('Error processing data: ' + error.message);
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        console.error('Parse error:', error);
        alert('Error parsing CSV: ' + error.message);
        setLoading(false);
      }
    });
  };

  const aggregateWeekly = (records) => {
    const weeklyMap = {};
    
    records.forEach(record => {
      let date = new Date(record.date);
      
      if (isNaN(date.getTime())) {
        const parts = record.date.split('-');
        if (parts.length === 3) {
          date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
      }
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', record.date);
        return;
      }
      
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = { date: weekKey, cases: 0, count: 0 };
      }
      weeklyMap[weekKey].cases += Number(record.cases) || 0;
      weeklyMap[weekKey].count += 1;
    });

    return Object.values(weeklyMap).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };

  const aggregateByLocation = (records) => {
    const locationMap = {};
    
    records.forEach(record => {
      const location = record.location || 'Unknown';
      if (!locationMap[location]) {
        locationMap[location] = {
          location,
          totalCases: 0,
          recentCases: 0,
          growthRate: 0,
          coordinates: ZIMBABWE_PROVINCES[location] || null
        };
      }
      locationMap[location].totalCases += Number(record.cases) || 0;
    });

    // Calculate recent cases (last 2 weeks) and growth rate
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const recentRecords = records.filter(r => new Date(r.date) >= twoWeeksAgo);
    const olderRecords = records.filter(r => new Date(r.date) < twoWeeksAgo);

    Object.keys(locationMap).forEach(location => {
      const recent = recentRecords.filter(r => r.location === location)
        .reduce((sum, r) => sum + Number(r.cases), 0);
      const older = olderRecords.filter(r => r.location === location)
        .reduce((sum, r) => sum + Number(r.cases), 0);
      
      locationMap[location].recentCases = recent;
      locationMap[location].growthRate = older > 0 ? ((recent - older) / older * 100) : 0;
    });

    return Object.values(locationMap).filter(loc => loc.coordinates);
  };

  const trainAndPredict = async (weekly) => {
    const sequenceLength = 7;
    const cases = weekly.map(w => w.cases);

    const max = Math.max(...cases);
    const min = Math.min(...cases);
    const normalized = cases.map(c => (c - min) / (max - min));

    const X = [];
    const y = [];

    for (let i = sequenceLength; i < normalized.length; i++) {
      X.push(normalized.slice(i - sequenceLength, i));
      y.push(normalized[i]);
    }

    if (X.length === 0) {
      console.log('Not enough data for training');
      return;
    }

    const xs = tf.tensor2d(X);
    const ys = tf.tensor2d(y, [y.length, 1]);

    await model.fit(xs, ys, {
      epochs: 50,
      batchSize: 4,
      verbose: 0,
      shuffle: true
    });

    const predictionsArray = [];
    let lastSequence = normalized.slice(-sequenceLength);

    for (let i = 0; i < 4; i++) {
      const input = tf.tensor2d([lastSequence]);
      const pred = model.predict(input);
      const predValue = await pred.data();
      const denormalized = predValue[0] * (max - min) + min;
      
      const lastDate = new Date(weekly[weekly.length - 1].date);
      lastDate.setDate(lastDate.getDate() + (i + 1) * 7);
      
      predictionsArray.push({
        date: lastDate.toISOString().split('T')[0],
        cases: Math.round(denormalized),
        isPrediction: true
      });

      lastSequence = [...lastSequence.slice(1), predValue[0]];
      
      pred.dispose();
      input.dispose();
    }

    xs.dispose();
    ys.dispose();

    setPredictions(predictionsArray);
  };

  const calculateRisk = (weekly) => {
    if (weekly.length < 4) return null;

    const recent = weekly.slice(-4);
    const older = weekly.slice(0, Math.floor(weekly.length / 2));

    let growthRate = 0;
    for (let i = 1; i < recent.length; i++) {
      const rate = (recent[i].cases - recent[i - 1].cases) / (recent[i - 1].cases || 1);
      growthRate += rate;
    }
    growthRate /= (recent.length - 1);

    const baseline = older.reduce((sum, w) => sum + w.cases, 0) / older.length;
    const currentAvg = recent.reduce((sum, w) => sum + w.cases, 0) / recent.length;
    const threshold = currentAvg / baseline;

    let risk = 'low';
    let confidence = 0;

    if (growthRate > 0.3 && threshold > 2) {
      risk = 'high';
      confidence = Math.min(95, 70 + growthRate * 50);
    } else if (growthRate > 0.15 || threshold > 1.5) {
      risk = 'medium';
      confidence = Math.min(85, 50 + growthRate * 100);
    } else {
      risk = 'low';
      confidence = Math.min(75, 40 + Math.abs(growthRate) * 50);
    }

    return {
      risk,
      confidence: Math.round(confidence),
      growthRate: (growthRate * 100).toFixed(1),
      baseline: Math.round(baseline),
      current: Math.round(currentAvg),
      threshold: threshold.toFixed(2),
      totalCases: weekly.reduce((sum, w) => sum + w.cases, 0)
    };
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const getMarkerColor = (growthRate, totalCases) => {
    if (growthRate > 30 || totalCases > 1000) return '#ef4444'; // red
    if (growthRate > 15 || totalCases > 500) return '#f59e0b'; // orange
    return '#10b981'; // green
  };

  const getMarkerSize = (totalCases) => {
    if (totalCases > 2000) return 25;
    if (totalCases > 1000) return 20;
    if (totalCases > 500) return 15;
    return 10;
  };

  const combinedChartData = [
    ...weeklyData.map(d => ({ ...d, isPrediction: false })),
    ...predictions
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Influenza Outbreak Predictor - Zimbabwe
              </h1>
              <p className="text-gray-600">AI-powered outbreak detection with geographic mapping</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
              disabled={loading}
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Upload Influenza Cases CSV
              </p>
              <p className="text-sm text-gray-500">
                Required columns: date, cases, location (province)
              </p>
            </label>
          </div>

          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Training AI model and analyzing data...</p>
            </div>
          )}
        </div>

        {/* Risk Assessment */}
        {riskAssessment && (
          <div className={`bg-white rounded-2xl shadow-xl p-8 mb-6 border-l-8 ${
            riskAssessment.risk === 'high' ? 'border-red-500' :
            riskAssessment.risk === 'medium' ? 'border-orange-500' :
            'border-green-500'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Risk Assessment
                </h2>
                <p className="text-gray-600">
                  Analyzed {data.length} records across {weeklyData.length} weeks
                </p>
              </div>
              <AlertTriangle className={`w-12 h-12 ${
                riskAssessment.risk === 'high' ? 'text-red-500' :
                riskAssessment.risk === 'medium' ? 'text-orange-500' :
                'text-green-500'
              }`} />
            </div>

            <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold border-2 mb-6 ${
              getRiskColor(riskAssessment.risk)
            }`}>
              {riskAssessment.risk.toUpperCase()} RISK - {riskAssessment.confidence}% Confidence
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm text-gray-600 font-medium">Total Cases</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{riskAssessment.totalCases}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm text-gray-600 font-medium">Growth Rate</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{riskAssessment.growthRate}%</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm text-gray-600 font-medium">Baseline Avg</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{riskAssessment.baseline}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm text-gray-600 font-medium">Current Avg</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{riskAssessment.current}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Analysis Summary</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Current cases are <strong>{riskAssessment.threshold}x</strong> the baseline</li>
                <li>• Weekly growth rate: <strong>{riskAssessment.growthRate}%</strong></li>
                {riskAssessment.risk === 'high' && (
                  <li>• ⚠️ Rapid increase detected - immediate intervention recommended</li>
                )}
                {riskAssessment.risk === 'medium' && (
                  <li>• ⚡ Elevated activity - enhanced monitoring advised</li>
                )}
                {riskAssessment.risk === 'low' && (
                  <li>• ✓ Normal range - continue routine surveillance</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Outbreak Map */}
        {locationData.length > 0 && mapReady && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Geographic Distribution - Zimbabwe Provinces
              </h3>
            </div>
            
            <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200">
              <MapContainer
                center={[-19.0154, 29.1549]}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locationData.map((loc, idx) => (
                  loc.coordinates && (
                    <CircleMarker
                      key={idx}
                      center={[loc.coordinates.lat, loc.coordinates.lng]}
                      radius={getMarkerSize(loc.totalCases)}
                      fillColor={getMarkerColor(loc.growthRate, loc.totalCases)}
                      color="#fff"
                      weight={2}
                      opacity={1}
                      fillOpacity={0.7}
                    >
                      <Popup>
                        <div className="p-2">
                          <h4 className="font-bold text-lg mb-1">{loc.location}</h4>
                          <p className="text-sm"><strong>Total Cases:</strong> {loc.totalCases}</p>
                          <p className="text-sm"><strong>Recent Cases:</strong> {loc.recentCases}</p>
                          <p className="text-sm"><strong>Growth Rate:</strong> {loc.growthRate.toFixed(1)}%</p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  )
                ))}
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>High Risk</span>
              </div>
            </div>

            {/* Location Stats Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Province</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Cases</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Recent Cases</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Growth Rate</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {locationData.sort((a, b) => b.totalCases - a.totalCases).map((loc, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{loc.location}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{loc.totalCases}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{loc.recentCases}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{loc.growthRate.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          loc.growthRate > 30 ? 'bg-red-100 text-red-800' :
                          loc.growthRate > 15 ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {loc.growthRate > 30 ? 'High' : loc.growthRate > 15 ? 'Medium' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Charts */}
        {weeklyData.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {/* Historical + Predictions Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Weekly Cases & AI Predictions
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={combinedChartData}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) => [
                      Math.round(value), 
                      name === 'cases' ? 'Cases' : 'Predicted Cases'
                    ]}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#6366f1" 
                    fill="url(#colorCases)"
                    name="Actual Cases"
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              {predictions.length > 0 && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900 font-semibold mb-2">
                    🤖 AI Predictions for Next 4 Weeks:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {predictions.map((pred, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600">
                          {new Date(pred.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-lg font-bold text-gray-900">{pred.cases} cases</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Daily Cases Bar Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Daily Case Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Bar dataKey="cases" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      `}</style>
    </div>
  );
}