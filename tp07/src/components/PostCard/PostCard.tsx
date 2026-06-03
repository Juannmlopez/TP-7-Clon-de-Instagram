import { useState } from 'react'
import Avatar from '../Avatar/Avatar.tsx'
import type { Post } from '../../types/index.ts'
import '../PostCard/PostCard.css'

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)
  const likeCount =
    post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0)

  return (
    <article className="post-card">
      <div className="post-card__header">
        <div className="post-card__user">
          <Avatar src={post.avatar} size={32} story />
          <span className="post-card__username">{post.username}</span>
        </div>
        <button type="button" className="post-card__icon-btn" aria-label="Opciones">
          <MoreIcon />
        </button>
      </div>

      <div className="post-card__media">
        <img src={post.image} alt="" className="post-card__image" />
      </div>

      <div className="post-card__body">
        <div className="post-card__actions">
          <div className="post-card__actions-left">
            <button
              type="button"
              className="post-card__icon-btn"
              onClick={() => setLiked((l) => !l)}
              aria-label="Me gusta"
            >
              <HeartIcon filled={liked} />
            </button>
            <button type="button" className="post-card__icon-btn" aria-label="Comentar">
              <CommentIcon />
            </button>
            <button type="button" className="post-card__icon-btn" aria-label="Compartir">
              <ShareIcon />
            </button>
          </div>
          <button
            type="button"
            className="post-card__icon-btn"
            onClick={() => setSaved((s) => !s)}
            aria-label="Guardar"
          >
            <BookmarkIcon filled={saved} />
          </button>
        </div>

        <div className="post-card__likes">{likeCount.toLocaleString()} likes</div>
        <div className="post-card__caption">
          <span className="post-card__caption-user">{post.username}</span>
          {post.caption}
        </div>
        <div className="post-card__hashtags">{post.hashtags}</div>
        <button type="button" className="post-card__comments-btn">
          View all {post.comments.toLocaleString()} comments
        </button>
        <div className="post-card__time">{post.time}</div>

        <div className="post-card__comment-form">
          <Avatar src="https://i.pravatar.cc/24?img=1" size={24} />
          <input
            className="post-card__comment-input"
            placeholder="Add a comment…"
            readOnly
          />
          <button type="button" className="post-card__post-btn">
            Post
          </button>
        </div>
      </div>
    </article>
  )
}
