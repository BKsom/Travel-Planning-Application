import { ICityRepository } from '../../domain/repositories/ICityRepository';
import { City } from '../../domain/entities/City';
import citiesJson from '../../shared/constants/cities.json';

export class CityRepository implements ICityRepository {
  private cities: City[] = citiesJson as City[];

  async getAllCities(): Promise<City[]> {
    return this.cities;
  }

  async getCityByCoordinates(lat: number, lon: number): Promise<City | null> {
    return (
      this.cities.find(
        (c) => Math.abs(c.latitude - lat) < 0.1 && Math.abs(c.longitude - lon) < 0.1
      ) || null
    );
  }
}

