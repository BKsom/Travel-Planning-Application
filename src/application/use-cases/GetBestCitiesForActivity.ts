import { IUseCase } from '../interfaces/IUseCase';
import { ICityRepository } from '../../domain/repositories/ICityRepository';
import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';
import { ActivityRankingService } from '../../domain/services/ActivityRankingService';
import { GetBestCitiesForActivityInput, GetBestCitiesForActivityOutput } from '../dto/ActivityCityRankingDto';

export class GetBestCitiesForActivity implements IUseCase<GetBestCitiesForActivityInput, GetBestCitiesForActivityOutput> {
  constructor(
    private cityRepository: ICityRepository,
    private weatherRepository: IWeatherRepository
  ) {}

  async execute(input: GetBestCitiesForActivityInput): Promise<GetBestCitiesForActivityOutput> {
    const cities = await this.cityRepository.getAllCities();

    const rankings = await Promise.all(
      cities.map(async (city) => {
        const weather = await this.weatherRepository.getWeatherForCity(city);
        return ActivityRankingService.rankCityForActivity(input.activity, city, weather);
      })
    );

    const sorted = rankings.sort((a, b) => b.score - a.score);

    return { rankings: sorted };
  }
}
