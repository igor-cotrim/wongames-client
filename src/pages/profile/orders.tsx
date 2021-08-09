import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetServerSideProps } from 'next'

import Profile from 'templates/Profile'

import mockItems from 'components/OrdersList/mock'

export default function Cards({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      items: mockItems
    }
  }
}
