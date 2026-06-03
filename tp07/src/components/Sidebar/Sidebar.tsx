import Avatar from '../Avatar/Avatar.tsx'
import NavItem from '../NavItem/NavItem.tsx'
import './Sidebar.css'

interface SidebarProps {
  view: 'feed' | 'profile'
  onGoFeed: () => void
  onGoProfile: () => void
  icons: {
    home: React.ReactNode
    search: React.ReactNode
    explore: React.ReactNode
    reels: React.ReactNode
    messages: React.ReactNode
    notifications: React.ReactNode
    create: React.ReactNode
    more: React.ReactNode
  }
}

export default function Sidebar({
  view,
  onGoFeed,
  onGoProfile,
  icons,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" onClick={onGoFeed} role="button" tabIndex={0}>
        Instagram
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__nav-item-wrap" onClick={onGoFeed} role="button" tabIndex={0}>
          <NavItem icon={icons.home} label="Home" active={view === 'feed'} />
        </div>
        <NavItem icon={icons.search} label="Search" />
        <NavItem icon={icons.explore} label="Explore" />
        <NavItem icon={icons.reels} label="Reels" />
        <NavItem icon={icons.messages} label="Messages" />
        <NavItem icon={icons.notifications} label="Notifications" />
        <NavItem icon={icons.create} label="Create" />

        <div
          className={`sidebar__profile${view === 'profile' ? ' sidebar__profile--active' : ''}`}
          onClick={onGoProfile}
          role="button"
          tabIndex={0}
        >
          <Avatar src="https://i.pravatar.cc/24?img=1" size={24} />
          <span className="sidebar__profile-label">Profile</span>
        </div>
      </nav>

      <NavItem icon={icons.more} label="More" />
    </aside>
  )
}
