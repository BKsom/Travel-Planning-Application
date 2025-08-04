import { OpenMeteoRepository } from '../../../src/infrastructure/repositories/OpenMeteoRepository';
import { Weather } from '../../../src/domain/entities/Weather';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenMeteoRepository', () => {
  const repo = new OpenMeteoRepository();

  const mockWeatherResponse = {
    data: {
      current_weather: {
        temperature: 22,
        windspeed: 10,
        weathercode: 0
      }
    }
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockWeatherResponse);
  });

  it('should fetch weather data for coordinates', async () => {
    const weather = await repo.getWeatherByCoordinates(-29.8587, 31.0218);
    expect(weather).toHaveProperty('description');
    expect(weather).toHaveProperty('temperature');
    expect(weather.temperature.celsius).toBe(22);
  });

  it('should throw if API fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API failure'));
    await expect(repo.getWeatherByCoordinates(0, 0)).rejects.toThrow('API failure');
  });
});