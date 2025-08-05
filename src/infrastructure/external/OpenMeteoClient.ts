import axios from 'axios';
import { WeatherApiResponse } from './types';

export class OpenMeteoClient {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  async fetchWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
    const response = await axios.get(this.baseUrl, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: 'temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m',
      },
    });

    return response.data;
  }
}
