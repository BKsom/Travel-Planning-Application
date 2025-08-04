// src/infrastructure/external/types.ts

export interface WeatherApiResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    weathercode: number[];
    windspeed_10m: number[];
  };
}
