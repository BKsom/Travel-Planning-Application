// src/infrastructure/repositories/CityRepository.ts
import { ICityRepository } from '../../domain/repositories/ICityRepository';
import { City } from '../../domain/entities/City';

export class CityRepository implements ICityRepository {
  private cities: City[] = [
    { name: 'Cape Town', country: 'South Africa', latitude: -33.9249, longitude: 18.4241 },
    { name: 'Durban', country: 'South Africa', latitude: -29.8587, longitude: 31.0218 },
    { name: 'Johannesburg', country: 'South Africa', latitude: -26.2041, longitude: 28.0473 },
  ];

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
