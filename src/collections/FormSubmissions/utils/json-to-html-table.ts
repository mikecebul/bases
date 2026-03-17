export function jsonToHtmlTable(obj: Record<string, any>): string {
  let htmlTable = `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">`

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        // Handle arrays
        htmlTable += `
          <tr>
            <td style="font-weight: bold; vertical-align: top;">${key}</td>
            <td>
              <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; margin-top: 5px; width: 100%;">
                ${value
                  .map(
                    (item) =>
                      `<tr><td>${typeof item === 'object' ? jsonToHtmlTable(item) : item}</td></tr>`,
                  )
                  .join('')}
              </table>
            </td>
          </tr>`
      } else {
        // Handle nested objects
        htmlTable += `
          <tr>
            <td style="font-weight: bold; vertical-align: top;">${key}</td>
            <td>${jsonToHtmlTable(value)}</td>
          </tr>`
      }
    } else {
      htmlTable += `<tr>
        <td style="font-weight: bold;">${key}</td>
        <td>${value}</td>
      </tr>`
    }
  }

  htmlTable += `</table>`
  return htmlTable
}
