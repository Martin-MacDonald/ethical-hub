import React, { useReducer, createContext } from 'react';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { reducer, initialState } from './store/reducer';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ state, dispatch }}>

      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;
