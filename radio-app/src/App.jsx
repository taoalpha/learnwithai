import React, { useState, useEffect } from 'react';
import StationList from './components/StationList';
import Player from './components/Player';
import StationView from './components/StationView';
import { radioApi } from './hooks/radioApi';
import { useAudio } from './hooks/useAudio';

function App() {
  const [stations, setStations] = useState([]);
  const [activeStation, setActiveStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'player'
  
  const { isPlaying, error, playStation, togglePlay } = useAudio();

  useEffect(() => {
    const loadStations = async () => {
      setLoading(true);
      const data = await radioApi.getTopStations(30);
      setStations(data);
      setLoading(false);
    };
    loadStations();
  }, []);

  // Play station when activeStation changes
  useEffect(() => {
    if (activeStation) {
      playStation(activeStation);
    }
  }, [activeStation]);

  const handleStationSelect = (station) => {
    setActiveStation(station);
    setCurrentView('player');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  const handleNext = () => {
    if (!activeStation || stations.length === 0) return;
    const currentIndex = stations.findIndex(s => s.stationuuid === activeStation.stationuuid);
    const nextIndex = (currentIndex + 1) % stations.length;
    setActiveStation(stations[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeStation || stations.length === 0) return;
    const currentIndex = stations.findIndex(s => s.stationuuid === activeStation.stationuuid);
    const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
    setActiveStation(stations[prevIndex]);
  };

  // Station View (Full Screen)
  if (currentView === 'player' && activeStation) {
    return (
      <StationView 
        activeStation={activeStation} 
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        onNext={handleNext} 
        onPrev={handlePrev}
        onBack={handleBack}
      />
    );
  }

  // List View (Home)
  return (
    <div className="mobile-container">
      {/* Header */}
      <div style={{ 
        padding: '24px', 
        paddingTop: '40px',
        background: 'linear-gradient(180deg, var(--bg-app) 0%, transparent 100%)',
        zIndex: 10
      }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Welcome back,</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Radio Player</h1>
      </div>

      {/* Scrollable List */}
      <StationList 
        stations={stations} 
        loading={loading}
        onStationSelect={handleStationSelect} 
        activeStation={activeStation} 
      />

      {/* Mini Player (Bottom) */}
      {activeStation && (
        <div onClick={() => setCurrentView('player')} style={{ cursor: 'pointer' }}>
          <Player 
            activeStation={activeStation} 
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            error={error}
            onNext={(e) => { e.stopPropagation(); handleNext(); }} 
            onPrev={(e) => { e.stopPropagation(); handlePrev(); }} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
