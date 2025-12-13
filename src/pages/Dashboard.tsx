import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
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

const slideUpFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

function App({ animatingIcon }: DashboardProps) {
  const [selectedUserId, setSelectedUserId] = useState<number>(1)
  const [showContent, setShowContent] = useState(false)
  const [sectionsLoaded, setSectionsLoaded] = useState({
    sidebar: false,
    chatList: false,
    chatWindow: false,
    detailsPanel: false
  })

  useEffect(() => {
    const skeletonDelay = 300
    
    setTimeout(() => {
      setShowContent(true)
      
      const loadDelays = {
        sidebar: skeletonDelay + 500,
        chatList: skeletonDelay + 800,
        chatWindow: skeletonDelay + 1100,
        detailsPanel: skeletonDelay + 1400
      }

      Object.entries(loadDelays).forEach(([section, delay]) => {
        setTimeout(() => {
          setSectionsLoaded(prev => ({ ...prev, [section]: true }))
        }, delay)
      })
    }, skeletonDelay)
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
        {!showContent ? (
          <>
            <EmptyPanel />
            <EmptyPanel />
            <EmptyPanel />
            <EmptyPanel />
          </>
        ) : (
          <>
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
          </>
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
  height: 100vh;
  padding: 8px;
  background: #EFF0EB;
  animation: ${slideUpFromBottom} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: bottom;
`

const LayoutGrid = styled.main`
  display: grid;
  grid-template-columns: 270px 350px 1fr 390px;
  padding: 8px 0;
  flex: 1;
  min-height: 0;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 240px 320px 1fr;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

const EmptyPanel = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  border: 1px solid #e5e7eb;
  min-height: calc(100vh - 100px);
  
  &:first-child {
    border-radius: 11px 0 0 11px;
    border-right: 1px solid #e5e7eb;
  }
  
  &:nth-child(2) {
    border-radius: 0 9px 9px 0;
  }
  
  &:last-child {
    border-radius: 16px;
  }
`
