import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChevronDown from '../assets/chevron-down.svg'
import InboxIcon from '../assets/inbox-icon-two.svg'
import AllIcon from '../assets/all-icon.svg'
import UnassignedIcon from '../assets/unassigned-icon.svg'
import UserImg from '../assets/user-icon.svg'
import TeamIcon from '../assets/teams-icon.svg'
import Whatsapp from '../assets/whatsapp.svg'
import Instagram from '../assets/instagram.svg'
import { fetchUsers, fetchPosts } from '../services/api'

type LinkItem = {
  label: string
  badge?: number
  active?: boolean
  icon?: string
  id?: number
}

const inboxLinks: LinkItem[] = [
  { label: 'My Inbox', icon: 'InboxIcon' },
  { label: 'All', badge: 28, icon: 'AllIcon' },
  { label: 'Unassigned', badge: 5, icon: 'UnassignedIcon' },
]

const teams: LinkItem[] = [
  { label: 'Sales', badge: 7, icon: 'team' },
  { label: 'Customer Support', badge: 16, icon: 'team' },
]

const channels = [
  { label: 'Fit4Life', icon: 'Whatsapp' },
  { label: 'Fit4Life', icon: 'Instagram' },
]

export function Sidebar() {
  const [users, setUsers] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const usersData = await fetchUsers()
        const postsData = await fetchPosts()

        // Create user items with badge counts based on their posts
        const usersList: LinkItem[] = usersData.slice(0, 9).map((user, index) => {
          const userPosts = postsData.filter(p => p.userId === user.id)
          // Make second user active (index 1)
          return {
            id: user.id,
            label: user.name,
            badge: userPosts.length > 0 ? userPosts.length % 12 : 0,
            active: index === 1
          }
        })

        setUsers(usersList)
        setError(null)
      } catch (err) {
        setError('Failed to load users')
        console.error('Error loading users:', err)
        // Set fallback users
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])
  const iconAssets: Record<string, string> = {
    InboxIcon,
    AllIcon,
    UnassignedIcon,
  }

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Inbox</PanelTitle>
      </PanelHeader>
      <PanelBody as={SidebarSection}>
        {inboxLinks.map((item) => (
          <SidebarLink key={item.label} $active={item.active}>
            <SidebarLabel>
              {iconAssets[item.icon ?? ''] ? (
                <IconImg src={iconAssets[item.icon ?? '']} alt="" />
              ) : (
                <IconDot $kind={item.icon}>{iconSymbol(item.icon)}</IconDot>
              )}
              <LabelText>{item.label}</LabelText>
            </SidebarLabel>
            {item.badge !== undefined && <Badge>{item.badge}</Badge>}
          </SidebarLink>
        ))}

        <SidebarSection>
          <SectionHeader>
            <SidebarTitle>Teams</SidebarTitle>
            <IconImg src={ChevronDown} alt="" />
          </SectionHeader>
          {teams.map((team) => (
            <SidebarLink key={team.label}>
              <SidebarLabel>
                <TeamImg src={TeamIcon} alt='team-icon' />
                <LabelText>{team.label}</LabelText>
              </SidebarLabel>
              <Badge>{team.badge}</Badge>
            </SidebarLink>
          ))}
        </SidebarSection>

        <SidebarSection>
          <SectionHeader>
            <SidebarTitle>Users</SidebarTitle>
            <IconImg src={ChevronDown} alt="" />
          </SectionHeader>
          {loading && <LoadingMessage>Loading users...</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!loading && !error && users.map((user) => (
            <SidebarLink key={user.id || user.label} $active={user.active}>
              <SidebarLabel>
                <UserIcon src={UserImg} alt='user image' />
                <LabelText>{user.label}</LabelText>
              </SidebarLabel>

              {user.badge ? <Badge>{user.badge}</Badge> : <span />}
            </SidebarLink>
          ))}
        </SidebarSection>

        <SidebarSection>
          <SectionHeader>
            <SidebarTitle>Channels</SidebarTitle>
            <IconImg src={ChevronDown} alt="" />
          </SectionHeader>
          {channels.map((channel, idx) => (
            <ChannelCard key={`${channel.label}-${idx}`}>
              <ChannelIconImg
                src={channel.icon === 'Whatsapp' ? Whatsapp : Instagram}
                alt={channel.icon}
              />
              <LabelText>{channel.label}</LabelText>
            </ChannelCard>
          ))}
        </SidebarSection>
      </PanelBody>
    </Panel>
  )
}

const Panel = styled.section`
  background: #fff;
  border-right: 1px solid #e5e7eb;
  border-radius: 11px 0 0 11px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const PanelHeader = styled.div`
  padding: 18px 18px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: transparent;
`

const PanelTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  color: #000000;
`

const PanelBody = styled.div`
  padding: 10px 14px 18px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px 2px;
`

const SidebarTitle = styled.div`
  font-weight: 700;
  color: #0f1115;
  font-size: 10px;
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  line-height: 100%;
  letter-spacing: 0%;
`

const UserIcon = styled.img`
  
`

const TeamImg = styled.img`
  
`

const SidebarLink = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 9px;
  border-radius: 6px;
  color: #000000;
  font-weight: 500;
  font-size: 10px;
  border: 1px solid ${({ $active }) => ($active ? '#d8dee4' : 'transparent')};
  background: ${({ $active }) => ($active ? '#FFFFFF' : '')};
  transition: background 0.15s ease, border 0.15s ease;
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px #E7EBEC' : 'none')};
`

const SidebarLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`

const LabelText = styled.span`
  line-height: 1.1;
  font-size:11px;
  color:#222222;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0%;

`

const Badge = styled.span`
  color: #222222;
  font-size: 9px;
  font-weight: 500;
line-height: 100%;
letter-spacing: 0%;
text-align: center;

`

const IconDot = styled.span<{ $kind?: string }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ $kind }) => iconBg($kind)};
  color: ${({ $kind }) => iconColor($kind)};
  display: grid;
  place-items: center;
  font-size: 15px;
 
`

const IconImg = styled.img`
  width: 14px;
  height: 14px;
`

const ChannelCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #D8DEE4;
  height:29px;
  border-radius: 6px;
  box-shadow: 0 6px 14px #D8DEE4;
`

const ChannelIconImg = styled.img`
  width: 14px;
  height: 14px;
`

function iconSymbol(kind?: string) {
  switch (kind) {
    case 'user':
      return '👤'
    case 'all':
      return '👥'
    case 'unassigned':
      return '🎯'
    case 'team':
      return '⚙️'
    case 'whatsapp':
      return '🟢'
    case 'instagram':
      return '📸'
    default:
      return '•'
  }
}

function iconBg(kind?: string) {
  switch (kind) {
    case 'user':
      return '#f1f5f9'
    case 'all':
      return '#eef2ff'
    case 'unassigned':
      return '#fef3c7'
    case 'team':
      return '#eef2f7'
    default:
      return '#f8fafc'
  }
}

function iconColor(kind?: string) {
  switch (kind) {
    case 'user':
      return '#0f172a'
    case 'all':
      return '#4338ca'
    case 'unassigned':
      return '#b45309'
    case 'team':
      return '#475569'
    default:
      return '#111827'
  }
}

const LoadingMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: #6b7280;
  font-size: 10px;
`

const ErrorMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: #ef4444;
  font-size: 10px;
`

