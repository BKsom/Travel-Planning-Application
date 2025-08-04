import { IUseCase } from '../interfaces/IUseCase';
import { CityDto, CitySearchRequestDto } from '../dto/CitySearchDto';
import { ICityRepository } from '../../domain/repositories/ICityRepository';

export class GetCitySuggestions
  implements IUseCase<CitySearchRequestDto, CityDto[]>
{
  constructor(private cityRepository: ICityRepository) {}

  async execute(input: CitySearchRequestDto): Promise<CityDto[]> {
    const allCities = await this.cityRepository.getAllCities();
    const query = input.name.toLowerCase();

    return allCities
      .filter(city => city.name.toLowerCase().includes(query))
      .map(city => ({
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      }));
  }
}
