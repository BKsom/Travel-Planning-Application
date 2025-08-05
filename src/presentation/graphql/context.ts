import Container  from '../../container/Container';

export type GraphQLContext = {
  container: typeof Container;
};

export const createContext = (): GraphQLContext => {
  return {
    container: Container
  };
};
