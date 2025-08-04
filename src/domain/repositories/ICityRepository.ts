import { City } from '../entities/City';

export interface ICityRepository {
  getAllCities(): Promise<City[]>;
  getCityByCoordinates(lat: number, lng: number): Promise<City | null>;
}
