/**
 * Process double curly bracket variables in RichText content
 * Currently supports: {{soberdate}} - calculates years since two dates and adds them together
 */
export const replaceDoubleCurlysRichText = (text: string): string => {
  const regex = /\{\{(.+?)\}\}/g

  return text.replace(regex, (_, variable: string) => {
    const trimmedVariable = variable.trim()

    if (trimmedVariable === 'scott_celia_total_sober_years') {
      // Calculate years since 11/9/1984
      const scottCleanDate = new Date(1984, 10, 9) // Month is 0-indexed, so 10 = November
      const scottYearsClean = Math.floor(
        (Date.now() - scottCleanDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
      )

      // Calculate years since 12/31/1986
      const celiaCleanDate = new Date(1986, 11, 31) // Month is 0-indexed, so 11 = December
      const celiaYearsClean = Math.floor(
        (Date.now() - celiaCleanDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
      )

      // Add them together
      const totalYears = scottYearsClean + celiaYearsClean

      return totalYears.toString()
    }

    // Return original text if variable not recognized
    return `{{${variable}}}`
  })
}
