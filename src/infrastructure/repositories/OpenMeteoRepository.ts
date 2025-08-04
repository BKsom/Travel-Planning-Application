// src/infrastructure/repositories/OpenMeteoRepository.ts
import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';
import { City } from '../../domain/entities/City';
import { Weather } from '../../domain/entities/Weather';
import { OpenMeteoClient } from '../external/OpenMeteoClient';

export class OpenMeteoRepository implements IWeatherRepository {
  private client = new OpenMeteoClient();

  async getWeatherByCoordinates(lat: number, lon: number): Promise<Weather> {
    const raw = await this.client.fetchWeather(lat, lon);

    return {
      description: this.mapWeatherCode(raw.current_weather.weathercode),
      temperature: { celsius: raw.current_weather.temperature },
      windSpeed: raw.current_weather.windspeed,
      humidity: 60, // Static for now
      pressure: 1013, // Static for now
      icon: '',
    };
  }

  async getWeatherForCity(city: City): Promise<Weather> {
    return this.getWeatherByCoordinates(city.latitude, city.longitude);
  }

  private mapWeatherCode(code: number): string {
    switch (code) {
      case 0:
        return 'clear sky';
      case 1:
      case 2:
      case 3:
        return 'partly cloudy';
      case 45:
      case 48:
        return 'fog';
      case 51:
      case 53:
      case 55:
        return 'drizzle';
      case 61:
      case 63:
      case 65:
        return 'rain';
      case 71:
      case 73:
      case 75:
        return 'snow';
      case 95:
      case 96:
      case 99:
        return 'storm';
      default:
        return 'unknown';
    }
  }
}
