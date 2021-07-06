import { Container } from 'components/Container'
import Footer from 'components/Footer'
import Heading from 'components/Heading'
import Menu from 'components/Menu'

// import * as S from './styles'

const Home = () => (
  <section>
    <Container>
      <Menu />
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary" color="black">
        News Releases
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Most Populars
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Comming Soon
      </Heading>
    </Container>

    <Container>
      <Heading lineLeft lineColor="secondary">
        Free Games
      </Heading>
    </Container>

    <Container>
      <Footer />
    </Container>
  </section>
)

export default Home
