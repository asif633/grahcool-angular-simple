import { ApolloClient, createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj5uzozhvk2rq0123clix1hs5'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

