import { useState } from "react";
import PostModal from "./PostModal.tsx";
import type { Post } from "../types";

const GridIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="0" y="0" width="5" height="5"/><rect x="7" y="0" width="5" height="5"/>
    <rect x="0" y="7" width="5" height="5"/><rect x="7" y="7" width="5" height="5"/>
  </svg>
);
const ReelTabIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2"/>
    <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);
const BookmarkTabIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);
const TagIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const TABS = [
  { id: "posts",  label: "POSTS",  icon: <GridIcon /> },
  { id: "reels",  label: "REELS",  icon: <ReelTabIcon /> },
  { id: "saved",  label: "SAVED",  icon: <BookmarkTabIcon /> },
  { id: "tagged", label: "TAGGED", icon: <TagIcon /> },
];

interface ProfilePageProps {
  posts: Post[];
  onGoProfile: () => void;
}

export default function ProfilePage({ posts, onGoProfile }: ProfilePageProps) {
  const [activeTab, setActiveTab]       = useState("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function openPost(post: Post, index: number) {
    setSelectedPost(post);
    setSelectedIndex(index);
  }
  function goNext() {
    const next = (selectedIndex + 1) % posts.length;
    setSelectedIndex(next);
    setSelectedPost(posts[next]);
  }
  function goPrev() {
    const prev = (selectedIndex - 1 + posts.length) % posts.length;
    setSelectedIndex(prev);
    setSelectedPost(posts[prev]);
  }

  return (
    <>
      <div style={{ maxWidth: 935, margin: "0 auto", padding: "30px 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", width: "100%" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 80, marginBottom: 44, paddingLeft: 16 }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", padding: 3, flexShrink: 0 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: "3px solid #fff", overflow: "hidden", background: "#1a1a2e" }}>
              <img src="https://i.pravatar.cc/150?img=1" alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 20, fontWeight: 300 }}>you_username</span>
              <button style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #dbdbdb", background: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Edit profile</button>
              <button style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #dbdbdb", background: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Ad tools</button>
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", gap: 40, marginBottom: 20 }}>
              {[{ label: "posts", value: posts.length || 11 }, { label: "followers", value: 41 }, { label: "following", value: 17 }].map(s => (
                <div key={s.label} style={{ fontSize: 16 }}>
                  <span style={{ fontWeight: 600 }}>{s.value} </span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600 }}>Your Name</div>
              <div style={{ color: "#8e8e8e", fontSize: 12 }}>Personal account</div>
              <div>Your favourite fun clips 🎬 in your language 🌍</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderTop: "1px solid #dbdbdb", display: "flex", justifyContent: "center" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 24px", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: activeTab === tab.id ? "#262626" : "#8e8e8e", borderTop: activeTab === tab.id ? "1px solid #262626" : "1px solid transparent", marginTop: -1, transition: "color 0.15s" }}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {activeTab === "posts" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, marginTop: 3 }}>
            {posts.length === 0
              ? Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ aspectRatio: "1/1", background: "#d6d6d6" }} />)
              : posts.map((post, i) => (
                  <div key={post.id} onClick={() => openPost(post, i)}
                    style={{ aspectRatio: "1/1", overflow: "hidden", cursor: "pointer", position: "relative", background: "#f0f0f0" }}
                    onMouseEnter={e => { const o = e.currentTarget.querySelector(".hover-overlay") as HTMLElement; if (o) o.style.opacity = "1"; }}
                    onMouseLeave={e => { const o = e.currentTarget.querySelector(".hover-overlay") as HTMLElement; if (o) o.style.opacity = "0"; }}
                  >
                    <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div className="hover-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, opacity: 0, transition: "opacity 0.2s" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>❤️ {post.likes.toLocaleString()}</span>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>💬 {post.comments.toLocaleString()}</span>
                    </div>
                  </div>
                ))
            }
          </div>
        )}

        {activeTab !== "posts" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", color: "#8e8e8e", fontSize: 14, gap: 12 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c7c7c7" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            No {activeTab} yet
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 48, borderTop: "1px solid #dbdbdb", paddingTop: 20, fontSize: 12, color: "#8e8e8e", display: "flex", flexWrap: "wrap", gap: "4px 12px", justifyContent: "center" }}>
          {["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Top Accounts", "Locations", "Instagram Lite", "Contact Uploading & Non-Users", "Meta Verified"].map(l => (
            <span key={l} style={{ cursor: "pointer" }}>{l}</span>
          ))}
          <div style={{ width: "100%", textAlign: "center", marginTop: 8 }}>English · © 2026 Instagram from Meta</div>
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
  );
}