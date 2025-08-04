import { GetCitySuggestions } from '../../../../src/application/use-cases/GetCitySuggestions';
import { ICityRepository } from '../../../../src/domain/repositories/ICityRepository';
import { City } from '../../../../src/domain/entities/City';

describe('GetCitySuggestions Use Case', () => {
  let cityRepoMock: jest.Mocked<ICityRepository>;
  let useCase: GetCitySuggestions;

  beforeEach(() => {
    cityRepoMock = {
      getCityByCoordinates: jest.fn(),
      getAllCities: jest.fn()
    } as jest.Mocked<ICityRepository>; // ✅ FIXED
    useCase = new GetCitySuggestions(cityRepoMock);
  });

  it('should return filtered city suggestions based on name input', async () => {
    const mockCities: City[] = [
      { name: 'Cape Town', country: 'South Africa', latitude: -33.9, longitude: 18.4 },
      { name: 'Cape Coral', country: 'USA', latitude: 26.5, longitude: -81.9 }
    ];

    cityRepoMock.getAllCities.mockResolvedValueOnce(mockCities);

    const result = await useCase.execute({ name: 'Cape' });

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Cape Town');
    expect(cityRepoMock.getAllCities).toHaveBeenCalled();
  });
});
