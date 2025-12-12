import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChevronDownIcon from '../assets/chevron-down.svg'
import TeamIconSrc from '../assets/teams-icon.svg'
import UserIconSrc from '../assets/user-icon.svg'
import { fetchUser, fetchPosts, type User, type Post } from '../services/api'

function SectionLabel({ title }: { title: string }) {
  return (
    <SectionLabelRow>
      <DetailLabel>{title}</DetailLabel>
      <ChevronDownImg src={ChevronDownIcon} alt="" width={14} height={14} />
    </SectionLabelRow>
  )
}

function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear().toString().slice(2)
  return `${month}/${day}/${year}`
}

function getFirstName(name: string): string {
  return name.split(' ')[0] || name
}

function getLastName(name: string): string {
  const parts = name.split(' ')
  return parts.slice(1).join(' ') || ''
}

interface DetailsPanelProps {
  userId: number
}

export function DetailsPanel({ userId }: DetailsPanelProps) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true)
        const [userData, postsData] = await Promise.all([
          fetchUser(userId),
          fetchPosts(userId)
        ])
        
        setUser(userData)
        setPosts(postsData)
        setError(null)
      } catch (err) {
        setError('Failed to load details')
        console.error('Error loading details:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) {
      loadDetails()
    }
  }, [userId])

  // Generate contact labels from user data
  const contactLabels = user ? [
    user.company?.name || 'Closed Won',
    user.address?.city || 'Chicago'
  ] : ['Closed Won', 'Chicago']

  // Use posts as other chats
  const otherChats = posts.slice(0, 3).map((post) => ({
    label: post.title.split(' ').slice(0, 2).join(' '),
    status: post.body.substring(0, 30) + '...',
    time: formatDate(new Date())
  }))

  if (loading) {
    return (
      <Panel $hiddenOnMobile>
        <PanelHeader>
          <PanelTitle>Details</PanelTitle>
          <span aria-hidden="true">⋮</span>
        </PanelHeader>
        <PanelBody>
          <LoadingMessage>Loading details...</LoadingMessage>
        </PanelBody>
      </Panel>
    )
  }

  if (error || !user) {
    return (
      <Panel $hiddenOnMobile>
        <PanelHeader>
          <PanelTitle>Details</PanelTitle>
          <span aria-hidden="true">⋮</span>
        </PanelHeader>
        <PanelBody>
          <ErrorMessage>{error || 'User not found'}</ErrorMessage>
        </PanelBody>
      </Panel>
    )
  }

  return (
    <Panel $hiddenOnMobile>
      <PanelHeader>
        <PanelTitle>Details</PanelTitle>
        <span aria-hidden="true">⋮</span>
      </PanelHeader>
      <PanelBody as={DetailsSection}>
        <SectionLabel title="Chat Data" />
        <DetailRow>
          <DetailLabel>Assignee</DetailLabel>
          <ValueChip>
            <IconImg src={UserIconSrc} alt="User" width={16} height={16} />
            {user.name.split(' ')[0]} {user.name.split(' ')[user.name.split(' ').length - 1]}
          </ValueChip>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Team</DetailLabel>
          <ValueChip>
            <IconImg src={TeamIconSrc} alt="Team" width={16} height={16} />
            {user.company?.name || 'Sales Team'}
          </ValueChip>
        </DetailRow>

        <SectionLabel title="Contact Data" />
        <DetailRow>
          <DetailLabel>First Name</DetailLabel>
          <DetailValue>{getFirstName(user.name)}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Last Name</DetailLabel>
          <DetailValue>{getLastName(user.name)}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Phone number</DetailLabel>
          <DetailValue>{user.phone}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Email</DetailLabel>
          <DetailValue>{user.email}</DetailValue>
        </DetailRow>
        {user.website && (
          <DetailRow>
            <DetailLabel>Website</DetailLabel>
            <DetailValue>{user.website}</DetailValue>
          </DetailRow>
        )}
        <DetailRow>
          <DetailLabel>See all</DetailLabel>
          <span />
        </DetailRow>

        <SectionLabel title="Contact Labels" />
        <TagsRow>
          {contactLabels.map((label) => (
            <Pill key={label} $variant="blue">
              {label}
            </Pill>
          ))}
          <Pill>+</Pill>
        </TagsRow>

        <SectionLabel title="Notes" />
        <NotesBox>{user.company?.catchPhrase || 'Strong potential for future upgrades'}</NotesBox>

        <SectionLabel title="Other Chats" />
        {otherChats.map((chat) => (
          <ListItem key={chat.label} style={{ gap: 10 }}>
            <ItemMeta>
              <ItemRow>
                <ItemName>{chat.label}</ItemName>
                <TimeStamp>{chat.time}</TimeStamp>
              </ItemRow>
              <ItemSnippet>{chat.status}</ItemSnippet>
            </ItemMeta>
          </ListItem>
        ))}
      </PanelBody>
    </Panel>
  )
}

const Panel = styled.section<{ $hiddenOnMobile?: boolean }>`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${({ $hiddenOnMobile }) =>
    $hiddenOnMobile &&
    `
      @media (max-width: 1200px) {
        display: none;
      }
    `}
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
  font-size: 13px;
  color: #111827;
`

const PanelBody = styled.div`
  padding: 12px 16px 16px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`

const SectionLabelRow = styled(DetailRow)`
  padding: 2px 0;
`

const DetailLabel = styled.span`
  color: #6b7280;
  font-weight: 600;
  font-size: 10px;
`

const DetailValue = styled.span`
  color: #111827;
  font-weight: 700;
  font-size: 10px;
`

const ValueChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
`

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const NotesBox = styled.div`
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
  padding: 12px;
  color: #92400e;
  font-weight: 600;
`

const Pill = styled.div<{ $variant?: 'blue' | 'silver' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-weight: 600;
  color: #6b7280;
  font-size: 10px;

  ${({ $variant }) =>
    $variant === 'blue' &&
    `
      background: #e8efff;
      color: #4338ca;
      border-color: #e0e7ff;
    `}
`

const ListItem = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  align-items: center;
  background: #ffffff;
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
  font-weight: 700;
  color: #111827;
  font-size: 10px;
`

const ItemSnippet = styled.div`
  color: #6b7280;
  font-size: 10px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TimeStamp = styled.span`
  color: #9ca3af;
  font-size: 10px;
  font-weight: 700;
`

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 10px;
`

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #ef4444;
  font-size: 10px;
`

const ChevronDownImg = styled.img`
  width: 14px;
  height: 14px;
`

const IconImg = styled.img`
  width: 16px;
  height: 16px;
`
