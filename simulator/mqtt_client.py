import os
import paho.mqtt.client as mqtt
import json

class MQTTClient:
    def __init__(self):
        self.broker_url = os.getenv("MQTT_BROKER_URL", "localhost")
        self.broker_port = int(os.getenv("MQTT_BROKER_PORT", "1883"))
        self.topic = os.getenv("MQTT_TOPIC", "factory/simulator/telemetry")
        self.username = os.getenv("MQTT_USERNAME")
        self.password = os.getenv("MQTT_PASSWORD")

        self.client = mqtt.Client()

        if self.username and self.password:
            self.client.username_pw_set(self.username, self.password)

    def connect(self):
        try:
            self.client.connect(self.broker_url, self.broker_port)
            self.client.loop_start()
            print(f"✅ Connected to MQTT Broker at {self.broker_url}:{self.broker_port}")
        except Exception as e:
            print(f"❌ MQTT connection failed: {e}")

    def publish(self, message_dict):
        try:
            message_json = json.dumps(message_dict)
            result = self.client.publish(self.topic, message_json)
            status = result[0]
            if status == 0:
                print(f"✅ Sent message to topic `{self.topic}`")
            else:
                print(f"❌ Failed to send message to topic `{self.topic}`, status code: {status}")
        except Exception as e:
            print(f"❌ Exception while publishing message: {e}")

    def disconnect(self):
        self.client.loop_stop()
        self.client.disconnect()
        print("🔌 Disconnected from MQTT Broker")
