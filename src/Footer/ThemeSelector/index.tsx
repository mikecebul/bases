'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [value, setValue] = useState(theme)
  const onThemeChange = (themeToSet: 'light' | 'dark' | 'system') => {
    setTheme(themeToSet)
    setValue(themeToSet)
  }

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}
