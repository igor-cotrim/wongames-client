import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import FormProfile from 'components/FormProfile'
import Profile from 'templates/Profile'

import protectedRoutes from 'utils/protected-routes'

export default function Me() {
  return (
    <Profile>
      <FormProfile />
    </Profile>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await protectedRoutes(context)

  return {
    props: { session }
  }
}
