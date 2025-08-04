import { CityRepository } from '../../../src/infrastructure/repositories/CityRepository';
import { City } from '../../../src/domain/entities/City';

describe('CityRepository', () => {
  let cityRepo: CityRepository;

  beforeEach(() => {
    cityRepo = new CityRepository();
  });

  it('should return all cities', async () => {
    const cities = await cityRepo.getAllCities();
    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThan(0);
    expect(cities[0]).toHaveProperty('name');
    expect(cities[0]).toHaveProperty('latitude');
    expect(cities[0]).toHaveProperty('longitude');
  });

  it('should return a city matching given coordinates', async () => {
    const allCities = await cityRepo.getAllCities();
    const sample = allCities[0];
    const city = await cityRepo.getCityByCoordinates(sample.latitude, sample.longitude);
    expect(city).toEqual(sample);
  });

  it('should return undefined if city not found by coordinates', async () => {
    const city = await cityRepo.getCityByCoordinates(0, 0);
    expect(city).toBeNull();
;
  });
});