// import { Weather } from '../../domain/entities/Weather';
// import { City } from '../../domain/entities/City';
// import { IWeatherRepository } from '../../domain/repositories/IWeatherRepository';
// import { OpenMeteoClient } from '../external/OpenMeteoClient';
// export class OpenMeteoRepository implements IWeatherRepository {
//   constructor(private client: OpenMeteoClient) {}

//   async getWeatherForCity(city: City): Promise<Weather> {
//     const data = await this.client.fetchCurrentWeather(city.stationId);

//     return new Weather(
//       data.temperature,
//       data.humidity,
//       data.windSpeed,
//       data.precipitation,
//       data.
//       Date.now()
//     );
//   }
// }
