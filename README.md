# 🏠 IoT Edge Simulator with MQTT + Docker + Cloud

A full-stack simulation of an Industry 4.0 edge device that streams telemetry (temperature, vibration) via MQTT to a cloud broker, visualized in a real-time React dashboard. Alerts are triggered for abnormal values and sent directly to Telegram.

> 🌟 Built to showcase DevOps, IIoT, and digital transformation for smart manufacturing environments.

---

## 🌐 Project Overview

This project replicates an industrial IoT use case involving:

* Edge simulation of telemetry data (sensor values)
* Communication using MQTT (standard IIoT protocol)
* Real-time UI for data monitoring and analysis
* Smart alerting with integration to Telegram
* Docker-based deployment architecture

---

## 🧱 Architecture Diagram

```
+---------------------+           +-------------------+
|  Python Simulator   | --MQTT--> |    Mosquitto MQTT |
| (Docker container)  |           |   (WS-enabled)    |
+---------------------+           +-------------------+
                                      |
                                      | WebSocket
                                      v
                               +----------------+
                               | React Frontend |
                               |  (Vite + WS)   |
                               +----------------+
                                      |
                                      | Alerts
                                      v
                               +----------------+
                               |  Telegram Bot  |
                               +----------------+
```

---

## 💠 Tech Stack

| Layer         | Tool/Tech           |
| ------------- | ------------------- |
| Data Sim      | Python, `paho-mqtt` |
| Broker        | Mosquitto MQTT (WS) |
| Visualization | React + Recharts    |
| Alerting      | Telegram Bot API    |
| Orchestration | Docker + Compose    |
| Protocol      | MQTT over WebSocket |

---

## 🚀 Features

* 📊 Real-time telemetry: `temperature`, `vibration`
* 🔔 Smart alerts on threshold breach (Telegram)
* 🧠 Dashboard with live charts, gauges, and tables
* 🪪 CSV export of recent telemetry
* 🐳 Easy deployment via Docker Compose

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/iot-edge-simulator.git
cd iot-edge-simulator
```

### 2. Create `.env` file

In the **root folder**, create a file named `.env`:

```env
# Telegram Alerting
TELEGRAM_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_personal_chat_id

# MQTT Authentication
MQTT_BROKER_URL=localhost
MQTT_BROKER_PORT=1883
MQTT_TOPIC=factory/simulator/telemetry
MQTT_USERNAME=app_user
MQTT_PASSWORD=test123

#WebSocket Connection
VITE_MQTT_WS_URL=ws://localhost:9001
```

> ⚠️ Make sure to get your **real chat ID** by messaging your bot and calling:
> `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`

---

### 3. Start the project

```bash
docker-compose up --build
```

* React Dashboard: [http://localhost:5173](http://localhost:5173)
* MQTT Broker (WebSocket): ws\://localhost:9001
* Simulator publishes every second

---

## 📊 Dashboard Preview


docs/dash_1.png
docs/dash_2.png
docs/dash_3.png

```
```

---

## 🧠 Industry 4.0 Mapping

| Industry 4.0 Principle | This Project Implementation            |
| ---------------------- | -------------------------------------- |
| Edge Intelligence      | Simulator generates local telemetry    |
| Connectivity           | MQTT Protocol over WebSocket           |
| Visualization          | Real-time dashboard with charts/gauges |
| Predictive Maintenance | Alerts for overheating/vibration       |
| Interoperability       | Docker-based microservice architecture |

---

## 📌 About the Author

👤 **Syed Farjad**
DevOps | Industrial Automation | Smart Manufacturing | Industry 4.0

> This project is part of my digital transformation portfolio demonstrating how DevOps and cloud-native technologies can power smart factories.

* 🔗 [LinkedIn](https://linkedin.com/in/muhammadfarjad2)
* 💼 [Portfolio](https://github.com/syedfarjad23)

---

## 📌 Future Enhancements

* 📈 Add InfluxDB + Grafana time series
* 🌐 Device identity simulation support
* ☁️ AWS IoT Core / Azure IoT Hub integration
* 🧠 ML model for predictive maintenance alerts

---

## 🏃️ License

MIT License
