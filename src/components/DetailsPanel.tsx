import styled from 'styled-components'
import { ChevronDown, TeamIcon, UserIcon } from './icons'

const contactLabels = ['Closed Won', 'Chicago']

const otherChats = [
  { label: 'Fit4Life', status: 'On my way!', time: '08/08/25' },
]

function SectionLabel({ title }: { title: string }) {
  return (
    <SectionLabelRow>
      <DetailLabel>{title}</DetailLabel>
      <ChevronDown size={14} />
    </SectionLabelRow>
  )
}

export function DetailsPanel() {
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
            <UserIcon size={16} />
            James West
          </ValueChip>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Team</DetailLabel>
          <ValueChip>
            <TeamIcon size={16} />
            Sales Team
          </ValueChip>
        </DetailRow>

        <SectionLabel title="Contact Data" />
        <DetailRow>
          <DetailLabel>First Name</DetailLabel>
          <DetailValue>Olivia</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Last Name</DetailLabel>
          <DetailValue>Mckinsey</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Phone number</DetailLabel>
          <DetailValue>+1 (312) 555-0134</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Email</DetailLabel>
          <DetailValue>olivia.Mckinsey@gmail.com</DetailValue>
        </DetailRow>
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
        <NotesBox>Strong potential for future upgrades</NotesBox>

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
  font-size: 18px;
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
  font-size: 13px;
`

const DetailValue = styled.span`
  color: #111827;
  font-weight: 700;
  font-size: 14px;
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
  font-size: 13px;

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
  font-size: 14px;
`

const ItemSnippet = styled.div`
  color: #6b7280;
  font-size: 13px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TimeStamp = styled.span`
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
`

