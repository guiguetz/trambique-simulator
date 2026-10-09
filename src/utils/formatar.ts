// Formatação de números grandes
export function formatarNumero(n: number): string {
  if (n < 1000) return Math.floor(n).toString()
  if (n < 1000000) return (n / 1000).toFixed(1) + 'K'
  if (n < 1000000000) return (n / 1000000).toFixed(1) + 'M'
  if (n < 1000000000000) return (n / 1000000000).toFixed(1) + 'B'
  return (n / 1000000000000).toFixed(1) + 'T'
}

// Formatação de tempo
export function formatarTempo(segundos: number): string {
  if (segundos < 60) return `${segundos}s`
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return `${minutos}m${segs > 0 ? `${segs}s` : ''}`
}

// Nomes de cargos em português
export const CARGOS_NOMES: Record<string, string> = {
  vereador: 'Vereador do Rio',
  deputado_estadual: 'Deputado Estadual',
  governador: 'Governador',
  deputado_federal: 'Deputado Federal',
  senador: 'Senador',
  presidente: 'Presidente',
  imperador: 'Imperador Supremo',
}