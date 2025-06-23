import React, { useEffect, useState } from 'react';
import { connectMQTT } from './mqtt';
import TelemetryChart from './components/TelemetryChart';
import LiveGauges from './components/LiveGauges';
import TelemetryTable from './components/TelemetryTable';
import ExportCSV from './components/ExportCSV';

function App() {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const MAX_POINTS = 20;

  useEffect(() => {
    const client = connectMQTT();

    client.on('connect', () => {
      console.log('✅ MQTT connected');
      setIsConnected(true);
      client.subscribe('factory/simulator/telemetry');
    });

    client.on('disconnect', () => {
      console.log('🔌 Disconnected from MQTT');
      setIsConnected(false);
    });

    client.on('error', (err) => {
      console.error('❌ MQTT error:', err);
      setIsConnected(false);
    });

    client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());

        setData((prev) => {
          const updated = [...prev, payload];
          return updated.slice(-MAX_POINTS);
        });

        setLastTimestamp(new Date().toLocaleTimeString());

        const newAlerts = [];

        if (payload.temperature > 75) {
          newAlerts.push({
            type: 'temperature',
            message: `🔥 High temperature detected: ${payload.temperature}°C`,
            timestamp: new Date().toLocaleTimeString(),
          });
        }

        if (payload.vibration > 0.8) {
          newAlerts.push({
            type: 'vibration',
            message: `⚠️ High vibration detected: ${payload.vibration}`,
            timestamp: new Date().toLocaleTimeString(),
          });
        }

        if (newAlerts.length > 0) {
          setAlerts((prev) => [...prev, ...newAlerts].slice(-10));
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    });

    return () => client.end();
  }, []);

  const latest = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>
        📡 IoT Edge Telemetry Dashboard
        {alerts.length > 0 && (
          <span style={{ color: 'red', marginLeft: '1rem' }}>
            🚨 {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
          </span>
        )}
      </h2>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <div
          style={{
            marginBottom: '1rem',
            background: '#fef2f2',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <strong style={{ color: '#b91c1c' }}>Alerts:</strong>
          <ul>
            {alerts.map((alert, idx) => (
              <li key={idx} style={{ color: '#991b1b' }}>
                {alert.timestamp} – {alert.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MQTT Status */}
      <div style={{ marginBottom: '1rem' }}>
        <span
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isConnected ? '#d1fae5' : '#fee2e2',
            color: isConnected ? '#065f46' : '#991b1b',
            borderRadius: '8px',
            fontWeight: 600,
          }}
        >
          {isConnected ? '🟢 Connected to MQTT Broker' : '🔴 Disconnected'}
        </span>

        {lastTimestamp && (
          <span style={{ marginLeft: '1rem', color: '#555' }}>
            Last update: {lastTimestamp}
          </span>
        )}
      </div>

      {/* Dashboard */}
      <div style={{ maxWidth: '900px', margin: 'auto' }}>
        {latest && (
          <LiveGauges
            temperature={latest.temperature}
            vibration={latest.vibration}
          />
        )}
        <TelemetryChart data={data} />
        <TelemetryTable data={data} />
        <ExportCSV data={data.slice(-20)} />
      </div>
    </div>
  );
}

export default App;
