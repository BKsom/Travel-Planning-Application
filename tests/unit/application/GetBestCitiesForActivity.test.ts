// What my test does?
// Mocks both repos	So no real API calls or DB involved
// Simulates two cities	Cape Town (ideal), Durban (less ideal)
// Verifies ranking	Ensures Cape Town scores higher
// Verifies reasoning	Ensures reasons like "Ideal weather conditions" appear correctly

import { GetBestCitiesForActivity } from '../../../src/application/use-cases/GetBestCitiesForActivity';
import { ICityRepository } from '../../../src/domain/repositories/ICityRepository';
import { IWeatherRepository } from '../../../src/domain/repositories/IWeatherRepository';
import { City } from '../../../src/domain/entities/City';
import { Weather } from '../../../src/domain/entities/Weather';
import { ActivityType } from '../../../src/domain/entities/Activity';

describe('GetBestCitiesForActivity Use Case', () => {
  const mockCityRepo: ICityRepository = {
    getAllCities: jest.fn().mockResolvedValue([
      new City('Cape Town', 'station1', -33.9, 18.4),
      new City('Durban', 'station2', -29.8, 31.0),
    ]),
  };

  const mockWeatherRepo: IWeatherRepository = {
    getWeatherForCity: jest.fn((city: City) => {
      if (city.name === 'Cape Town') {
        return Promise.resolve(
          new Weather(24, 50, 3, 0, Date.now())
        );
      }
      return Promise.resolve(
        new Weather(30, 70, 8, 1.2, Date.now())
      );
    }),
  };

  const useCase = new GetBestCitiesForActivity(mockCityRepo, mockWeatherRepo);

  it('should rank cities based on weather for hiking', async () => {
    const result = await useCase.execute({ activity: 'hiking' as ActivityType });

    expect(result.rankings.length).toBe(2);
    expect(result.rankings[0].city).toBe('Cape Town'); // Best match
    expect(result.rankings[1].city).toBe('Durban');
    expect(result.rankings[0].score).toBeGreaterThan(result.rankings[1].score);
    expect(result.rankings[0].reason).toBe('Ideal weather conditions');
  });
});
