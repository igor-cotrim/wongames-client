import { useMemo } from 'react'
import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: apolloCache
  })
}

export function initializeApollo(initialState = null) {
  // verificar se já existe uma instância, para não criar outra
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  //recuperando os dados do cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  //sempre inicializando no SSR com cache limpo
  if (typeof window === 'undefined') return apolloClientGlobal

  //cria o apolloClient se estiver no client side
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}
