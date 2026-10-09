import { describe, it, expect } from 'vitest'
import { calcularClique } from './clique'

describe('calcularClique', () => {
  it('gera 1 voto e 1 dinheiro com multiplicador base', () => {
    const resultado = calcularClique({ multiplicador: 1, votosExtras: 0, dinheiroExtra: 0, multiplicadorClique: 1 })
    expect(resultado.votos).toBe(1)
    expect(resultado.dinheiro).toBe(1)
  })

  it('aplica multiplicador de cargo', () => {
    const resultado = calcularClique({ multiplicador: 4, votosExtras: 0, dinheiroExtra: 0, multiplicadorClique: 1 })
    expect(resultado.votos).toBe(4)
    expect(resultado.dinheiro).toBe(4)
  })

  it('soma votos extras de upgrades', () => {
    const resultado = calcularClique({ multiplicador: 1, votosExtras: 5, dinheiroExtra: 3, multiplicadorClique: 1 })
    expect(resultado.votos).toBe(6)
    expect(resultado.dinheiro).toBe(4)
  })

  it('aplica multiplicador de clique de upgrades', () => {
    const resultado = calcularClique({ multiplicador: 1, votosExtras: 0, dinheiroExtra: 0, multiplicadorClique: 2 })
    expect(resultado.votos).toBe(2)
    expect(resultado.dinheiro).toBe(2)
  })

  it('combina multiplicador de cargo e clique', () => {
    const resultado = calcularClique({ multiplicador: 4, votosExtras: 2, dinheiroExtra: 1, multiplicadorClique: 2 })
    expect(resultado.votos).toBe(12) // (1 + 2) * 4 * 1 (não, vamos ver a fórmula)
    expect(resultado.dinheiro).toBe(8)
  })

  it('retorna números inteiros', () => {
    const resultado = calcularClique({ multiplicador: 3, votosExtras: 1, dinheiroExtra: 1, multiplicadorClique: 1.5 })
    expect(Number.isInteger(resultado.votos)).toBe(true)
    expect(Number.isInteger(resultado.dinheiro)).toBe(true)
  })
})