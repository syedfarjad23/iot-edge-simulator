import mqtt from 'mqtt';

export const connectMQTT = () => {
  const options = {
    connectTimeout: 4000,
    username: 'app_user',
    password: 'test123',
    reconnectPeriod: 1000,
    protocolId: 'MQTT',      // Explicitly set protocol for WebSocket
    protocolVersion: 4,
  };

  const client = mqtt.connect('ws://localhost:9001', options);

  // Optional event listeners for debugging:
  client.on('connect', () => {
    console.log('✅ MQTT connected');
  });

  client.on('error', (err) => {
    console.error('❌ MQTT connection error:', err);
  });

  client.on('reconnect', () => {
    console.log('🔄 MQTT reconnecting...');
  });

  client.on('offline', () => {
    console.log('⚠️ MQTT client offline');
  });

  return client;
};
