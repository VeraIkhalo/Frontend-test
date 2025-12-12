import { useState, useEffect } from 'react'
import styled from 'styled-components'
import '../index.css'
import { Topbar } from '../components/Topbar'
import { Sidebar } from '../components/Sidebar'
import { ChatList } from '../components/ChatList'
import { ChatWindow } from '../components/ChatWindow'
import { DetailsPanel } from '../components/DetailsPanel'
import { 
  SkeletonSidebar, 
  SkeletonChatList, 
  SkeletonChatItem, 
  SkeletonChatWindow,
  SkeletonDetailsPanel,
  SkeletonMessageBubble,
  SkeletonHeader,
  SkeletonListItem,
  AnimatedIcon
} from '../components/SkeletonComponents'

interface DashboardProps {
  selectedSection: string | null
  animatingIcon: {
    src: string
    fromX: number
    fromY: number
    toX: number
    toY: number
  } | null
}

function App({ selectedSection, animatingIcon }: DashboardProps) {
  const [selectedUserId, setSelectedUserId] = useState<number>(1)
  const [sectionsLoaded, setSectionsLoaded] = useState({
    sidebar: false,
    chatList: false,
    chatWindow: false,
    detailsPanel: false
  })

  useEffect(() => {
    // Simulate progressive loading based on selected section
    const loadDelays = {
      sidebar: 300,
      chatList: 600,
      chatWindow: 900,
      detailsPanel: 1200
    }

    Object.entries(loadDelays).forEach(([section, delay]) => {
      setTimeout(() => {
        setSectionsLoaded(prev => ({ ...prev, [section]: true }))
      }, delay)
    })
  }, [])

  return (
    <AppShell>
      {animatingIcon && (
        <AnimatedIcon
          src={animatingIcon.src}
          $fromX={animatingIcon.fromX}
          $fromY={animatingIcon.fromY}
          $toX={animatingIcon.toX}
          $toY={animatingIcon.toY}
          alt="Animating icon"
        />
      )}
      <Topbar />
      <LayoutGrid>
        {!sectionsLoaded.sidebar ? (
          <SkeletonSidebar>
            <SkeletonHeader />
            {[...Array(5)].map((_, i) => (
              <SkeletonListItem key={i} style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </SkeletonSidebar>
        ) : (
          <Sidebar />
        )}
        
        {!sectionsLoaded.chatList ? (
          <SkeletonChatList>
            <SkeletonHeader style={{ width: '120px', marginBottom: '12px' }} />
            {[...Array(6)].map((_, i) => (
              <SkeletonChatItem key={i} style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </SkeletonChatList>
        ) : (
          <ChatList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
        )}
        
        {!sectionsLoaded.chatWindow ? (
          <SkeletonChatWindow>
            <SkeletonHeader style={{ margin: '16px', width: '150px' }} />
            <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...Array(4)].map((_, i) => (
                <SkeletonMessageBubble 
                  key={i} 
                  $right={i % 2 === 1}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </SkeletonChatWindow>
        ) : (
          <ChatWindow userId={selectedUserId} />
        )}
        
        {!sectionsLoaded.detailsPanel ? (
          <SkeletonDetailsPanel>
            <SkeletonHeader style={{ width: '80px', marginBottom: '12px' }} />
            {[...Array(8)].map((_, i) => (
              <SkeletonListItem key={i} style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </SkeletonDetailsPanel>
        ) : (
          <DetailsPanel userId={selectedUserId} />
        )}
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
