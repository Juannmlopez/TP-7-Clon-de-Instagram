import Avatar from '../Avatar/Avatar.tsx'
import type { Story } from '../../types/index.ts'
import './StoriesBar.css'

interface StoriesBarProps {
  stories: Story[]
}

export default function StoriesBar({ stories }: StoriesBarProps) {
  return (
    <div className="stories-bar">
      {stories.map((s, i) => (
        <div key={s.id} className="stories-bar__item">
          <Avatar src={s.avatar} size={56} story={s.hasStory} isUser={i === 0} />
          <span className="stories-bar__username">
            {i === 0 ? 'Your Story' : s.username}
          </span>
        </div>
      ))}
    </div>
  )
}
