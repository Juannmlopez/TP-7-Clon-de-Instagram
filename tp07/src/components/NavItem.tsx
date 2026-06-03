import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function NavItem({ icon, label, active = false }: NavItemProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "12px 16px", borderRadius: 8, cursor: "pointer",
        fontWeight: active ? 600 : 400, color: "#262626",
        background: hover ? "#f5f5f5" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon}
      <span style={{ fontSize: 16 }}>{label}</span>
    </div>
  );
}