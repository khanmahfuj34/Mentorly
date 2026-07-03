"use client"

import React from "react"
import { motion } from "framer-motion"
import { BLOGS } from "@/data/blogs"

const BLOG_IMG = "/assets/images/student.jpg"


export default function BlogPreview() {
  return (
    <section className="py-stack-xl bg-surface-container-low/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-xl gap-4"
        >
          <div>
            <h2 className="font-display text-headline-lg text-on-surface">Education Insights</h2>
            <p className="text-on-surface-variant mt-1">Tips and trends for modern learners.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 cursor-pointer hover:underline">
            Read All{" "}
            <span className="material-symbols-outlined text-sm align-middle select-none">chevron_right</span>
          </button>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {BLOGS.map((blog) => {
            const imageSrc = BLOG_IMG

            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: blog.delay }}
                className="group cursor-pointer"
              >
                <div className="rounded-24 overflow-hidden h-48 mb-4 shadow-md border border-outline-variant/10">
                  <img
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageSrc}
                  />
                </div>
                <h4 className="font-bold group-hover:text-primary transition-colors mb-2 text-on-surface text-base sm:text-lg">
                  {blog.title}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {blog.summary}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
