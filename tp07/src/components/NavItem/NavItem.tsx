import './NavItem.css'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

export default function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`nav-item${active ? ' nav-item--active' : ''}`}>
      {icon}
      <span className="nav-item__label">{label}</span>
    </div>
  )
}
