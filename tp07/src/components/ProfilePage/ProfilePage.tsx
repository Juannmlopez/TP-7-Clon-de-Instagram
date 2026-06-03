import { useState } from 'react'
import PostModal from '../PostModal/PostModal.tsx'
import type { Post } from '../../types/index.ts'
import './ProfilePage.css'

const GridIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
    <rect x="0" y="0" width="5" height="5" />
    <rect x="7" y="0" width="5" height="5" />
    <rect x="0" y="7" width="5" height="5" />
    <rect x="7" y="7" width="5" height="5" />
  </svg>
)

const ReelTabIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
)

const BookmarkTabIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)

const TagIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const TABS = [
  { id: 'posts', label: 'POSTS', icon: <GridIcon /> },
  { id: 'reels', label: 'REELS', icon: <ReelTabIcon /> },
  { id: 'saved', label: 'SAVED', icon: <BookmarkTabIcon /> },
  { id: 'tagged', label: 'TAGGED', icon: <TagIcon /> },
]

interface ProfilePageProps {
  posts: Post[]
  onGoProfile: () => void
}

export default function ProfilePage({ posts, onGoProfile }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('posts')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  function openPost(post: Post, index: number) {
    setSelectedPost(post)
    setSelectedIndex(index)
  }

  function goNext() {
    const next = (selectedIndex + 1) % posts.length
    setSelectedIndex(next)
    setSelectedPost(posts[next])
  }

  function goPrev() {
    const prev = (selectedIndex - 1 + posts.length) % posts.length
    setSelectedIndex(prev)
    setSelectedPost(posts[prev])
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-page__header">
          <div className="profile-page__avatar-ring">
            <div className="profile-page__avatar-inner">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="profile"
                className="profile-page__avatar-img"
              />
            </div>
          </div>

          <div className="profile-page__info">
            <div className="profile-page__top-row">
              <span className="profile-page__username">you_username</span>
              <button type="button" className="profile-page__btn">
                Edit profile
              </button>
              <button type="button" className="profile-page__btn">
                Ad tools
              </button>
              <button type="button" className="profile-page__btn profile-page__btn--icon" aria-label="Opciones">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </button>
            </div>

            <div className="profile-page__stats">
              {[
                { label: 'posts', value: posts.length || 11 },
                { label: 'followers', value: 41 },
                { label: 'following', value: 17 },
              ].map((s) => (
                <div key={s.label}>
                  <span className="profile-page__stat-value">{s.value} </span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="profile-page__bio">
              <div className="profile-page__bio-name">Your Name</div>
              <div className="profile-page__bio-type">Personal account</div>
              <div>Your favourite fun clips 🎬 in your language 🌍</div>
            </div>
          </div>
        </div>

        <div className="profile-page__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`profile-page__tab${activeTab === tab.id ? ' profile-page__tab--active' : ''}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'posts' && (
          <div className="profile-page__grid">
            {posts.length === 0
              ? Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="profile-page__grid-placeholder" />
                ))
              : posts.map((post, i) => (
                  <div
                    key={post.id}
                    className="profile-page__grid-item"
                    onClick={() => openPost(post, i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openPost(post, i)}
                  >
                    <img src={post.image} alt="" className="profile-page__grid-img" />
                    <div className="profile-page__grid-overlay">
                      <span className="profile-page__grid-stat">
                        ❤️ {post.likes.toLocaleString()}
                      </span>
                      <span className="profile-page__grid-stat">
                        💬 {post.comments.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        )}

        {activeTab !== 'posts' && (
          <div className="profile-page__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c7c7c7" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            No {activeTab} yet
          </div>
        )}

        <div className="profile-page__footer">
          {[
            'Meta',
            'About',
            'Blog',
            'Jobs',
            'Help',
            'API',
            'Privacy',
            'Terms',
            'Top Accounts',
            'Locations',
            'Instagram Lite',
            'Contact Uploading & Non-Users',
            'Meta Verified',
          ].map((l) => (
            <span key={l} className="profile-page__footer-link">
              {l}
            </span>
          ))}
          <div className="profile-page__footer-copy">
            English · © 2026 Instagram from Meta
          </div>
        </div>
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onNext={goNext}
          onPrev={goPrev}
          onGoProfile={onGoProfile}
        />
      )}
    </>
  )
}
