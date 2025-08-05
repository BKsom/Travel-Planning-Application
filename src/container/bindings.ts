// src/container/bindings.ts
import { container } from 'tsyringe';

// Domain repositories
import { ICityRepository } from '../domain/repositories/ICityRepository';
import { IWeatherRepository } from '../domain/repositories/IWeatherRepository';

// Infrastructure implementations
import { CityRepository } from '../infrastructure/repositories/CityRepository';
import { OpenMeteoRepository } from '../infrastructure/repositories/OpenMeteoRepository';

// Use cases
import { GetCitySuggestions } from '../application/use-cases/GetCitySuggestions';
import { GetWeatherForecast } from '../application/use-cases/GetWeatherForecast';
import { GetRankedActivities } from '../application/use-cases/GetRankedActivities';

// Services
import { ActivityRankingService } from '../domain/services/ActivityRankingService';

// Bind interfaces to concrete implementations
container.register<ICityRepository>('ICityRepository', {
  useClass: CityRepository,
});

container.register<IWeatherRepository>('IWeatherRepository', {
  useClass: OpenMeteoRepository,
});

// Register use cases
container.register<GetCitySuggestions>(GetCitySuggestions, {
  useClass: GetCitySuggestions,
});

container.register<GetWeatherForecast>(GetWeatherForecast, {
  useClass: GetWeatherForecast,
});

container.register<GetRankedActivities>(GetRankedActivities, {
  useClass: GetRankedActivities,
});
