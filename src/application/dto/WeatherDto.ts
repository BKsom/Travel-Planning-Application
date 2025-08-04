export interface WeatherDto {
  description: string;
  temperature: {
    celsius: number;
  };
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon?: string;
}
