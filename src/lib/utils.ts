import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  const symbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL ?? '$'
  return `${symbol}${amount.toFixed(2)}`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 9000 + 1000)
  return `INV-${year}${month}${day}-${random}`
}

export function generateBarcode(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return timestamp.slice(-7) + random
}

export function generateSKU(name: string, category: string): string {
  const namePart = name.slice(0, 3).toUpperCase().replace(/\s/g, '')
  const catPart = category.slice(0, 3).toUpperCase().replace(/\s/g, '')
  const random = Math.floor(Math.random() * 900 + 100)
  return `${catPart}-${namePart}-${random}`
}

export function getWarrantyStatus(endDate: string | Date): 'active' | 'expiring' | 'expired' {
  const end = new Date(endDate)
  const now = new Date()
  const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return 'expired'
  if (daysLeft <= 30) return 'expiring'
  return 'active'
}

export function getDaysLeft(endDate: string | Date): number {
  const end = new Date(endDate)
  const now = new Date()
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}
