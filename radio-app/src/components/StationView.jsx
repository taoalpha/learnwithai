import React from 'react';
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Heart, MoreVertical, Volume2 } from 'lucide-react';

const StationView = ({ activeStation, isPlaying, togglePlay, onNext, onPrev, onBack }) => {
  if (!activeStation) return null;

  return (
    <div className="mobile-container" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button className="btn-icon" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <span style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px' }}>NOW PLAYING</span>
        <button className="btn-icon">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Visualizer Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {/* Simulated Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '120px', marginBottom: '40px' }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: `${Math.random() * 100 + 20}%`,
              background: 'var(--primary)',
              borderRadius: '3px',
              opacity: isPlaying ? 1 : 0.3,
              transition: 'height 0.2s ease'
            }}></div>
          ))}
        </div>

        {/* Frequency Display */}
        <h1 style={{ fontSize: '4rem', fontWeight: '700', lineHeight: 1, marginBottom: '10px' }}>
          {activeStation.bitrate ? activeStation.bitrate : '90.1'}
          <span style={{ fontSize: '1.5rem', fontWeight: '400', marginLeft: '8px' }}>MHz</span>
        </h1>
      </div>

      {/* Station Info */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
          <div>
            <h2 className="text-truncate" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{activeStation.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{activeStation.country || 'Live Radio'}</p>
          </div>
          <button className="btn-icon" style={{ color: 'var(--primary)' }}>
            <Heart size={28} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '40px' }}>
        {/* Progress Bar (Visual) */}
        <div style={{ 
          height: '4px', 
          background: 'var(--border-subtle)', 
          borderRadius: '2px', 
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{ 
            width: '45%', 
            height: '100%', 
            background: 'var(--primary)', 
            borderRadius: '2px',
            boxShadow: '0 0 10px var(--primary)'
          }}></div>
          <div style={{
            position: 'absolute',
            left: '45%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '12px',
            height: '12px',
            background: '#fff',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
           <button className="btn-icon" style={{ opacity: 0.5 }}>
             <Volume2 size={24} />
           </button>

           <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
             <button className="btn-icon" onClick={onPrev}>
               <SkipBack size={32} />
             </button>
             
             <button onClick={togglePlay} style={{
               width: '80px',
               height: '80px',
               borderRadius: '50%',
               background: 'var(--primary)',
               border: 'none',
               color: '#fff',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: 'pointer',
               boxShadow: '0 8px 24px var(--primary-glow)'
             }}>
               {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />}
             </button>
             
             <button className="btn-icon" onClick={onNext}>
               <SkipForward size={32} />
             </button>
           </div>

           <button className="btn-icon" style={{ opacity: 0.5 }}>
             <MoreVertical size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default StationView;
