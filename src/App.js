/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { useReducer, createContext } from 'react';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, Redirect } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { reducer, initialState } from './store/reducer';
import AuthContainer from './containers/AuthContainer';
import LoginContainer from './containers/LoginContainer';
import SearchContainer from './containers/SearchContainer';

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

const ADVISOR_AUTHENTICATE = gql`
  query {
    advisorAuthenticated
  }
`;

const AuthRoute = ({ component: Component, ...rest }) => (
  <Query query={ADVISOR_AUTHENTICATE}>
    {({ loading, error }) => {
      if (loading) return 'Loading...';
      if (error) return <Redirect to='/' noThrow />;
      return <AuthContainer><Component {...rest} /></AuthContainer>;
    }}
  </Query>
);

const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApolloProvider client={client}>
      <Global styles={css`${global}`}/>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <LoginContainer path='/' />
          <AuthRoute component={SearchContainer} path='/member' />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;

const global = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  a {
    text-decoration: none;
  }
`;
