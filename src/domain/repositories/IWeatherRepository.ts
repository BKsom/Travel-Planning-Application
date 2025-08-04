import { City } from '../entities/City';
import { Weather } from '../entities/Weather';

export interface IWeatherRepository {
  getWeatherForCity(city: City): Promise<Weather>;
  getWeatherByCoordinates(lat: number, lng: number): Promise<Weather>; // <-- ADD THIS
}
