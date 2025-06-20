import React from 'react';

const ExportCSV = ({ data }) => {
  const handleDownload = () => {
    const header = ['Timestamp', 'Temperature (°C)', 'Vibration (Hz)', 'Device ID'];
    const rows = data.map((entry) => [
      entry.timestamp,
      entry.temperature,
      entry.vibration,
      entry.deviceId || 'sim-01',
    ]);

    const csvContent =
      [header, ...rows]
        .map((row) => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `iot_telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        marginTop: '1.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      ⬇️ Download CSV
    </button>
  );
};

export default ExportCSV;
