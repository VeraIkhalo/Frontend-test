import styled from 'styled-components'
import { ExpandIcon, PinIcon, ReplyIcon } from './icons'

type Message = {
  from: 'user' | 'agent' | 'system'
  text: string
  time?: string
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
  },
  { from: 'user', text: 'Yes, it’s olivia.Mckinsey@gmail.com', time: '23:16' },
  {
    from: 'agent',
    text: 'Thanks! Looks like your reset wasn’t completed. I’ve sent a new link – please check your inbox.',
    time: '23:16',
  },
  { from: 'user', text: 'I see it. resetting now...', time: '23:17' },
  { from: 'user', text: "Done! I'm logged in. Thanks!", time: '23:20' },
  {
    from: 'agent',
    text: "Perfect 🎉 Your plan is ready under “My Programs”. Since you’re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium",
    time: '23:20',
  },
  { from: 'user', text: "Oh my god 😍 I'll try it ASAP, thank you so much!!", time: '23:23' },
]

export function ChatWindow() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Olivia Mckinsey</PanelTitle>
        <HeaderActions>
          <IconButton $variant="ghost" aria-label="Reply">
            <ReplyIcon size={16} />
          </IconButton>
          <IconButton $variant="ghost" aria-label="Expand">
            <ExpandIcon size={16} />
          </IconButton>
          <IconButton $variant="ghost" aria-label="Pin">
            <PinIcon size={16} />
          </IconButton>
        </HeaderActions>
      </PanelHeader>
      <ChatWindowShell>
        <Chip style={{ margin: '12px auto 0' }}>28 August 2025</Chip>
        <ChatContent>
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              $variant={
                msg.from === 'agent' ? 'outgoing' : msg.from === 'user' ? 'incoming' : 'system'
              }
            >
              {msg.text}
              {msg.time && <MessageTime>{msg.time}</MessageTime>}
            </MessageBubble>
          ))}
        </ChatContent>
        <ChatFooter>
          <IconButton aria-label="Sun">☀️</IconButton>
          <IconButton aria-label="Emoji">😊</IconButton>
          <IconButton aria-label="Attach">📎</IconButton>
          <IconButton aria-label="Camera">📷</IconButton>
          <ChatInput placeholder="Type something..." />
          <IconButton $variant="solid" aria-label="Send">
            ✈️
          </IconButton>
        </ChatFooter>
      </ChatWindowShell>
    </Panel>
  )
}

const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
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
  font-weight: 700;
  font-size: 18px;
  color: #111827;
`

const HeaderActions = styled.div`
  display: inline-flex;
  gap: 8px;
`

const IconButton = styled.button<{ $variant?: 'ghost' | 'solid' }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  display: grid;
  place-items: center;
  color: #6b7280;
  transition: background 0.15s ease, border 0.15s ease;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }

  ${({ $variant }) =>
    $variant === 'ghost' &&
    `
      background: #f8fafc;
      border-color: #e5e7eb;
    `}

  ${({ $variant }) =>
    $variant === 'solid' &&
    `
      background: #0f172a;
      color: #fff;
      border-color: #0f172a;
    `}
`

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #111827;
  font-weight: 600;
  font-size: 13px;
`

const ChatWindowShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ChatContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(#f9fafb, #f7f8fb);
`

const MessageBubble = styled.div<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  max-width: 78%;
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.55;
  position: relative;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05);
  background: ${({ $variant }) =>
    $variant === 'outgoing' ? '#eadff8' : $variant === 'system' ? '#f8fafc' : '#f5f6f7'};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'outgoing' ? '#e0d6f2' : $variant === 'system' ? '#e5e7eb' : '#e5e7eb'};
  color: ${({ $variant }) =>
    $variant === 'outgoing' ? '#4b286d' : $variant === 'system' ? '#6b7280' : '#1f2937'};
  margin-left: ${({ $variant }) => ($variant === 'outgoing' ? 'auto' : '0')};
  align-self: ${({ $variant }) => ($variant === 'system' ? 'center' : 'flex-start')};
`

const MessageTime = styled.span`
  display: block;
  color: #9ca3af;
  font-size: 12px;
  margin-top: 6px;
`

const ChatFooter = styled.div`
  margin-top: auto;
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 8px;
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
  background: #f8fafc;
  font-size: 14px;
`

