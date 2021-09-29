import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Profile from 'templates/Profile'
import CardsList, { CardsListProps } from 'components/CardsList'
import mockCards from 'components/PaymentOptions/mock'

import protectedRoutes from 'utils/protected-routes'

export default function Cards({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await protectedRoutes(context)

  return {
    props: {
      cards: mockCards,
      session
    }
  }
}
