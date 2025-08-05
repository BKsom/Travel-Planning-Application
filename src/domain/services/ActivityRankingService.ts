import { City } from '../entities/City';
import { Weather } from '../entities/Weather';
import { RankedActivity } from '../types/index';

export class ActivityRankingService {
  static rankAllActivities(city: City, weather: Weather): RankedActivity[] {
    const description = weather.description.toLowerCase();
    const celsius = weather.temperature.celsius;
    const windSpeed = weather.windSpeed;
    const humidity = weather.humidity;
    const isDescriptionKnown = description !== 'unknown';

    const isLikelyRain =
      (isDescriptionKnown && (description.includes('rain') || description.includes('storm'))) ||
      humidity >= 60;

    const activities: RankedActivity[] = [
      { activity: 'SKIING', score: 0, reason: '' },
      { activity: 'SURFING', score: 0, reason: '' },
      { activity: 'INDOOR_SIGHTSEEING', score: 0, reason: '' },
      { activity: 'OUTDOOR_SIGHTSEEING', score: 0, reason: '' }
    ];

    for (const a of activities) {
      switch (a.activity) {
        case 'SKIING':
          if (celsius < 0 && isDescriptionKnown && description.includes('snow')) {
            a.score = 1.0;
            a.reason = 'Snow and subzero temperatures';
          } else if (celsius < 5 && !isLikelyRain) {
            a.score = 0.5;
            a.reason = 'Cold and dry';
          }
          break;

        case 'SURFING':
          if (windSpeed > 15 && !isLikelyRain) {
            a.score = 0.9;
            a.reason = 'Strong wind and no storm';
          } else if (isLikelyRain) {
            a.score = 0.1;
            a.reason = 'Poor weather due to rain or high humidity';
          }
          break;

        case 'OUTDOOR_SIGHTSEEING':
          if (
            celsius >= 15 &&
            celsius <= 25 &&
            !isLikelyRain &&
            (isDescriptionKnown ? description.includes('clear') : true)
          ) {
            a.score = 1.0;
            a.reason = 'Ideal for outdoor sightseeing';
          } else if (isLikelyRain) {
            a.score = 0.1;
            a.reason = 'Rainy or stormy conditions';
          }
          break;

        case 'INDOOR_SIGHTSEEING':
          if (isLikelyRain || celsius < 5 || celsius > 30) {
            a.score = 0.9;
            a.reason = 'Bad weather for outdoor activities';
          }
          break;
      }
    }
    return activities.sort((a, b) => b.score - a.score);
  }
}


