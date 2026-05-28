import { Link } from 'react-router-dom'

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon && <div className="text-6xl mb-6 opacity-30">{icon}</div>}
      <h3 className="font-display text-2xl text-white mb-3">{title}</h3>
      {description && <p className="font-body text-sm text-gray-500 max-w-sm mb-6">{description}</p>}
      {action && (
        <Link to={action.href} className="btn-outline">
          {action.label}
        </Link>
      )}
    </div>
  )
}