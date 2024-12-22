'use server'

export const action = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { message: 'Action called successfully!' }
}
