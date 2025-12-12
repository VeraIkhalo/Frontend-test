import type { ComponentType } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import InboxIcon from '../assets/inbox-icon.svg'
import ContactIcon from '../assets/contact-icon.svg'
import EmployeeIcon from '../assets/employee-icon.svg'
import WorkflowIcon from '../assets/workflow-icon.svg'
import CampaignIcon from '../assets/campaign-icon.svg'
import SettingsIcon from '../assets/settings-icon.svg'

type IconLike = ComponentType<{ size?: number }> | string

type NavItem = {
  label: string
  active?: boolean
  Icon: IconLike
}

const navItems: NavItem[] = [
  { label: 'Inbox', active: true, Icon: InboxIcon },
  { label: 'Contacts', Icon: ContactIcon },
  { label: 'AI Employees', Icon: EmployeeIcon },
  { label: 'Workflows', Icon: WorkflowIcon },
  { label: 'Campaigns', Icon: CampaignIcon },
]

export function Topbar() {
  return (
    <TopbarShell>
      <BrandGroup>
        <Brand>
          <BrandMark as="img" src={Logo} alt="heyy" />
        </Brand>
        <Nav>
          {navItems.map((item) => {
            const Icon = item.Icon
            return (
              <NavItem key={item.label} $active={item.active}>
                {typeof Icon === 'string' ? (
                  <img src={Icon} alt="" width={10.53} height={10.53} />
                ) : (
                  <Icon size={10.53} />
                )}
                {item.label}
              </NavItem>
            )
          })}
        </Nav>
      </BrandGroup>

      <UserGroup>
        <SettingsGroup src={SettingsIcon} />
        <UserChip>
          <UserAvatar>M</UserAvatar>
          Michael Johnson
        </UserChip>
      </UserGroup>
    </TopbarShell>
  )
}

const TopbarShell = styled.header`
  height: 68px;
  display: flex;
  border-radius: 11.23px;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BrandGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

const BrandMark = styled.div`
  width: 100%;
`

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #6b7280;
  font-weight: 500;

  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`

const NavItem = styled.span<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 8px;
  padding: 8px 10px;
  font-size:10px;
  border-radius: 5.61px;
  color: #000000;
  background: ${({ $active }) => ($active ? '#EFF2F2' : 'transparent')};
  border: 0.7px solid ${({ $active }) => ($active ? '#D8DEE4' : 'transparent')};
  transition: background 0.15s ease, color 0.15s ease;
  font-weight: 556;
  font-style: Medium;
  line-height: 100%;
  letter-spacing: 0%;

  &:hover {
    
  }
`

const UserGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  
`

const SettingsGroup = styled.img`
  
`
const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #111827;
  font-family: Inter;
  font-weight: 600;
  font-size: 9.82px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0%;
`

const UserAvatar = styled.div`
  width: 19.65px;
  height: 19.65px;
  border-radius: 50%;
  background: #FE3265;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: semibold;
  font-size: 9.82px;
`

