import { City } from '../entities/City';
import { Weather } from '../entities/Weather';

export interface IWeatherRepository {
  getWeatherForCity(city: City): Promise<Weather>;
}
