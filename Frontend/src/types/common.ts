export interface Tutor {
  id: string
  name: string
  avatar: string
  verified: boolean
  subjects: string
  institution: string
  rating: number
  experience: string
  classesTaken: string
  availability: string
  salary: number
  location?: string
  medium?: string
}

export interface Tuition {
  id: string
  title: string
  isNew?: boolean
  location: string
  salary: string
  schedule: string
  postedTime: string
  subject?: string
  classLevel?: string
  medium?: string
  status?: string
}

export interface Subject {
  id: string
  name: string
  tutorCount: string
  icon: string
}

export interface Blog {
  id: string
  title: string
  summary: string
  imageUrl: string
  delay?: number
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  delay?: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface District {
  id: string
  name: string
  tutorCount: string
}
