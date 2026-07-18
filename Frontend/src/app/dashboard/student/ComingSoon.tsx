import React from "react"

interface ComingSoonProps {
  title: string
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center justify-center text-center h-[calc(100vh-160px)]">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-float">
        <span className="material-symbols-outlined text-4xl select-none">construction</span>
      </div>
      <h2 className="text-headline-lg font-bold text-on-surface mb-2">{title} Page</h2>
      <p className="text-on-surface-variant font-body-md max-w-md mb-8">
        We are building something awesome! The {title.toLowerCase()} feature is currently under development and will be available soon.
      </p>
      <div className="h-1.5 w-24 bg-primary/25 rounded-full" />
    </div>
  )
}
