import React, { useEffect, useState } from 'react';
import { connectMQTT } from './mqtt';
import TelemetryChart from './components/TelemetryChart';

function App() {
  const [data, setData] = useState([]);
  const MAX_POINTS = 20;

  useEffect(() => {
    const client = connectMQTT();

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('factory/simulator/telemetry');
    });

    client.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        setData(prev => {
          const updated = [...prev, payload];
          return updated.slice(-MAX_POINTS);
        });
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📡 IoT Edge Telemetry Dashboard</h2>
      <TelemetryChart data={data} />
    </div>
  );
}

export default App;
