import './Skeleton.css'

export default function Skeleton() {
  return (
    <article className="skeleton">
      <div className="skeleton__header">
        <div className="skeleton__avatar" />
        <div className="skeleton__line skeleton__line--short" />
      </div>
      <div className="skeleton__media" />
      <div className="skeleton__body">
        <div className="skeleton__line skeleton__line--xs" />
        <div className="skeleton__line skeleton__line--medium" />
        <div className="skeleton__line skeleton__line--tiny" />
      </div>
    </article>
  )
}
