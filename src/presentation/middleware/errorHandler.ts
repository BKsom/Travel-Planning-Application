import { GraphQLError } from 'graphql';
import { AppError } from '../../shared/errors/AppError';

export function formatGraphQLError(error: GraphQLError) {
  const originalError = error.originalError;

  if (originalError instanceof AppError) {
    return {
      message: originalError.message,
      code: originalError.statusCode
    //   details: originalError.details,
    };
  }

  return {
    message: error.message,
    code: 500,
  };
}
