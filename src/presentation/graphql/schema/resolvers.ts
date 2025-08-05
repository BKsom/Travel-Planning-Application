import { ICityRepository } from '../../../domain/repositories/ICityRepository';
import { IWeatherRepository } from '../../../domain/repositories/IWeatherRepository';
import { GetCitySuggestions } from '../../../application/use-cases/GetCitySuggestions';
import { GetWeatherForecast } from '../../../application/use-cases/GetWeatherForecast';
import { GetRankedActivities } from '../../../application/use-cases/GetRankedActivities';
import { ActivityRankingService } from '../../../domain/services/ActivityRankingService';
import container from '../../../container/Container';


export const resolvers = {
  Query: {
    citySuggestions: async (_: any, args: { name: string }) => {
      const useCase = new GetCitySuggestions(
        container.resolve<ICityRepository>('ICityRepository') 
      );
      return await useCase.execute({ name: args.name });
    },

    weatherForecast: async (_: any, args: { latitude: number; longitude: number }) => {
      const useCase = new GetWeatherForecast(
        container.resolve<IWeatherRepository>('IWeatherRepository')
      );
      return await useCase.execute({ latitude: args.latitude, longitude: args.longitude });
    },

    recommendActivities: async (_: any, args: { latitude: number; longitude: number }) => {
      const useCase = new GetRankedActivities(
        container.resolve<ICityRepository>('ICityRepository'),
        container.resolve<IWeatherRepository>('IWeatherRepository'), 
        ActivityRankingService
      );
      return await useCase.execute({ latitude: args.latitude, longitude: args.longitude });
    },
  },
};
