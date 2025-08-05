import axios from 'axios';
import stations from '../../shared/constants/stations.json';
import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';
import { Weather } from '../../domain/entities/Weather';
import { City } from '../../domain/entities/City';

export class OpenMeteoWeatherApi implements IWeatherRepository {
  private stations = stations;

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private mapCoordinatesToStationId(lat: number, lng: number): string {
    if (this.stations.length === 0) {
      throw new Error('No stations configured');
    }

    let nearest = this.stations[0]!;  
    let minDist = Infinity;

    for (const station of this.stations) {
      const dist = this.distance(lat, lng, station.lat, station.lng);
      if (dist < minDist) {
        nearest = station;
        minDist = dist;
      }
    }

    return nearest.id;
  }

  public async getWeatherByCoordinates(latitude: number, longitude: number): Promise<Weather> {
    const stationId = this.mapCoordinatesToStationId(latitude, longitude);

    try {
      // Fetch temperature, humidity, pressure
      const tempHumPressureResponse = await axios.get(
        `http://api.openmeteo.com/observations/openmeteo/${stationId}/thb0`
      );
      const tempHumPressureData = tempHumPressureResponse.data;

      // Fetch wind speed
      const windResponse = await axios.get(
        `http://api.openmeteo.com/observations/openmeteo/${stationId}/wind0`
      );
      const windData = windResponse.data;

      // Extract latest measurements (first entry in measurements array)
      const latestTempHumPressure = tempHumPressureData.measurements?.[0]; // [timeUnix, temp, humidity, pressure]
      const latestWind = windData.measurements?.[0]; // [timeUnix, direction, windSpeed, avgSpeed]

      if (!latestTempHumPressure || !latestWind) {
        throw new Error('No recent measurements found for station ' + stationId);
      }

      const [, temp, humidity, pressure] = latestTempHumPressure;
      const [, , windSpeed] = latestWind;

      return {
        description: 'clear', // Optional: improve by decoding weather codes if available
        temperature: { celsius: temp },
        humidity,
        windSpeed,
        pressure,
        icon: undefined
      };
    } catch (error) {
      console.error(`Failed to fetch weather data for station ${stationId}`, error);
      throw new Error('Failed to fetch weather data');
    }
  }

  public async getWeatherForCity(city: City): Promise<Weather> {
    return this.getWeatherByCoordinates(city.latitude, city.longitude);
  }
}
