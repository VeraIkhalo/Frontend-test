import styled from 'styled-components'
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

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`

const NextLevel = styled.div`
  border-radius: 24px;
  border: 2px solid #FFFFFF1A;
  height: 100%;
  background: radial-gradient(ellipse at 70% 50%, #009EFF 0%, #292E6B 60%, #1F223D 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -200px;
    width: 600px;
    height: 600px;
    border: 3px solid transparent;
    border-top: 3px solid rgba(0, 158, 255, 0.8);
    border-right: 3px solid rgba(0, 158, 255, 0.6);
    border-radius: 50%;
    transform: rotate(0deg);
    animation: rotateLine 8s linear infinite;
    z-index: 0;
    pointer-events: none;
    filter: drop-shadow(0 0 15px rgba(0, 158, 255, 0.7));

    @media (max-width: 768px) {
      width: 400px;
      height: 400px;
      right: -150px;
      border-width: 2px;
    }

    @media (max-width: 480px) {
      width: 300px;
      height: 300px;
      right: -100px;
      border-width: 2px;
    }
  }

  @keyframes rotateLine {
    0% {
      transform: rotate(0deg);
      filter: drop-shadow(0 0 15px rgba(0, 158, 255, 0.7));
    }
    50% {
      filter: drop-shadow(0 0 25px rgba(0, 158, 255, 1));
    }
    100% {
      transform: rotate(360deg);
      filter: drop-shadow(0 0 15px rgba(0, 158, 255, 0.7));
    }
  }
`;

const Group = styled.div`
`

const Groupp = styled.div`
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
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    top: 10%;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    top: 8%;
    padding: 0 12px;
  }
`

const GreenBorder = styled.div`
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 20px;
  }
`

const PolygonContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`

const PolygonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    left: 10%;
    top: 8%;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    left: 8%;
    top: 5%;
  }
`

const PolygonTwo = styled.img`
  position: absolute;
  top: 40%;
  left: 5%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    left: 5%;
    top: 35%;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    left: 5%;
    top: 30%;
  }
`
const PolygonThree = styled.img`
  position: absolute;
  top: 50%;
  left: 20%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    left: 15%;
    top: 45%;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    left: 12%;
    top: 40%;
  }
`

const AvatarPolygonOne = styled.img`
  position: absolute;
  top: 10%;
  right: 15%;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 3;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    right: 10%;
    top: 8%;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    right: 8%;
    top: 5%;
  }
`

const AvatarPolygonTwo = styled.img`
  position: absolute;
  top: 50%;
  right: 18%;
  object-fit: contain;
  z-index: 3;
  width: 60px;
  height: 60px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    right: 12%;
    top: 45%;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    right: 10%;
    top: 40%;
  }
`

const AvatarPolygonThree = styled.img`
  position: absolute;
  top: 20%;
  right: 30%;
  object-fit: contain;
  z-index: 3;
  width: 90px;
  height: 90px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    right: 20%;
    top: 18%;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    right: 15%;
    top: 15%;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    gap: 10px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
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
  width: 100%;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    line-height: 130%;
  }
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
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
    padding: 0 8px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 140%;
    padding: 0 4px;
  }
`