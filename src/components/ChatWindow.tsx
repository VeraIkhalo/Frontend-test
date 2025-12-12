import styled from 'styled-components'
import OptionIcon from '../assets/option-icon.svg'
import DownloadIcon from '../assets/download-icon.svg'
import MoonIcon from '../assets/moon-icon.svg'
import TickIcon from '../assets/tick-icon.svg'

type Message = {
  from: 'user' | 'agent' | 'system'
  text: string
  time?: string
  status?: 'read' | 'sent'
}

const messages: Message[] = [
  {
    from: 'user',
    text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can’t login. Can you help?",
    time: '23:08',
  },
  {
    from: 'agent',
    text: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    time: '23:08',
    status: 'read',
  },
  { from: 'user', text: 'Yes, it’s olivia.Mckinsey@gmail.com', time: '23:16' },
  {
    from: 'agent',
    text: 'Thanks! Looks like your reset wasn’t completed. I’ve sent a new link – please check your inbox.',
    time: '23:16',
    status: 'read',
  },
  { from: 'user', text: 'I see it. resetting now...', time: '23:17' },
  { from: 'user', text: "Done! I'm logged in. Thanks!", time: '23:20' },
  {
    from: 'agent',
    text: "Perfect 🎉 Your plan is ready under “My Programs”. Since you’re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium",
    time: '23:20',
    status: 'read',
  },
  { from: 'user', text: "Oh my god 😍 I'll try it ASAP, thank you so much!!", time: '23:23' },
]

export function ChatWindow() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Olivia Mckinsey</PanelTitle>
        <HeaderActions>
          <Icon src={OptionIcon} alt='' />
          <Icon src={MoonIcon} alt='' />
          <Icon src={DownloadIcon} alt='' />
        </HeaderActions>
      </PanelHeader>
      <ChatWindowShell>
        <Chip style={{ margin: '12px auto 0' }}>28 August 2025</Chip>
        <ChatContent>
          {messages.map((msg, idx) => {
            const variant =
              msg.from === 'agent' ? 'outgoing' : msg.from === 'user' ? 'incoming' : 'system'
            return (
              <MessageRow key={idx} $variant={variant}>
                {variant === 'outgoing' && msg.time && (
                  <MessageMeta $variant={variant}>
                    {msg.time}
                    {msg.status === 'read' && <CheckIcon>
                      <Tick src={TickIcon} alt='' />
                      </CheckIcon>}
                  </MessageMeta>
                )}
                <MessageBubble $variant={variant}>{msg.text}</MessageBubble>
                {variant !== 'outgoing' && msg.time && (
                  <MessageMeta $variant={variant}>{msg.time}</MessageMeta>
                )}
              </MessageRow>
            )
          })}
        </ChatContent>
        <ChatFooter>
          <FooterIcon aria-label="Gallery">🖼️</FooterIcon>
          <FooterIcon aria-label="File">📄</FooterIcon>
          <FooterIcon aria-label="Emoji">😊</FooterIcon>
          <FooterIcon aria-label="Reply">↩︎</FooterIcon>
          <ChatInput placeholder="Type something...." />
          <FooterIcon aria-label="Lightning">⚡</FooterIcon>
          <FooterIcon aria-label="Mic">🎤</FooterIcon>
        </ChatFooter>
      </ChatWindowShell>
    </Panel>
  )
}

const Panel = styled.section`
  background: #ffffff;
  border-radius: 0 9px 9px 0;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const PanelHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #fff;
`

const PanelTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  color: #000000;
`

const Icon = styled.img`
  
`

const HeaderActions = styled.div`
  display: inline-flex;
  gap: 6px;
`

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding:8px 11px;
  border-radius: 6px;
  background: #EFF2F2;
  color: #000000;
  font-weight: 700;
  font-size: 9px;
`

const Tick = styled.img`
  
`

const ChatWindowShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ChatContent = styled.div`
  padding: 18px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #ffffff;
`

const MessageRow = styled.div<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  justify-content: ${({ $variant }) => ($variant === 'outgoing' ? 'flex-end' : 'flex-start')};
`

const MessageBubble = styled.div<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  max-width: 47%;
  padding: 6px;
  border-radius: 9px;
  font-size: 10px;
  line-height: 1.5;
  position: relative;
  background: ${({ $variant }) =>
    $variant === 'outgoing' ? '#d9cbf7' : $variant === 'system' ? '#EDE3FD' : '#EFF2F2'};
  border: 1px solid
    ${({ $variant }) =>
    $variant === 'outgoing' ? '#cfc0f0' : $variant === 'system' ? '#e5e7eb' : '#e5e7eb'};
  color: ${({ $variant }) =>
    $variant === 'outgoing' ? '#3a2b6b' : $variant === 'system' ? '#6b7280' : '#111827'};
  margin-left: ${({ $variant }) => ($variant === 'outgoing' ? 'auto' : '0')};
  align-self: ${({ $variant }) => ($variant === 'system' ? 'center' : 'flex-start')};
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
`

const MessageMeta = styled.span<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  color: #000000;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  order: ${({ $variant }) => ($variant === 'outgoing' ? -1 : 1)};
  font-weight: 500;
  font-style: Regular;
  font-size: 7px;
  line-height: 100%;
  letter-spacing: 0%;

`

const CheckIcon = styled.span`
  font-size: 10px;
  color: #62a0ff;
`

const ChatFooter = styled.div`
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;

  @media (max-width: 960px) {
    position: sticky;
    bottom: 0;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
  }
`

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f7f7f7;
  font-size: 14px;
`

const FooterIcon = styled.button`
  border: none;
  background: transparent;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #f1f2f3;
    border-radius: 50%;
  }
`

