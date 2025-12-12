type IconProps = {
  size?: number
  className?: string
  strokeWidth?: number
}

const iconBase = (size = 18, className?: string, strokeWidth = 1.8) => ({
  width: size,
  height: size,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className,
})

export const InboxIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M4 12h5l2 3h2l2-3h5" />
    <path d="M4 7.6 6.6 4h10.8L20 7.6V18H4z" />
  </svg>
)

export const ContactsIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="3" />
    <path d="M5 20v-.5A6.5 6.5 0 0 1 11.5 13h1A6.5 6.5 0 0 1 19 19.5V20" />
  </svg>
)

export const AiIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <rect x="4" y="3" width="16" height="13" rx="3" />
    <path d="M9 18h6" />
    <path d="M10 9h4" />
    <path d="M9 12h6" />
    <circle cx="12" cy="21" r="1" />
  </svg>
)

export const WorkflowIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <rect x="4" y="4" width="6" height="6" rx="1.5" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" />
    <rect x="9" y="14" width="6" height="6" rx="1.5" />
    <path d="M7 10v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
  </svg>
)

export const CampaignIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M4 14.5V5.5l9 4.5-9 4.5Z" />
    <path d="M13 10V5.5" />
    <path d="M13 14.5V12" />
    <circle cx="18" cy="8" r="1" />
    <circle cx="18" cy="12" r="1" />
    <circle cx="18" cy="16" r="1" />
  </svg>
)

export const SearchIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="6" />
    <path d="m16.5 16.5 3 3" />
  </svg>
)

export const FilterIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M4 7h16" />
    <path d="M7 12h10" />
    <path d="M10 17h4" />
  </svg>
)

export const MoreVertical = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <circle cx="12" cy="5" r="1.2" />
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="12" cy="19" r="1.2" />
  </svg>
)

export const ChevronDown = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const PinIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="m12 17-4 4" />
    <path d="m12 17 4 4" />
    <path d="M12 17V4" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
  </svg>
)

export const ExpandIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M9 3H5v4" />
    <path d="M15 3h4v4" />
    <path d="M9 21H5v-4" />
    <path d="M15 21h4v-4" />
    <path d="m9 3-6 6" />
    <path d="m15 3 6 6" />
    <path d="m3 15 6 6" />
    <path d="m15 21 6-6" />
  </svg>
)

export const ReplyIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M10 7 5 12l5 5" />
    <path d="M19 12h-9" />
  </svg>
)

export const UserIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20v-.5A6.5 6.5 0 0 1 11.5 13h1A6.5 6.5 0 0 1 19 19.5V20" />
  </svg>
)

export const TeamIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <path d="M3 20v-.5A5.5 5.5 0 0 1 8.5 14h.5" />
    <path d="M21 20v-.5A5.5 5.5 0 0 0 15.5 14H15" />
  </svg>
)

export const ListIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M3 6h.01" />
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
  </svg>
)

export const PencilIcon = ({ size, className, strokeWidth }: IconProps) => (
  <svg {...iconBase(size, className, strokeWidth)} viewBox="0 0 24 24">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
)

