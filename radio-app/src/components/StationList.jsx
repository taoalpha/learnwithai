import React from 'react';
import { Play, Heart, MoreVertical } from 'lucide-react';

const StationList = ({ stations, loading, onStationSelect, activeStation }) => {
  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading stations...</div>;

  return (
    <div className="station-list" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      padding: '20px',
      overflowY: 'auto',
      flex: 1
    }}>
      {stations.map((station) => {
        const isActive = activeStation?.stationuuid === station.stationuuid;
        return (
          <div key={station.stationuuid} style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => onStationSelect(station)}
          >
            {/* Logo */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fff',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)'
            }}>
              {station.favicon ? (
                <img src={station.favicon} alt={station.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
              ) : (
                <div style={{ color: '#333', fontSize: '1.2rem' }}>📻</div>
              )}
            </div>
            
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="text-truncate" style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '4px',
                color: isActive ? 'var(--primary)' : 'var(--text-main)'
              }}>{station.name}</h3>
              <p className="text-truncate" style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-muted)'
              }}>{station.bitrate ? `${station.bitrate} kbps` : 'FM'}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
              <Heart size={20} />
              <MoreVertical size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StationList;
