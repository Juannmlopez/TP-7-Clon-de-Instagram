import type { CSSProperties } from 'react'
import './Avatar.css'

interface AvatarProps {
  src: string
  size?: number
  story?: boolean
  isUser?: boolean
}

export default function Avatar({
  src,
  size = 32,
  story = false,
  isUser = false,
}: AvatarProps) {
  const innerSize = story ? size - 4 : size
  const style = {
    '--avatar-size': `${size}px`,
    '--avatar-inner-size': `${innerSize}px`,
  } as CSSProperties

  return (
    <div className="avatar" style={style}>
      <div
        className={`avatar__ring${story ? ' avatar__ring--story' : ''}`}
        style={{ width: size, height: size }}
      >
        <div
          className="avatar__inner"
          style={{ width: innerSize, height: innerSize }}
        >
          <img src={src} alt="" className="avatar__img" />
        </div>
      </div>
      {isUser && (
        <div className="avatar__add">
          <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden>
            <line x1="5" y1="1" x2="5" y2="9" strokeWidth="2" stroke="white" />
            <line x1="1" y1="5" x2="9" y2="5" strokeWidth="2" stroke="white" />
          </svg>
        </div>
      )}
    </div>
  )
}
