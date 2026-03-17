'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTheme } from 'next-themes'
import React from 'react'

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  const onThemeChange = (themeToSet: 'light' | 'dark' | 'system') => {
    setTheme(themeToSet)
  }

  return (
    <Select onValueChange={onThemeChange} value={theme ?? 'system'}>
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
