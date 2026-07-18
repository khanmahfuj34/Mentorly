import React from "react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-outline-variant/30 py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <a className="text-headline-md font-display font-bold text-primary" href="#">
              Mentorly
            </a>
            <p className="text-on-surface-variant text-sm mt-4 max-w-xs leading-relaxed">
              Connecting brilliance with ambition across Bangladesh. The most trusted platform for private education.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-on-surface">Platform</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Find Tutors
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Find Tuition
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Become a Tutor
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-on-surface">Company</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Safety First
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Support Center
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
          <p>© 2024 Mentorly Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
