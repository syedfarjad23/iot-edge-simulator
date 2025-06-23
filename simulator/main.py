import os
import time
import random
from datetime import datetime
from mqtt_client import MQTTClient
import requests

# 🚨 Load Telegram credentials from environment variables
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN","7548930659:AAFjSTqt5ImqCUXUalLvLVh3XqU05t1uc80")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID","7747742789")

# 📩 Function to send alerts to Telegram
def send_telegram_alert(message):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        print("⚠️ Telegram config missing")
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message
    }
    try:
        response = requests.post(url, json=payload)
        if response.status_code != 200:
            print(f"❌ Failed to send Telegram alert: {response.text}")
        else:
            print("📨 Telegram alert sent!")
    except Exception as e:
        print(f"❌ Error sending Telegram alert: {e}")

# 🧪 Simulate temperature value (°C)
def generate_temperature():
    return round(random.uniform(20.0, 85.0), 2)

# 🧪 Simulate vibration level (g-force or arbitrary scale)
def generate_vibration():
    return round(random.uniform(0.0, 1.2), 2)

# 🧠 Main loop
def main():
    mqtt_client = MQTTClient()
    mqtt_client.connect()

    print("📡 Starting IoT Edge Simulator with MQTT publishing...")

    try:
        while True:
            timestamp = datetime.utcnow().isoformat() + "Z"
            temperature = generate_temperature()
            vibration = generate_vibration()

            telemetry = {
                "timestamp": timestamp,
                "temperature": temperature,
                "vibration": vibration
            }

            # 🔔 Alert triggers
            if temperature > 75:
                send_telegram_alert(f"🔥 High temperature detected: {temperature}°C")
            if vibration > 0.8:
                send_telegram_alert(f"⚠️ High vibration detected: {vibration}")

            mqtt_client.publish(telemetry)
            time.sleep(1)

    except KeyboardInterrupt:
        print("🛑 Simulator stopped by user.")
    finally:
        mqtt_client.disconnect()

if __name__ == "__main__":
    main()
