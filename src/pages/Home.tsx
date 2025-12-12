import styled, { keyframes } from 'styled-components'
import AvatarPolygon from '../assets/avatar-polygon.svg'
import BoxPolygon from '../assets/box-polygon.svg'
import StarPolygon from '../assets/star-polygon.svg'
import Polygon from '../assets/polygon.svg'
import WorkflowPolygon from '../assets/workflow.svg'
import WorkPolygon from '../assets/work.svg'

function App() {
    return (
        <>
            <Main>
                <NextLevel>
                    <Groupp>
                        <PolygonOne src={StarPolygon} alt="Avatar" />
                        <PolygonTwo src={BoxPolygon} alt="Avatar" />
                        <PolygonThree src={AvatarPolygon} alt="Avatar" />
                    </Groupp>
                    <CentralContainer>
                        <GreenBorder>
                            <PolygonContainer>
                                <PolygonImage src={Polygon} alt="Polygon" />
                            </PolygonContainer>
                        </GreenBorder>
                        <TextContainer>
                            <Title>Extracting Information...</Title>
                            <Subtitle>We are extracting information from the above honey combs to your system</Subtitle>
                        </TextContainer>
                    </CentralContainer>
                    <Group>
                        <AvatarPolygonOne src={AvatarPolygon} alt="Avatar" />
                        <AvatarPolygonTwo src={WorkflowPolygon} alt="Avatar" />
                        <AvatarPolygonThree src={WorkPolygon} alt="Avatar" />
                    </Group>
                </NextLevel>
            </Main>
        </>
    )
}

export default App


const Main = styled.div`
  width: 100%;
  height: 100vh;
  background: #001132;
  padding: 20px;
`

const NextLevel = styled.div`
  border-radius:24px;
  border:2px solid #FFFFFF1A;
  height:100%;
  background: radial-gradient(ellipse at 70% 50%, #009EFF 0%, #292E6B 60%, #1F223D 100%);
  position: relative;
  overflow: hidden;
`

const Group = styled.div`
  
`

const Groupp = styled.div`

  
`

const swirl = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const CentralContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`

const GreenBorder = styled.div`
 
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`

const PolygonContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PolygonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${swirl} 3s linear infinite;
  cursor:pointer;
`

const PolygonOne = styled.img`
  position: absolute;
  top: 10%;
  left: 15%;
  width: 90px;
  height: 90px;
  object-fit: contain;
  z-index: 3;
  cursor:pointer;
  
`

const PolygonTwo = styled.img`
  position: absolute;
  top: 40%;
  left: 5%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor:pointer;
 
`
const PolygonThree = styled.img`
  position: absolute;
  top: 50%;
  left: 20%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor:pointer;
 
`

const AvatarPolygonOne = styled.img`
  position: absolute;
  top: 10%;
  right: 15%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor:pointer;
  
`

const AvatarPolygonTwo = styled.img`
  position: absolute;
  top: 50%;
  right: 18%;
  object-fit: contain;
  z-index: 3;
  width: 60px;
  height: 60px;
  cursor:pointer;
`

const AvatarPolygonThree = styled.img`
  position: absolute;
  top: 20%;
  right: 30%;
  object-fit: contain;
  z-index: 3;
  width: 90px;
  height: 90px;
  cursor:pointer;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`

const Title = styled.h1`
  color: #ffffff;
  margin: 0;
  font-family: Roboto;
    font-weight: 700;
    font-style: Bold;
    font-size: 38px;
    leading-trim: NONE;
    line-height: 120%;
    letter-spacing: 0%;
    text-align: center;

`

const Subtitle = styled.p`
  color: #ffffff;
  margin: 0;
  max-width: 500px;


  font-family: Ronzino;
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 120%;
letter-spacing: 0%;
text-align: center;

`