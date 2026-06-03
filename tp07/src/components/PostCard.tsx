import { useState } from "react";
import Avatar from "./Avatar";
import type { Post } from "../types";

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24"
    fill={filled ? "#ed4956" : "none"}
    stroke={filled ? "#ed4956" : "currentColor"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const likeCount = post.likes + (liked && !post.liked ? 1 : !liked && post.liked ? -1 : 0);

  return (
    <article style={{ background: "#fff", border: "1px solid #dbdbdb", borderRadius: 8, marginBottom: 24, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={post.avatar} size={32} story />
          <span style={{ fontWeight: 600, fontSize: 14, cursor: "pointer" }}>{post.username}</span>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626" }}><MoreIcon /></button>
      </div>

      <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#f0f0f0" }}>
        <img src={post.image} alt="cat" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: "8px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => setLiked(l => !l)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
              <HeartIcon filled={liked} />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}><CommentIcon /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}><ShareIcon /></button>
          </div>
          <button onClick={() => setSaved(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}>
            <BookmarkIcon filled={saved} />
          </button>
        </div>

        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{likeCount.toLocaleString()} likes</div>
        <div style={{ fontSize: 14, marginBottom: 2 }}>
          <span style={{ fontWeight: 600, marginRight: 6 }}>{post.username}</span>{post.caption}
        </div>
        <div style={{ fontSize: 14, color: "#0095f6", marginBottom: 4 }}>{post.hashtags}</div>
        <button style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#8e8e8e", fontSize: 14, marginBottom: 4 }}>
          View all {post.comments.toLocaleString()} comments
        </button>
        <div style={{ fontSize: 10, color: "#c7c7c7", letterSpacing: "0.02em", marginBottom: 12 }}>{post.time}</div>
        <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #efefef", paddingTop: 8, paddingBottom: 8, gap: 10 }}>
          <Avatar src="https://i.pravatar.cc/24?img=1" size={24} />
          <input placeholder="Add a comment…" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#262626", background: "transparent" }} />
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#0095f6", fontWeight: 600, fontSize: 14 }}>Post</button>
        </div>
      </div>
    </article>
  );
}