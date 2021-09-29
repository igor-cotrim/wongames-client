import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Profile from 'templates/Profile'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import mockItems from 'components/OrdersList/mock'

import protectedRoutes from 'utils/protected-routes'

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

  return {
    props: {
      items: mockItems,
      session
    }
  }
}
