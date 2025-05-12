import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get API URL
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  return baseUrl ? `${baseUrl}${path}` : path
}
