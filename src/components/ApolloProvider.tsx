'use client';
import React, { useState } from 'react';
import { ApolloClient, ApolloProvider as BaseApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

function makeClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache(),
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(makeClient);
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
