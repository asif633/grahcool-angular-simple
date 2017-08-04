import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj5uzozhvk2rq0123clix1hs5',
  });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    console.log('token', localStorage.getItem('token'));
    req.options.headers.authorization = `Bearer ${localStorage.getItem('token') || null}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface, 
  dataIdFromObject: (object: any): string => {
			return object.id;
		}
});

export function provideClient(): ApolloClient {
  return client;
}

