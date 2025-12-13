import { useState, useEffect } from 'react'
import styled from 'styled-components'
import OptionIcon from '../assets/option-icon.svg'
import DownloadIcon from '../assets/download-icon.svg'
import MoonIcon from '../assets/moon-icon.svg'
import TickIcon from '../assets/tick-icon.svg'
import File from '../assets/file.svg'
import Video from '../assets/video.svg'
import Document from '../assets/document.svg'
import Emoji from '../assets/emoji.svg'
import Forward from '../assets/forward.svg'
import Audio from '../assets/audio.svg'
import Vector from '../assets/vector.svg'
import { fetchPostsWithComments, fetchUser, type User } from '../services/api'

type Message = {
  from: 'user' | 'agent' | 'system'
  text: string
  time?: string
  status?: 'read' | 'sent'
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatDate(date: Date): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

interface ChatWindowProps {
  userId: number
}

export function ChatWindow({ userId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadChat() {
      try {
        setLoading(true)
        const [userData, postsWithComments] = await Promise.all([
          fetchUser(userId),
          fetchPostsWithComments(userId)
        ])

        setUser(userData)

        const messagesData: Message[] = []
        const now = new Date()

        postsWithComments.slice(0, 5).forEach((post, postIndex) => {
          const postTime = new Date(now.getTime() - ((postsWithComments.length - postIndex) * 60000 * 15))

          messagesData.push({
            from: 'user',
            text: post.body,
            time: formatTime(postTime)
          })

          if (post.comments.length > 0) {
            const comment = post.comments[0]
            const commentTime = new Date(postTime.getTime() + 300000) 
            messagesData.push({
              from: 'agent',
              text: comment.body,
              time: formatTime(commentTime),
              status: 'read'
            })
          }
        })

        setMessages(messagesData)
        setError(null)
      } catch (err) {
        setError('Failed to load chat')
        console.error('Error loading chat:', err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadChat()
    }
  }, [userId])
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{user?.name || 'Loading...'}</PanelTitle>
        <HeaderActions>
          <Icon src={OptionIcon} alt='' />
          <Icon src={MoonIcon} alt='' />
          <Icon src={DownloadIcon} alt='' />
        </HeaderActions>
      </PanelHeader>
      <ChatWindowShell>
        <Chip style={{ margin: '12px auto 0' }}>{formatDate(new Date())}</Chip>
        <ChatContent>
          {loading && <LoadingMessage>Loading messages...</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!loading && !error && messages.map((msg, idx) => {
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
          <ChatInput placeholder="Type something...." rows={4} />
          <IconOne>
            <FooterIcon aria-label="Gallery">
              <Icons src={File} alt='' />
            </FooterIcon>
            <FooterIcon aria-label="File"><Icons src={Video} alt='' /></FooterIcon>
            <FooterIcon aria-label="Emoji"><Icons src={Document} alt='' /></FooterIcon>
            <FooterIcon aria-label="Reply"><Icons src={Emoji} alt='' /></FooterIcon>
            <FooterIcon aria-label="Reply"><Icons src={Forward} alt='' /></FooterIcon>
          </IconOne>
          <IconTwo>
            <FooterIcon aria-label="Lightning"><Icons src={Vector} alt='' /></FooterIcon>
            <FooterIcon aria-label="Mic"><Icons src={Audio} alt='' /></FooterIcon>
          </IconTwo>
        </ChatFooter>
      </ChatWindowShell>
    </Panel>
  )
}

const Panel = styled.section`
  margin:0 8px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 28px #0000001F;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  @media (max-width: 640px) {
    margin: 0;
    border-radius: 0;
  }
`

const PanelHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #fff;

  @media (max-width: 640px) {
    padding: 12px 16px;
  }
`

const PanelTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  color: #000000;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`

const Icon = styled.img`
  cursor: pointer;

  @media (max-width: 640px) {
    width: 16px;
    height: 16px;
  }
`

const HeaderActions = styled.div`
  display: inline-flex;
  gap: 6px;

  @media (max-width: 640px) {
    gap: 4px;
  }
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
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding: 12px 12px 8px;
    gap: 10px;
  }
`

const MessageRow = styled.div<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  display: flex;
  align-items: flex-start;
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
    $variant === 'outgoing' ? '#EDE3FD' : $variant === 'system' ? '#EDE3FD' : '#EFF2F2'};
  color: #000000;
  margin-left: ${({ $variant }) => ($variant === 'outgoing' ? 'auto' : '0')};
  align-self: ${({ $variant }) => ($variant === 'system' ? 'center' : 'flex-start')};
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05);
  display:flex;
  align-items: center;

  @media (max-width: 640px) {
    max-width: 85%;
    padding: 8px 10px;
    font-size: 11px;
  }
`

const MessageMeta = styled.span<{ $variant: 'incoming' | 'outgoing' | 'system' }>`
  color: #000000;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  order: ${({ $variant }) => ($variant === 'outgoing' ? 1 : 1)};
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
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fff;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 960px) {
    position: sticky;
    bottom: 0;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
    gap: 8px;
  }
`

const ChatInput = styled.textarea`
  width: 100%;
  padding: 12px 18px;
  border-radius: 6px;
  border: 1px solid #D8DEE4;
  height:81px;
  outline:none;
  background: #FFFFFF;
  font-size: 10px;
  resize: none;

  @media (max-width: 640px) {
    padding: 12px 14px;
    height: 70px;
    font-size: 11px;
  }
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
  flex-shrink: 0;

  &:hover {
    background: #f1f2f3;
    border-radius: 50%;
  }

  @media (max-width: 640px) {
    width: 28px;
    height: 28px;
  }
`

const Icons = styled.img`
  width: 18px;
  height: 18px;

  @media (max-width: 640px) {
    width: 16px;
    height: 16px;
  }
`

const IconOne = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    position: static;
    justify-content: flex-start;
    gap: 6px;
  }
`

const IconTwo = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    position: static;
    justify-content: flex-end;
    gap: 6px;
  }
`

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 12px;
`

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #ef4444;
  font-size: 12px;
`
