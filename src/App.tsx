import styled from 'styled-components'
import './index.css'
import { Topbar } from './components/Topbar'
import { Sidebar } from './components/Sidebar'
import { ChatList } from './components/ChatList'
import { ChatWindow } from './components/ChatWindow'
import { DetailsPanel } from './components/DetailsPanel'

function App() {
  return (
    <AppShell>
      <Topbar />
      <LayoutGrid>
        <Sidebar />
        <ChatList />
        <ChatWindow />
        <DetailsPanel />
      </LayoutGrid>
    </AppShell>
  )
}

export default App

const AppShell = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Compact";
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding:8px;
  background: #EFF0EB;
`

const LayoutGrid = styled.main`
  display: grid;
  grid-template-columns: 270px 350px 1fr 390px;
  padding: 8px 0;
  min-height: calc(100vh - 68px);

  @media (max-width: 1200px) {
    grid-template-columns: 240px 320px 1fr;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`
