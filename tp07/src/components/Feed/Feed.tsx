import PostCard from '../PostCard/PostCard.tsx'
import RightSidebar from '../RightSidebar/RightSidebar.tsx'
import Skeleton from '../Skeleton/Skeleton.tsx'
import StoriesBar from '../StoriesBar/StoriesBar.tsx'
import type { Post, Story } from '../../types/index.ts'
import type { SuggestedUser } from '../../types/index.ts'
import './Feed.css'

interface FeedProps {
  stories: Story[]
  posts: Post[]
  suggestedUsers: SuggestedUser[]
  loading: boolean
  error: string | null
  onGoProfile: () => void
}

export default function Feed({
  stories,
  posts,
  suggestedUsers,
  loading,
  error,
  onGoProfile,
}: FeedProps) {
  return (
    <div className="feed">
      <div className="feed__posts">
        <StoriesBar stories={stories} />

        {loading && [1, 2, 3].map((n) => <Skeleton key={n} />)}

        {error && (
          <div className="feed__error">⚠️ No se pudieron cargar los posts: {error}</div>
        )}

        {!loading && !error && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      <RightSidebar suggestedUsers={suggestedUsers} onGoProfile={onGoProfile} />
    </div>
  )
}
