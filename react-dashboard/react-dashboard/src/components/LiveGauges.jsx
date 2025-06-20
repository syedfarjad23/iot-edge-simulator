import React from 'react';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Gauge = ({ label, value, max, color }) => (
  <div style={{ width: 120, margin: '1rem', textAlign: 'center' }}>
    <CircularProgressbar
      value={value}
      maxValue={max}
      text={`${value}`}
      styles={buildStyles({
        pathColor: color,
        textColor: '#333',
        trailColor: '#eee',
      })}
    />
    <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{label}</div>
  </div>
);

const LiveGauges = ({ temperature, vibration }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
    <Gauge label="🌡 Temp (°C)" value={temperature} max={100} color="#ff7300" />
    <Gauge label="🛠 Vib (Hz)" value={vibration} max={100} color="#0088FE" />
  </div>
);

export default LiveGauges;
