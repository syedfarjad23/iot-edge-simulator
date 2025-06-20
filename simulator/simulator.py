import time
import random
from datetime import datetime
from simulator.mqtt_client import MQTTClient

def generate_temperature():
    return round(random.uniform(20.0, 80.0), 2)

def generate_vibration():
    return round(random.uniform(0.0, 10.0), 2)

def main():
    mqtt_client = MQTTClient()
    mqtt_client.connect()

    print("📡 Starting IoT Edge Simulator with MQTT publishing...")

    try:
        while True:
            timestamp = datetime.utcnow().isoformat() + "Z"
            telemetry = {
                "timestamp": timestamp,
                "temperature": generate_temperature(),
                "vibration": generate_vibration()
            }
            mqtt_client.publish(telemetry)
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Simulator stopped by user.")
    finally:
        mqtt_client.disconnect()

if __name__ == "__main__":
    main()
