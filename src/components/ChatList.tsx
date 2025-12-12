import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Union from '../assets/union.svg'
import ChevronDown from '../assets/chevron-down.svg'
import Edit from '../assets/edit.svg'
import Search from '../assets/search.svg'
import Filter from '../assets/filter.svg'
import { fetchUsers, fetchPosts } from '../services/api'

type Chat = {
  id: number
  name: string
  snippet: string
  time: string
  color: 'blue' | 'gold' | 'red' | 'green' | 'gray' | 'purple' | 'orange'
  active?: boolean
}

const colors: Array<'blue' | 'gold' | 'red' | 'green' | 'gray' | 'purple' | 'orange'> = [
  'purple', 'gold', 'blue', 'red', 'gold', 'orange', 'blue', 'gold', 'blue', 'green'
]

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function getSnippet(text: string, maxLength: number = 40): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

interface ChatListProps {
  onSelectUser: (userId: number) => void
  selectedUserId: number
}

export function ChatList({ onSelectUser, selectedUserId }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadChats() {
      try {
        setLoading(true)
        const users = await fetchUsers()
        const posts = await fetchPosts()


        const chatsData: Chat[] = users.slice(0, 9).map((user, index) => {
          const userPosts = posts.filter(p => p.userId === user.id)
          const latestPost = userPosts[userPosts.length - 1]
          const now = new Date()
          const timeAgo = new Date(now.getTime() - (index * 60000 * (5 + Math.random() * 60)))

          return {
            id: user.id,
            name: user.name,
            snippet: latestPost ? getSnippet(latestPost.body) : 'No messages yet...',
            time: formatTime(timeAgo),
            color: colors[index % colors.length],
            active: user.id === selectedUserId
          }
        })

        setChats(chatsData)
        setError(null)
      } catch (err) {
        setError('Failed to load chats')
        console.error('Error loading chats:', err)
      } finally {
        setLoading(false)
      }
    }

    loadChats()
  }, [selectedUserId])

  const handleChatClick = (userId: number) => {
    onSelectUser(userId)
  }
  return (
    <Panel>
      <PanelHeader>
        <HeaderIconButton aria-label="Menu">
          <ListIcon src={Union} alt='union' />

        </HeaderIconButton>
        <PanelTitle>Michael Johnson</PanelTitle>
        <HeaderIconButton aria-label="New Chat">
          <ListIcon src={Edit} alt='edit icon' />
        </HeaderIconButton>
      </PanelHeader>
      <PanelBody>
        <InputShell>
          <ListIcon src={Search} alt='search icon' />
          <SearchInput placeholder="Search Chat" />
          <ListIcon src={Filter} alt='filter icon' />
        </InputShell>
        <FilterRow>
          <Pill $variant="silver">
            Open <ListIcon src={ChevronDown} alt='chevron down' />
          </Pill>
          <FilterGroup>

            <Pill $variant="silver">
              Newest <ListIcon src={ChevronDown} alt='chevron down' />
            </Pill>
          </FilterGroup>
        </FilterRow>
        {loading && <LoadingMessage>Loading chats...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && chats.map((chat) => (
          <ListItem
            key={chat.id}
            $active={chat.active}
            onClick={() => handleChatClick(chat.id)}
            style={{ cursor: 'pointer' }}
          >
            <Avatar $tone={chat.color}>{chat.name.charAt(0)}</Avatar>
            <ItemMeta>
              <ItemRow>
                <ItemName>{chat.name}</ItemName>
                <TimeStamp>{chat.time}</TimeStamp>
              </ItemRow>
              <ItemSnippet>{chat.snippet}</ItemSnippet>
            </ItemMeta>
          </ListItem>
        ))}
      </PanelBody>
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
  position: relative;
`

const ListIcon = styled.img`
  
`

const PanelTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #000000;
  position: absolute;
  left: 30%;
  transform: translateX(-50%);
`

const PanelBody = styled.div`
  padding: 12px 16px 16px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InputShell = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 5px;
`

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 10px;
  padding: 0;

  &:focus {
    outline: none;
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Pill = styled.div<{ $variant?: 'blue' | 'silver' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px;
  cursor:pointer;
  font-weight: 600;
  color: #000000;
  font-size: 10px;

  ${({ $variant }) =>
    $variant === 'blue' &&
    `
      background: #e8efff;
      color: #4338ca;
      border-color: #e0e7ff;
    `}

  ${({ $variant }) =>
    $variant === 'silver' &&
    `
     
      border-color: #edf0f5;
    `}
`

const HeaderIconButton = styled.button`
  width: auto;
  height: auto;
  border: none;
  background: transparent;
  display: grid;
  place-items: center;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #111827;
  }
`

const ListItem = styled.div<{ $active?: boolean }>`
  padding: 6px 9px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? '#0000001F' : 'tramsparent')};
  box-shadow: ${({ $active }) => ($active ? '0px 3px 8px rgba(0, 0, 0, 0.06)' : '')};
  display: flex;
  height:50px;
  gap: 10px;
  align-items: center;
  background: ${({ $active }) => ($active ? '' : '#ffffff')};
  transition: border 0.15s ease, background 0.15s ease;
`

const Avatar = styled.div<{ $tone: Chat['color'] }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size:10px;
  font-weight: 600;
  color: #000;
  background: ${({ $tone }) =>
  ({
    blue: '#60a5fa',
    gold: '#f59e0b',
    red: '#ef4444',
    green: '#10b981',
    gray: '#9ca3af',
    purple: '#7c3aed',
    orange: '#f97316',
  }[$tone])};
`

const ItemMeta = styled.div`
  flex: 1;
  min-width: 0;
`

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

const ItemName = styled.span`
  font-weight: 600;
  color: #000000;
  font-size: 10px;
  font-size: 9.82px;
  line-height: 100%;
  letter-spacing: 0%;

`

const ItemSnippet = styled.div`
  color: #00000080;
  font-weight: 500;
  font-style: Regular;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0%;
  margin-top: 1px;

`

const TimeStamp = styled.span`
  color: #000000CC;
  font-size: 8px;
  font-weight: 600;
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

