import { GetWeatherForecast } from '../../../../src/application/use-cases/GetWeatherForecast';
import { IWeatherRepository } from '../../../../src/domain/repositories/IWeatherRepository';
import { Weather } from '../../../../src/domain/entities/Weather';

describe('GetWeatherForecast Use Case', () => {
  let weatherRepoMock: jest.Mocked<IWeatherRepository>;
  let useCase: GetWeatherForecast;

  beforeEach(() => {
    weatherRepoMock = {
      getWeatherForCity: jest.fn(),
      getWeatherByCoordinates: jest.fn()
    } as jest.Mocked<IWeatherRepository>;

    useCase = new GetWeatherForecast(weatherRepoMock);
  });

  it('should return weather data for given coordinates', async () => {
    const mockWeather: Weather = {
      description: 'Clear sky',
      temperature: { celsius: 25 },
      humidity: 50,
      windSpeed: 5,
      pressure: 1012,
      icon: '01d'
    };

    weatherRepoMock.getWeatherByCoordinates.mockResolvedValueOnce(mockWeather);

    const result = await useCase.execute({ latitude: 12.34, longitude: 56.78 });

    expect(result).toEqual(mockWeather);
    expect(weatherRepoMock.getWeatherByCoordinates).toHaveBeenCalledWith(12.34, 56.78);
  });
});
