import { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar.tsx'
import type { Post } from '../../types/index.ts'
import './PostModal.css'

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? '#ed4956' : 'none'}
    stroke={filled ? '#ed4956' : 'currentColor'}
    strokeWidth="2"
    aria-hidden
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
)

const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
)

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

const MOCK_COMMENTS = [
  { id: 1, user: 'salvadbrx', avatar: 'https://i.pravatar.cc/32?img=30', text: "Server isn't working", time: '3d', likes: 1 },
  { id: 2, user: 'edubarros101', avatar: 'https://i.pravatar.cc/32?img=31', text: 'Ainda bem que não é 2077, ou essas tattoos iam fioar todos bugadas.', time: '1d', likes: 1 },
  { id: 3, user: 'theactornekhiataylor', avatar: 'https://i.pravatar.cc/32?img=32', text: 'None of my prompts look a thing like this 😭', time: '1d', likes: 0 },
  { id: 4, user: 'openaidalle', avatar: 'https://i.pravatar.cc/32?img=33', text: '🔥🔥🔥', time: '2d', likes: 4 },
  { id: 5, user: 'neon_vibes', avatar: 'https://i.pravatar.cc/32?img=34', text: 'This is the future fr', time: '5h', likes: 2 },
]

interface PostModalProps {
  post: Post
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onGoProfile: () => void
}

export default function PostModal({
  post,
  onClose,
  onNext,
  onPrev,
  onGoProfile,
}: PostModalProps) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)

  useEffect(() => {
    setLiked(post.liked)
    setSaved(post.saved)
  }, [post])

  const likeCount = post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0)

  function toggleLike() {
    setLiked((prev) => !prev)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNext, onPrev])

  function handleGoProfile() {
    onClose()
    onGoProfile()
  }

  return (
    <div className="post-modal__backdrop" onClick={onClose} role="presentation">
      <button
        type="button"
        className="post-modal__nav post-modal__nav--prev"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="post-modal__nav post-modal__nav--next"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Siguiente"
      >
        ›
      </button>
      <button
        type="button"
        className="post-modal__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ✕
      </button>

      <div
        className="post-modal__card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="post-modal__image-panel">
          <img src={post.image} alt="" className="post-modal__image" />
        </div>

        <div className="post-modal__panel">
          <div className="post-modal__header">
            <div className="post-modal__header-user">
              <Avatar src={post.avatar} size={32} story />
              <span className="post-modal__header-name">{post.username}</span>
            </div>
            <button type="button" className="post-modal__icon-btn" aria-label="Opciones">
              <MoreIcon />
            </button>
          </div>

          <div className="post-modal__scroll">
            <div className="post-modal__caption-row">
              <Avatar src={post.avatar} size={32} />
              <div>
                <p className="post-modal__caption-text">
                  <span className="post-modal__caption-user">{post.username}</span>
                  {post.caption}{' '}
                  <span className="post-modal__hashtags">{post.hashtags}</span>
                </p>
                <div className="post-modal__meta">
                  <span>{post.time.toLowerCase()}</span>
                  <span className="post-modal__meta-link">See translation</span>
                </div>
              </div>
            </div>

            {MOCK_COMMENTS.map((c) => (
              <div key={c.id} className="post-modal__comment">
                <Avatar src={c.avatar} size={32} />
                <div>
                  <p className="post-modal__comment-text">
                    <span className="post-modal__comment-user">{c.user}</span>
                    {c.text}
                  </p>
                  <div className="post-modal__comment-meta">
                    <span>{c.time}</span>
                    {c.likes > 0 && (
                      <span>
                        {c.likes} like{c.likes > 1 ? 's' : ''}
                      </span>
                    )}
                    <span className="post-modal__reply">Reply</span>
                    <span className="post-modal__meta-link">See translation</span>
                  </div>
                </div>
                <button type="button" className="post-modal__like-btn" aria-label="Me gusta">
                  <HeartIcon />
                </button>
              </div>
            ))}
          </div>

          <div className="post-modal__footer">
            <div className="post-modal__actions">
              <div className="post-modal__actions-left">
                <button
                  type="button"
                  className="post-modal__icon-btn"
                  onClick={toggleLike}
                  aria-label="Me gusta"
                >
                  <HeartIcon filled={liked} />
                </button>
                <button type="button" className="post-modal__icon-btn" aria-label="Comentar">
                  <CommentIcon />
                </button>
                <button type="button" className="post-modal__icon-btn" aria-label="Compartir">
                  <ShareIcon />
                </button>
              </div>
              <button
                type="button"
                className="post-modal__icon-btn"
                onClick={() => setSaved((s) => !s)}
                aria-label="Guardar"
              >
                <BookmarkIcon filled={saved} />
              </button>
            </div>

            <p className="post-modal__likes">
              <span className="post-modal__likes-user">Liked by </span>
              <span className="post-modal__likes-user" onClick={handleGoProfile} role="button" tabIndex={0}>
                openaidalle
              </span>
              <span className="post-modal__likes-user">
                {' '}
                and {likeCount.toLocaleString()} others
              </span>
            </p>
            <div className="post-modal__time">{post.time}</div>

            <div className="post-modal__comment-form">
              <input
                className="post-modal__comment-input"
                placeholder="Add a comment…"
                readOnly
              />
              <button type="button" className="post-modal__post-btn">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
