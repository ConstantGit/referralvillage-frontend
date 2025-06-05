"use client"
import { motion, AnimatePresence } from "framer-motion"

export function SuccessAnimation() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
