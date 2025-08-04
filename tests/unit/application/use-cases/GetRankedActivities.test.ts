import { GetRankedActivities } from '../../../../src/application/use-cases/GetRankedActivities';
import { ICityRepository } from '../../../../src/domain/repositories/ICityRepository';
import { IWeatherRepository } from '../../../../src/domain/repositories/IWeatherRepository';
import { City } from '../../../../src/domain/entities/City';
import { Weather } from '../../../../src/domain/entities/Weather';
import { ActivityRankingService } from '../../../../src/domain/services/ActivityRankingService';

describe('GetRankedActivities Use Case', () => {
  let cityRepoMock: jest.Mocked<ICityRepository>;
  let weatherRepoMock: jest.Mocked<IWeatherRepository>;
  let useCase: GetRankedActivities;

  beforeEach(() => {
    cityRepoMock = {
      getAllCities: jest.fn(),
      getCityByCoordinates: jest.fn(), // ✅ Include this mock
    } as jest.Mocked<ICityRepository>;

    weatherRepoMock = {
      getWeatherForCity: jest.fn(),
      getWeatherByCoordinates: jest.fn(),
    } as jest.Mocked<IWeatherRepository>;

    useCase = new GetRankedActivities(cityRepoMock, weatherRepoMock, ActivityRankingService);
  });

  it('should return ranked activities for valid coordinates', async () => {
    const mockCity: City = {
      name: 'Cape Town',
      country: 'South Africa',
      latitude: -33.9249,
      longitude: 18.4241,
    };

    const mockWeather: Weather = {
      description: 'clear sky',
      temperature: { celsius: 22 },
      humidity: 55,
      windSpeed: 10,
      pressure: 1012,
      icon: '01d',
    };

    cityRepoMock.getCityByCoordinates.mockResolvedValueOnce(mockCity);
    weatherRepoMock.getWeatherByCoordinates.mockResolvedValueOnce(mockWeather);

    const result = await useCase.execute({ latitude: mockCity.latitude, longitude: mockCity.longitude });

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('activity');
    expect(result[0]).toHaveProperty('score');
    expect(cityRepoMock.getCityByCoordinates).toHaveBeenCalledWith(mockCity.latitude, mockCity.longitude);
    expect(weatherRepoMock.getWeatherByCoordinates).toHaveBeenCalledWith(mockCity.latitude, mockCity.longitude);
  });

  it('should throw error if city is not found', async () => {
    cityRepoMock.getCityByCoordinates.mockResolvedValueOnce(null); // simulate city not found

    await expect(
      useCase.execute({ latitude: 0, longitude: 0 })
    ).rejects.toThrow('City not found for the provided coordinates.');
  });
});
