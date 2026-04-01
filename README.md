# 🚀 PI AI Pipeline Monitoring Dashboard

A real-time pipeline monitoring dashboard built using React.js that simulates industrial sensor behavior and detects potential leaks using frontend logic.

---

## 📌 Overview

This project replicates a real-world pipeline monitoring interface used by operators to track pressure changes and identify anomalies in real time.

The system continuously simulates sensor data and visually alerts the user when abnormal pressure drops are detected.

---

## ⚡ Key Features

- 📊 Live pressure trend chart (PT-1 & PT-2)
- 🔄 Real-time data updates every 2.5 seconds
- 🚨 Automatic leak detection (threshold-based logic)
- 🔴 Visual alert system (banner + UI highlights)
- 📜 Alerts log (chronological, latest first)
- 🟢 Dynamic pipeline status indicator
- 📱 Fully responsive design (mobile + desktop)
- 🌙 Dark mode & Light mode support
- ⚡ Simulate Leak button (manual trigger)
- 🛢️ Interactive pipeline diagram with leak visualization

---

## 🧠 Leak Detection Logic

A leak is detected when:

> Pressure at **PT-1 drops more than 10 PSI in a single interval**

This triggers:
- Alert banner
- Sensor highlight
- Pipeline leak visualization
- Log entry

---

## 🛠 Tech Stack

- **Frontend:** React.js (Vite)
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect, useRef, useCallback)

---

---

## ▶️ Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/pi-ai-intern-task.git
npm install
npm run dev

## 📁 Project Structure
src/
├── components/
├── hooks/
├── App.jsx


<img width="1904" height="695" alt="Screenshot 2026-04-01 184833" src="https://github.com/user-attachments/assets/89bdecaa-3b08-4761-b8ca-33217ca3a2d1" />
Video Url-https://drive.google.com/file/d/1Yp1pcJeOBv-AItKZbKqiaWSJuLLTXvAx/view?usp=sharing
