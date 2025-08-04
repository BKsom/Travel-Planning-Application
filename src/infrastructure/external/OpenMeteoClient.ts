import axios, { Axios } from "../../../node_modules/axios/index";

export class OpenMeteoClient {
  async fetchCurrentWeather(stationId: string): Promise<{
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
  }> {
    // Simulate with mock response — real API call here later
    const response = await axios.get(`https://api.openmeteo.com/observations/openmeteo/${stationId}/thb0`);
    
    const [timestamp, temperature, humidity, pressure] = response.data;

    return {
      temperature,
      humidity,
      windSpeed: Math.random() * 10, // placeholder
      precipitation: Math.random(),  // placeholder
    };
  }
}
