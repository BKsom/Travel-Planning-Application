# 🌍 Travel Planning GraphQL API

This is a TypeScript-based GraphQL API for suggesting travel activities based on real-time weather data, using OpenMeteo’s RESTful API. The app helps users:
- Search for cities
- View live weather forecasts
- Get recommended outdoor/indoor activities based on current weather

---

## ⚙️ Tech Stack

- **Node.js**
- **TypeScript**
- **GraphQL (Apollo Server)**
- **Jest** (unit testing)
- **OpenMeteo API** (external weather data)
- **Clean architecture**

---

## 🚀 Features

- 🔍 **City Suggestions** (partial name match)
- ☀️ **Weather Forecast** by Latitude & Longitude
- 🧠 **AI-like Activity Recommendations** based on weather conditions:
  - SKIING
  - SURFING
  - INDOOR_SIGHTSEEING
  - OUTDOOR_SIGHTSEEING

---

## 📁 Folder Structure
```
src/
├── domain/
│ ├── entities/
│ ├── repositories/
│ ├── services/
│ └── types/
├── application/
│ ├── dto/
│ ├── interfaces/
│ └── use-cases/
├── infrastructure/
│ ├── config/     <!---not used--->
│ ├── external/
│ └── repositories/
├── presentation/
│ ├── graphql/
│ │ ├── schema/
│ │ └── context.ts/
│ └── middleware/
├── shared/
│ ├── constants/
│ └── errors/
| 
├── container/
│ ├── bindings.ts
│ └── Container.ts
└── server.ts
tests/
├── fixtures/
│ 
├── Integration/
│ ├── graphql/
│ └── repositories/
├── unit/
│ ├── application/
│ ├── domain/
│ └── infrastructre/

```
---

## 📦 Installation

```bash
git clone https://github.com/BKsom/travel-planning-api.git
cd travel-planning-api
npm install
npx ts-node src/server.ts
Server should start on http://localhost:4000/graphql

npm run test
---

## 🔌 Sample GraphQL Queries

### 1. City Suggestions

```graphql
query {
  citySuggestions(name: "Dur") {
    name
    country
    latitude
    longitude
  }
}
```
---
### 2. Weather Forecast

```graphql
query {
  weatherForecast(latitude: -29.8587, longitude: 31.0218) {
    description
    temperature {
      celsius
    }
    humidity
    windSpeed
    pressure
  }
}
```
---
### 3. Recommended Activities

```graphql
query {
  recommendActivities(latitude: -29.8587, longitude: 31.0218) {
    activity
    score
    reason
  }
}
```
###NB!!!: use city latitude and longitude you det from the partial search(City Suggestions)
---

```
We use OpenMeteo's public weather station data:

GET http://api.openmeteo.com/observations/openmeteo/{stationId}/thb0
GET http://api.openmeteo.com/observations/openmeteo/{stationId}/wind0

To integrate with this API, we map lat/lng to station IDs.


🌍Future Improvements
Add more weather APIs for richer descriptions

Add user authentication and saved favorites

Introduce caching for API performance
```