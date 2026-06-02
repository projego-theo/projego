'use client';

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Typewriter = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  cursorChar = "|",
  cursorClassName = "ml-1",
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.01, repeat: Infinity, repeatDelay: 0.4, repeatType: "reverse" as const },
    },
  },
}: any) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const texts = Array.isArray(text) ? text : [text]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentText = texts[currentTextIndex]
    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setCurrentIndex(0)
      } else {
        timeout = setTimeout(() => setDisplayText((prev) => prev.slice(0, -1)), deleteSpeed)
      }
    } else {
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
      } else if (texts.length > 1) {
        timeout = setTimeout(() => setIsDeleting(true), waitTime)
      }
    }
    return () => clearTimeout(timeout)
  }, [currentIndex, displayText, isDeleting, texts, currentTextIndex])

  return (
    <span className={`inline whitespace-pre-wrap ${className || ''}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span variants={cursorAnimationVariants} className={cursorClassName} initial="initial" animate="animate">
          {cursorChar}
        </motion.span>
      )}
    </span>
  )
}
export { Typewriter }
