import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ChartPanel = ({ title, dataKey, color, data }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h4 style={{ marginBottom: '0.5rem' }}>{title}</h4>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const TelemetryChart = ({ data }) => (
  <div>
    <ChartPanel
      title="🌡️ Temperature (°C)"
      dataKey="temperature"
      color="#ff7300"
      data={data}
    />
    <ChartPanel
      title="🛠️ Vibration (Hz)"
      dataKey="vibration"
      color="#0088FE"
      data={data}
    />
  </div>
);

export default TelemetryChart;
