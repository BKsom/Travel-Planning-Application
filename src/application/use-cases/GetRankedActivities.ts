import { IUseCase } from '../interfaces/IUseCase';
import { RecommendedActivityDto } from '../dto/ActivityRankingDto';
import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';
import { ICityRepository } from '../../domain/repositories/ICityRepository';
import { ActivityRankingService } from '../../domain/services/ActivityRankingService';
import { AppError } from '../../shared/errors/AppError';

export interface ActivityRankingRequest {
  latitude: number;
  longitude: number;
}

export class GetRankedActivities
  implements IUseCase<ActivityRankingRequest, RecommendedActivityDto[]>
{
  constructor(
    private cityRepo: ICityRepository,
    private weatherRepo: IWeatherRepository,
    private rankingService: typeof ActivityRankingService
  ) {}

  async execute(input: ActivityRankingRequest): Promise<RecommendedActivityDto[]> {
    const { latitude, longitude } = input;

    const city = await this.cityRepo.getCityByCoordinates(latitude, longitude);
    if (!city) {
      throw new AppError('City not found for the provided coordinates.', 404);
    }

    const weather = await this.weatherRepo.getWeatherByCoordinates(latitude, longitude);
    const ranked = this.rankingService.rankAllActivities(city, weather);

    return ranked.map(r => ({
      activity: r.activity,
      score: r.score,
      reason: r.reason
    }));
  }
}

