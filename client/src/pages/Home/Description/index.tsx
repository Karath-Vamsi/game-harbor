import rawg from 'assets/images/RAWG.png'
import { ReactComponent as Github } from 'assets/images/github.svg'
import {
  StyledDescription,
  Pitch,
  Links,
  Link,
  RAWGLogo,
  EnjoyBlock,
  Header,
} from 'pages/Home/Description/styles'

const Description = () => (
  <StyledDescription>
    <Pitch>
      <Header>GameStop</Header>
      <h3>LEVEL UP YOUR PLAY</h3>
      <p>
      This is not a commercial project. All of the prices are generated to imitate a real game shop. Inspired from RAWG API's rawg.io .
      </p>
      <EnjoyBlock>
        {/* <p>Enjoy</p> <p>😉</p> */}
      </EnjoyBlock>
    </Pitch>
    <Links>
      {/* <Link href="https://github.com/alex-dishen" target="_blank">
        <Github />
        alex-dishen
      </Link> */}
      <Link href="https://rawg.io/apidocs" target="_blank">
        <RAWGLogo src={rawg} alt="RAWG logo" />
        RAWG API
      </Link>
    </Links>
  </StyledDescription>
)

export default Description
