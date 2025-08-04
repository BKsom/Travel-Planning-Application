import { City } from '../entities/City';
import { Weather } from '../entities/Weather';
import { RankedActivity } from '../types/index';
import { ActivityType } from '../entities/Activity';

export class ActivityRankingService {
  static rankAllActivities(city: City, weather: Weather): RankedActivity[] {
    const description = weather.description.toLowerCase();
    const celsius = weather.temperature.celsius;
    const windSpeed = weather.windSpeed;

    const activities: RankedActivity[] = [
      { activity: 'SKIING', score: 0, reason: '' },
      { activity: 'SURFING', score: 0, reason: '' },
      { activity: 'INDOOR_SIGHTSEEING', score: 0, reason: '' },
      { activity: 'OUTDOOR_SIGHTSEEING', score: 0, reason: '' }
    ];

    for (const a of activities) {
      switch (a.activity) {
        case 'SKIING':
          if (celsius < 0 && description.includes('snow')) {
            a.score = 1.0;
            a.reason = 'Snow and subzero temperatures';
          } else if (celsius < 5 && !description.includes('rain')) {
            a.score = 0.5;
            a.reason = 'Cold and dry';
          }
          break;

        case 'SURFING':
          if (windSpeed > 15 && !description.includes('storm')) {
            a.score = 0.9;
            a.reason = 'Strong wind and no storm';
          }
          break;

        case 'OUTDOOR_SIGHTSEEING':
          if (celsius >= 15 && celsius <= 25 && description.includes('clear')) {
            a.score = 1.0;
            a.reason = 'Ideal for outdoor sightseeing';
          } else if (description.includes('rain') || description.includes('storm')) {
            a.score = 0.1;
            a.reason = 'Rainy or stormy';
          }
          break;

        case 'INDOOR_SIGHTSEEING':
          if (
            description.includes('rain') ||
            description.includes('storm') ||
            celsius < 5 ||
            celsius > 30
          ) {
            a.score = 0.9;
            a.reason = 'Bad weather for outdoor activities';
          }
          break;
      }
    }

    return activities.sort((a, b) => b.score - a.score);
  }
}
