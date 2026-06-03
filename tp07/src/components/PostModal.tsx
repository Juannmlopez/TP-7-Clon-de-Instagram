import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import type { Post } from "../types";

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24"
    fill={filled ? "#ed4956" : "none"}
    stroke={filled ? "#ed4956" : "currentColor"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
);

const MOCK_COMMENTS = [
  { id: 1, user: "salvadbrx",           avatar: "https://i.pravatar.cc/32?img=30", text: "Server isn't working",                                                  time: "3d", likes: 1 },
  { id: 2, user: "edubarros101",         avatar: "https://i.pravatar.cc/32?img=31", text: "Ainda bem que não é 2077, ou essas tattoos iam fioar todos bugadas.",   time: "1d", likes: 1 },
  { id: 3, user: "theactornekhiataylor", avatar: "https://i.pravatar.cc/32?img=32", text: "None of my prompts look a thing like this 😭",                           time: "1d", likes: 0 },
  { id: 4, user: "openaidalle",          avatar: "https://i.pravatar.cc/32?img=33", text: "🔥🔥🔥",                                                                  time: "2d", likes: 4 },
  { id: 5, user: "neon_vibes",           avatar: "https://i.pravatar.cc/32?img=34", text: "This is the future fr",                                                  time: "5h", likes: 2 },
];

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoProfile: () => void;
}

export default function PostModal({ post, onClose, onNext, onPrev, onGoProfile }: PostModalProps) {
  const [liked, setLiked]   = useState(post.liked);
  const [saved, setSaved]   = useState(post.saved);
  const [likeCount, setLikeCount] = useState(post.likes);

  // Sincronizar cuando cambia el post
  useEffect(() => {
    setLiked(post.liked);
    setSaved(post.saved);
    setLikeCount(post.likes);
  }, [post]);

  function toggleLike() {
    setLiked(prev => {
      const next = !prev;
      setLikeCount(c => next ? c + 1 : c - 1);
      return next;
    });
  }

  // Teclado
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  onNext();
      if (e.key === "ArrowLeft")   onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      {/* Flechas */}
      <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ position: "absolute", left: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 24, zIndex: 10, backdropFilter: "blur(4px)" }}>‹</button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ position: "absolute", right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 24, zIndex: 10, backdropFilter: "blur(4px)" }}>›</button>

      {/* X cerrar */}
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", lineHeight: 1, zIndex: 10 }}>✕</button>

      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ display: "flex", maxWidth: 980, width: "95%", maxHeight: "90vh", background: "#fff", borderRadius: 4, overflow: "hidden" }}
      >
        {/* Imagen */}
        <div style={{ flex: "0 0 58%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={post.image} alt="post" style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: "90vh" }} />
        </div>

        {/* Panel derecho */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #efefef", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar src={post.avatar} size={32} story />
              <span style={{ fontWeight: 600, fontSize: 14, cursor: "pointer" }}>{post.username}</span>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626" }}><MoreIcon /></button>
          </div>

          {/* Scroll: caption + comentarios */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

            {/* Caption — igual al formato de la referencia */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <Avatar src={post.avatar} size={32} />
              <div style={{ flex: 1 }}>
                {/* username + texto en línea, igual que en la imagen */}
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600, marginRight: 6 }}>{post.username}</span>
                  {post.caption}{" "}
                  <span style={{ color: "#0095f6" }}>{post.hashtags}</span>
                </p>
                <div style={{ marginTop: 6, display: "flex", gap: 14, fontSize: 12, color: "#8e8e8e" }}>
                  <span>{post.time.toLowerCase()}</span>
                  <span style={{ cursor: "pointer" }}>See translation</span>
                </div>
              </div>
            </div>

            {/* Comentarios */}
            {MOCK_COMMENTS.map(c => (
              <div key={c.id} style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "flex-start" }}>
                <Avatar src={c.avatar} size={32} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 600, marginRight: 6 }}>{c.user}</span>
                    {c.text}
                  </p>
                  <div style={{ marginTop: 4, display: "flex", gap: 14, fontSize: 12, color: "#8e8e8e" }}>
                    <span>{c.time}</span>
                    {c.likes > 0 && <span>{c.likes} like{c.likes > 1 ? "s" : ""}</span>}
                    <span style={{ cursor: "pointer", fontWeight: 600 }}>Reply</span>
                    <span style={{ cursor: "pointer" }}>See translation</span>
                  </div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2, color: "#8e8e8e" }}>
                  <HeartIcon />
                </button>
              </div>
            ))}
          </div>

          {/* Acciones + likes */}
          <div style={{ borderTop: "1px solid #efefef", padding: "10px 16px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <button onClick={toggleLike} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                  <HeartIcon filled={liked} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}><CommentIcon /></button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}><ShareIcon /></button>
              </div>
              <button onClick={() => setSaved(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "#262626", padding: 0, display: "flex", alignItems: "center" }}>
                <BookmarkIcon filled={saved} />
              </button>
            </div>

            {/* Liked by — con contador actualizado */}
            <p style={{ margin: "0 0 2px", fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>Liked by </span>
              <span style={{ fontWeight: 600, cursor: "pointer" }} onClick={() => { onClose(); onGoProfile(); }}>openaidalle</span>
              <span style={{ fontWeight: 600 }}> and {likeCount.toLocaleString()} others</span>
            </p>
            <div style={{ fontSize: 10, color: "#c7c7c7", letterSpacing: "0.04em", marginBottom: 10 }}>{post.time}</div>

            {/* Input comentario */}
            <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #efefef", paddingTop: 10, paddingBottom: 14, gap: 10 }}>
              <input
                placeholder="Add a comment…"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#262626", background: "transparent" }}
              />
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#0095f6", fontWeight: 600, fontSize: 14 }}>Post</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}