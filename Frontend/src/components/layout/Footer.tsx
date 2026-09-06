import React from "react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-outline-variant/30 py-16">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
                M
              </span>
              <span className="text-2xl font-display font-bold text-primary tracking-tight">
                Mentorly
              </span>
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Connecting students with the right tutors and opportunities through one trusted platform.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-on-surface-variant">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/find-tutors" className="hover:text-primary transition-colors">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link href="/find-tuition" className="hover:text-primary transition-colors">
                  Find Tuition
                </Link>
              </li>
              <li>
                <Link href="/become-tutor" className="hover:text-primary transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Account */}
          <div>
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm text-on-surface-variant">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-on-surface-variant">
              <li>
                <Link href="/about#faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
          <p>© {currentYear} Mentorly. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
