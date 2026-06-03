import { useState, useEffect } from "react";
import Avatar from "./components/Avatar";
import NavItem from "./components/NavItem";
import PostCard from "./components/PostCard";
import Skeleton from "./components/Skeleton";
import ProfilePage from "./components/ProfilePage";
import { stories, suggestedUsers, postMeta, CAT_API_KEY } from "./data/mockData";
import type { Post, CatImage } from "./types";

type View = "feed" | "profile";

const HomeIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const SearchIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const ExploreIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>);
const ReelIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>);
const MessageIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>);
const NotifIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>);
const CreateIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>);
const MoreIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>);

export default function App() {
  const [view, setView] = useState<View>("feed");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=5&size=full",
          { headers: { "x-api-key": CAT_API_KEY } }
        );
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const cats: CatImage[] = await res.json();
        const builtPosts: Post[] = cats.map((cat, i) => ({
          id: cat.id,
          image: cat.url,
          ...postMeta[i % postMeta.length],
          liked: false,
          saved: false,
        }));
        setPosts(builtPosts);
      } catch (e: any) {
        setError(e.message ?? "Error fetching cats");
      } finally {
        setLoading(false);
      }
    }
    fetchCats();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", display: "flex" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 244, flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", borderRight: "1px solid #dbdbdb", background: "#fff", display: "flex", flexDirection: "column", padding: "20px 12px", zIndex: 100 }}>
        <div
          onClick={() => setView("feed")}
          style={{ padding: "8px 16px 24px", fontSize: 22, fontStyle: "italic", fontWeight: 700, cursor: "pointer" }}
        >
          Instagram
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div onClick={() => setView("feed")}>
            <NavItem icon={<HomeIcon />} label="Home" active={view === "feed"} />
          </div>
          <NavItem icon={<SearchIcon />}  label="Search" />
          <NavItem icon={<ExploreIcon />} label="Explore" />
          <NavItem icon={<ReelIcon />}    label="Reels" />
          <NavItem icon={<MessageIcon />} label="Messages" />
          <NavItem icon={<NotifIcon />}   label="Notifications" />
          <NavItem icon={<CreateIcon />}  label="Create" />

          {/* Profile — navega a la vista de perfil */}
          <div
            onClick={() => setView("profile")}
            style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "12px 16px", borderRadius: 8, cursor: "pointer",
              fontWeight: view === "profile" ? 600 : 400,
              background: view === "profile" ? "#f5f5f5" : "transparent",
              transition: "background 0.15s",
            }}
          >
            <Avatar src="https://i.pravatar.cc/24?img=1" size={24} />
            <span style={{ fontSize: 16 }}>Profile</span>
          </div>
        </nav>
        <NavItem icon={<MoreIcon />} label="More" />
      </aside>

      {/* ── Contenido principal ── */}
      <main style={{ marginLeft: 244, flex: 1, display: "flex", justifyContent: "center", padding: view === "feed" ? "24px" : "0" }}>

        {/* FEED */}
        {view === "feed" && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{ width: 470, marginRight: 24 }}>

              {/* Stories */}
              <div style={{ background: "#fff", border: "1px solid #dbdbdb", borderRadius: 8, padding: 16, marginBottom: 24, display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none" }}>
                {stories.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0 }}>
                    <Avatar src={s.avatar} size={56} story={s.hasStory} isUser={i === 0} />
                    <span style={{ fontSize: 12, color: "#262626", maxWidth: 64, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {i === 0 ? "Your Story" : s.username}
                    </span>
                  </div>
                ))}
              </div>

              {loading && [1, 2, 3].map(n => <Skeleton key={n} />)}
              {error && (
                <div style={{ background: "#fff", border: "1px solid #dbdbdb", borderRadius: 8, padding: 32, textAlign: "center", color: "#8e8e8e", fontSize: 14 }}>
                  ⚠️ No se pudieron cargar los posts: {error}
                </div>
              )}
              {!loading && !error && posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>

            {/* Sidebar derecha */}
            <aside style={{ width: 293, flexShrink: 0, paddingTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div
                  onClick={() => setView("profile")}
                  style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                >
                  <Avatar src="https://i.pravatar.cc/44?img=1" size={44} story />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>you_username</div>
                    <div style={{ fontSize: 14, color: "#8e8e8e" }}>Your Name</div>
                  </div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#0095f6", fontWeight: 600, fontSize: 14 }}>Switch</button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#8e8e8e" }}>Suggested for you</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, color: "#262626" }}>See All</button>
              </div>

              {suggestedUsers.map(user => (
                <div key={user.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar src={user.avatar} size={32} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{user.username}</div>
                      <div style={{ fontSize: 12, color: "#8e8e8e" }}>{user.subtitle}</div>
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#0095f6", fontWeight: 600, fontSize: 12 }}>Follow</button>
                </div>
              ))}

              <div style={{ marginTop: 24, fontSize: 11, color: "#c7c7c7", lineHeight: 1.8 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 4px", marginBottom: 8 }}>
                  {["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms", "Language"].map(l => (
                    <span key={l} style={{ cursor: "pointer" }}>{l} ·</span>
                  ))}
                </div>
                <div>© 2026 INSTAGRAM FROM META</div>
              </div>
            </aside>
          </div>
        )}

        {/* PROFILE */}
        {view === "profile" && (
          <ProfilePage posts={posts} onGoProfile={() => setView("profile")} />
        )}
      </main>
    </div>
  );
}