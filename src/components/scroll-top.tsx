"use client"

import { useEffect, useState } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop
      setVisible(scrolled > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={scrollToTop}
    >
      <Icons.arrowRight className="h-4 w-4 -rotate-90" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}