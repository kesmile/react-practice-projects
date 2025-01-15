import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_HOST,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'X-Parse-Application-Id': import.meta.env.VITE_PARSE_ID,
      'X-Parse-Client-Key': import.meta.env.VITE_PARSE_CLIENT_KEY,
      'X-Parse-Session-Token': JSON.parse(token ?? '')
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>,
)
