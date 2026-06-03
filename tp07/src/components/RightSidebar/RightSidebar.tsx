import Avatar from '../Avatar/Avatar.tsx'
import type { SuggestedUser } from '../../types/index.ts'
import './RightSidebar.css'

interface RightSidebarProps {
  suggestedUsers: SuggestedUser[]
  onGoProfile: () => void
}

export default function RightSidebar({
  suggestedUsers,
  onGoProfile,
}: RightSidebarProps) {
  return (
    <aside className="right-sidebar">
      <div className="right-sidebar__user-row">
        <div className="right-sidebar__user" onClick={onGoProfile} role="button" tabIndex={0}>
          <Avatar src="https://i.pravatar.cc/44?img=1" size={44} story />
          <div>
            <div className="right-sidebar__username">you_username</div>
            <div className="right-sidebar__fullname">Your Name</div>
          </div>
        </div>
        <button type="button" className="right-sidebar__switch-btn">
          Switch
        </button>
      </div>

      <div className="right-sidebar__suggestions-header">
        <span className="right-sidebar__suggestions-title">Suggested for you</span>
        <button type="button" className="right-sidebar__see-all">
          See All
        </button>
      </div>

      {suggestedUsers.map((user) => (
        <div key={user.id} className="right-sidebar__suggestion">
          <div className="right-sidebar__suggestion-user">
            <Avatar src={user.avatar} size={32} />
            <div>
              <div className="right-sidebar__username">{user.username}</div>
              <div className="right-sidebar__fullname">{user.subtitle}</div>
            </div>
          </div>
          <button type="button" className="right-sidebar__follow-btn">
            Follow
          </button>
        </div>
      ))}

      <div className="right-sidebar__footer">
        <div className="right-sidebar__footer-links">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Language'].map(
            (l) => (
              <span key={l} className="right-sidebar__footer-link">
                {l} ·
              </span>
            ),
          )}
        </div>
        <div>© 2026 INSTAGRAM FROM META</div>
      </div>
    </aside>
  )
}
