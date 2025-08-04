import { IUseCase } from '../interfaces/IUseCase';
import { WeatherDto } from '../dto/WeatherDto';
import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';

export interface WeatherForecastRequest {
  latitude: number;
  longitude: number;
}

export class GetWeatherForecast
  implements IUseCase<WeatherForecastRequest, WeatherDto>
{
  constructor(private weatherRepo: IWeatherRepository) {}

  async execute(input: WeatherForecastRequest): Promise<WeatherDto> {
    const weather = await this.weatherRepo.getWeatherByCoordinates(
      input.latitude,
      input.longitude
    );

    return {
      description: weather.description,
      temperature: {
        celsius: weather.temperature.celsius,
      },
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      pressure: weather.pressure,
      icon: weather.icon ?? 'default-icon.png'
    };
  }
}
