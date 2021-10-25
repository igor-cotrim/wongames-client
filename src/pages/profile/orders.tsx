import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Profile from 'templates/Profile'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

import protectedRoutes from 'utils/protected-routes'
import { ordersMapper } from 'utils/mappers'
import { initializeApollo } from 'utils/apollo'

import {
  QueryOrders,
  QueryOrdersVariables
} from 'graphql/generated/QueryOrders'
import { QUERY_ORDERS } from 'graphql/queries/orders'

export default function Cards({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<QueryOrders, QueryOrdersVariables>({
    query: QUERY_ORDERS,
    variables: {
      identifier: session?.id as string
    }
  })

  return {
    props: {
      items: ordersMapper(data.orders),
      session
    }
  }
}
