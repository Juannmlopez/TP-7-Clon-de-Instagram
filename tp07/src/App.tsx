import { useState, useEffect } from 'react'
import Feed from './components/Feed/Feed.tsx'
import ProfilePage from './components/ProfilePage/ProfilePage.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import { stories, suggestedUsers, postMeta, CAT_API_KEY } from './data/mockData.ts'
import type { Post, CatImage } from './types/index.ts'
import './App.css'

type View = 'feed' | 'profile'

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const ExploreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)
const ReelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
)
const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
)
const NotifIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
)
const CreateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

const sidebarIcons = {
  home: <HomeIcon />,
  search: <SearchIcon />,
  explore: <ExploreIcon />,
  reels: <ReelIcon />,
  messages: <MessageIcon />,
  notifications: <NotifIcon />,
  create: <CreateIcon />,
  more: <MoreIcon />,
}

export default function App() {
  const [view, setView] = useState<View>('feed')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await fetch(
          'https://api.thecatapi.com/v1/images/search?limit=5&size=full',
          { headers: { 'x-api-key': CAT_API_KEY } },
        )
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const cats: CatImage[] = await res.json()
        const builtPosts: Post[] = cats.map((cat, i) => ({
          id: cat.id,
          image: cat.url,
          ...postMeta[i % postMeta.length],
          liked: false,
          saved: false,
        }))
        setPosts(builtPosts)
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Error fetching cats'
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    fetchCats()
  }, [])

  const goProfile = () => setView('profile')
  const goFeed = () => setView('feed')

  return (
    <div className="app">
      <Sidebar
        view={view}
        onGoFeed={goFeed}
        onGoProfile={goProfile}
        icons={sidebarIcons}
      />

      <main
        className={`app__main${view === 'feed' ? ' app__main--feed' : ' app__main--profile'}`}
      >
        {view === 'feed' && (
          <Feed
            stories={stories}
            posts={posts}
            suggestedUsers={suggestedUsers}
            loading={loading}
            error={error}
            onGoProfile={goProfile}
          />
        )}

        {view === 'profile' && (
          <ProfilePage posts={posts} onGoProfile={goProfile} />
        )}
      </main>
    </div>
  )
}
