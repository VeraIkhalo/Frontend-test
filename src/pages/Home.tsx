import styled from 'styled-components'
import Images from '../assets/images.svg'

function App() {
  return (
    <>
      <Main>
        <NextLevel>
            <ImageGroup src={Images} alt='' />
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
`

const ImageGroup = styled.img`
  width:100%;
`