import { ActivityType } from '../../domain/entities/Activity';

export interface GetBestCitiesForActivityInput {
  activity: ActivityType;
}

export interface CityRankingResult {
  city: string;
  score: number;
  reason: string;
}

export interface GetBestCitiesForActivityOutput {
  rankings: CityRankingResult[];
}
