import { ActivityType } from '../entities/Activity';

export interface IdealCondition {
  tempMin?: number;
  tempMax?: number;
  rainAllowed?: boolean;
  windMin?: number;
  windMax?: number;
  snowRequired?: boolean;
}

export const IdealConditionsMap: Record<ActivityType, IdealCondition> = {
  hiking: {
    tempMin: 15,
    tempMax: 28,
    rainAllowed: false,
    windMax: 6,
  },
  surfing: {
    tempMin: 20,
    tempMax: 35,
    windMin: 5,
    windMax: 15,
  },
  skiing: {
    tempMax: 0,
    snowRequired: true,
  },
  'indoor-sightseeing': {
    rainAllowed: true,
  },
  'outdoor-sightseeing': {
    tempMin: 18,
    tempMax: 30,
    rainAllowed: false,
  },
};
