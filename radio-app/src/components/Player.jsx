import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const Player = ({ activeStation, isPlaying, togglePlay, onNext, onPrev, error }) => {
  if (!activeStation) return null;

  return (
    <div style={{
      background: 'var(--bg-player)',
      padding: '20px 24px',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      {/* Progress Line (Visual) */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'var(--border-subtle)'
      }}>
        <div style={{
          width: '30%', // Simulated progress
          height: '100%',
          background: 'var(--primary)',
          boxShadow: '0 0 10px var(--primary)'
        }}></div>
      </div>

      {/* Controls Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Station Info */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: '20px' }}>
          <h4 className="text-truncate" style={{ fontSize: '1rem', marginBottom: '4px' }}>
            {activeStation.name}
          </h4>
          <p className="text-truncate" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {error ? <span style={{ color: '#ef4444' }}>{error}</span> : 'Live Radio'}
          </p>
        </div>

        {/* Play Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button className="btn-icon" onClick={onPrev}>
            <SkipBack size={24} />
          </button>
          
          <button onClick={togglePlay} style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}>
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
          </button>
          
          <button className="btn-icon" onClick={onNext}>
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
