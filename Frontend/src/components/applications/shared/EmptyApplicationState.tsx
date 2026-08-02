import React from "react"

interface EmptyApplicationStateProps {
  title: string
  subtitle: string
  icon?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyApplicationState({
  title,
  subtitle,
  icon = "inbox",
  actionLabel,
  onAction,
}: EmptyApplicationStateProps) {
  return (
    <div className="max-w-md mx-auto py-16 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-float">
        <span className="material-symbols-outlined text-4xl select-none">{icon}</span>
      </div>
      <h3 className="text-headline-sm font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant font-body-md max-w-sm mb-8 leading-relaxed">
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}
