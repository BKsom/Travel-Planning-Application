export class Weather {
  constructor(
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly windSpeed: number,  
    public readonly precipitation: number, 
    public readonly timestamp: number     
  ) {}
}


