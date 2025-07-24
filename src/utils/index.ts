export function formatPrice(value: string | number): string {
  const numeric = String(value).replace(/\D/g, '')
  if (!numeric) return ''
  return Number(numeric).toLocaleString('ru-RU')
}
