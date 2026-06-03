interface AvatarProps {
    src: string;
    size?: number;
    story?: boolean;
    isUser?: boolean;
  }
  
  export default function Avatar({ src, size = 32, story = false, isUser = false }: AvatarProps) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: size, height: size, borderRadius: "50%",
          padding: story ? 2 : 0,
          background: story
            ? "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)"
            : "transparent",
        }}>
          <div style={{
            width: story ? size - 4 : size,
            height: story ? size - 4 : size,
            borderRadius: "50%",
            border: story ? "2px solid #fff" : "none",
            overflow: "hidden",
            background: "#dbdbdb",
          }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        {isUser && (
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 16, height: 16, borderRadius: "50%",
            background: "#0095f6", border: "2px solid #fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="8" height="8" viewBox="0 0 10 10">
              <line x1="5" y1="1" x2="5" y2="9" strokeWidth="2" stroke="white" />
              <line x1="1" y1="5" x2="9" y2="5" strokeWidth="2" stroke="white" />
            </svg>
          </div>
        )}
      </div>
    );
  }