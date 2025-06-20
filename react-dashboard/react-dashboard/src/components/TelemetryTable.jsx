import React from 'react';

const TelemetryTable = ({ data }) => {
  const reversed = [...data].slice(-10).reverse(); // newest first

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>📋 Recent Telemetry (Raw View)</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={thStyle}>Timestamp</th>
            <th style={thStyle}>Temperature (°C)</th>
            <th style={thStyle}>Vibration (Hz)</th>
            <th style={thStyle}>Device ID</th>
          </tr>
        </thead>
        <tbody>
          {reversed.map((entry, idx) => {
            const isTempHigh = entry.temperature > 80;
            const isVibHigh = entry.vibration > 90;

            return (
              <tr key={idx} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{entry.timestamp}</td>
                <td style={{ ...tdStyle, color: isTempHigh ? '#b91c1c' : undefined, fontWeight: isTempHigh ? '600' : 'normal' }}>
                  {entry.temperature}
                </td>
                <td style={{ ...tdStyle, color: isVibHigh ? '#b45309' : undefined, fontWeight: isVibHigh ? '600' : 'normal' }}>
                  {entry.vibration}
                </td>
                <td style={tdStyle}>{entry.deviceId || 'sim-01'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '0.5rem',
  borderBottom: '2px solid #ccc',
  fontWeight: '600',
};

const tdStyle = {
  padding: '0.5rem',
};

export default TelemetryTable;
