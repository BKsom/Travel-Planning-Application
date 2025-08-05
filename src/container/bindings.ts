import { container } from 'tsyringe';
import { ICityRepository } from '../domain/repositories/ICityRepository';
import { IWeatherRepository } from '../domain/repositories/IWeatherRepository';
import { CityRepository } from '../infrastructure/repositories/CityRepository';
import { OpenMeteoRepository } from '../infrastructure/repositories/OpenMeteoRepository';
import { GetCitySuggestions } from '../application/use-cases/GetCitySuggestions';
import { GetWeatherForecast } from '../application/use-cases/GetWeatherForecast';
import { GetRankedActivities } from '../application/use-cases/GetRankedActivities';

import { ActivityRankingService } from '../domain/services/ActivityRankingService';

container.register<ICityRepository>('ICityRepository', {
  useClass: CityRepository,
});

container.register<IWeatherRepository>('IWeatherRepository', {
  useClass: OpenMeteoRepository,
});

container.register<GetCitySuggestions>(GetCitySuggestions, {
  useClass: GetCitySuggestions,
});

container.register<GetWeatherForecast>(GetWeatherForecast, {
  useClass: GetWeatherForecast,
});

container.register<GetRankedActivities>(GetRankedActivities, {
  useClass: GetRankedActivities,
});


