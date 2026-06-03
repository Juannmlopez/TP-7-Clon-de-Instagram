export default function Skeleton() {
    return (
      <>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
        <article style={{ background: "#fff", border: "1px solid #dbdbdb", borderRadius: 8, marginBottom: 24, width: "100%", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#efefef" }} />
            <div style={{ width: 120, height: 12, borderRadius: 6, background: "#efefef" }} />
          </div>
          <div style={{ width: "100%", aspectRatio: "1/1", background: "#efefef", animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ width: 80, height: 12, borderRadius: 6, background: "#efefef" }} />
            <div style={{ width: "70%", height: 12, borderRadius: 6, background: "#efefef" }} />
            <div style={{ width: "40%", height: 10, borderRadius: 6, background: "#efefef" }} />
          </div>
        </article>
      </>
    );
  }