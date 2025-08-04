export class Weather {
  constructor(
    public temperature: { celsius: number },       // Celsius
    public humidity: number,          // Percentage
    public windSpeed: number,         // m/s
    public pressure: number,          // hPa
    public description: string,       // "clear", "storm", etc.
    public icon?: string              // Optional weather icon code
  ) {}
}
