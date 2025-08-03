import { City } from '../entities/City';
import { Weather } from '../entities/Weather';
import { ActivityType } from '../entities/Activity';
import { IdealConditionsMap } from '../types/IdealConditionsMap';

export interface ActivityCityScore {
  city: string;
  score: number;
  reason: string;
}

export class ActivityRankingService {
  static rankCityForActivity(
    activity: ActivityType,
    city: City,
    weather: Weather
  ): ActivityCityScore {
    const conditions = IdealConditionsMap[activity];
    let score = 0;
    const reasons: string[] = [];

    if (conditions.tempMin !== undefined && weather.temperature >= conditions.tempMin) {
      score += 3;
    } else {
      reasons.push('Too cold');
    }

    if (conditions.tempMax !== undefined && weather.temperature <= conditions.tempMax) {
      score += 3;
    } else {
      reasons.push('Too hot');
    }

    if (!conditions.rainAllowed && weather.precipitation > 0) {
      reasons.push('Raining');
    } else {
      score += 2;
    }

    if (conditions.windMin !== undefined && weather.windSpeed >= conditions.windMin) {
      score += 1;
    }

    if (conditions.windMax !== undefined && weather.windSpeed <= conditions.windMax) {
      score += 1;
    }

    return {
      city: city.name,
      score,
      reason: reasons.length ? reasons.join(', ') : 'Ideal weather conditions',
    };
  }
}
