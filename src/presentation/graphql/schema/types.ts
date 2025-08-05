// import { gql } from '@apollo/server';
import gql from 'graphql-tag';


export const typeDefs = gql`
  enum Activity {
    SKIING
    SURFING
    INDOOR_SIGHTSEEING
    OUTDOOR_SIGHTSEEING
  }

  type Temperature {
    celsius: Float!
  }

  type City {
    name: String!
    country: String
    latitude: Float!
    longitude: Float!
  }

  type Weather {
    description: String!
    temperature: Temperature!
    humidity: Int!
    windSpeed: Float!
    pressure: Int!
    icon: String
  }

  type RecommendedActivity {
    activity: Activity!
    score: Float!
    reason: String!
  }

  type Query {
    citySuggestions(name: String!): [City!]!
    weatherForecast(latitude: Float!, longitude: Float!): Weather
    recommendActivities(latitude: Float!, longitude: Float!): [RecommendedActivity!]!
  }
`;
