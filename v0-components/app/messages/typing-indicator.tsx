"use client"

import { motion } from "framer-motion"

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
          animate={{
            y: [0, -3, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
