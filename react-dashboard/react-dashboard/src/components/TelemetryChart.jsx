import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TelemetryChart = ({ data }) => (
  <LineChart width={800} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="timestamp" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
    <Line type="monotone" dataKey="vibration" stroke="#82ca9d" />
  </LineChart>
);

export default TelemetryChart;
