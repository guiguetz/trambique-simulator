import { describe, it, expect } from 'vitest'
import { comprarUpgrade, getEfeitoClique, getUpgradesDisponiveis, getCustoUpgrade } from './upgrades'
import type { GameState } from '../types'

function estadoBase(overrides: Partial<GameState> = {}): GameState {
  return {
    votos: 0,
    dinheiro: 1000,
    cargoAtual: 'vereador',
    multiplicadorCargo: 1,
    taxaVotosParaDinheiro: 0.1,
    taxaDinheiroParaVotos: 0.1,
    votosExtras: 0,
    dinheiroExtra: 0,
    multiplicadorClique: 1,
    geradores: {},
    upgrades: {},
    trambiques: {},
    eventosAtivos: [],
    habilidades: { politico: 0, financeiro: 0, trambique: 0, resiliencia: 0 },
    habilidadesDesbloqueadas: [],
    ...overrides,
  }
}

describe('getCustoUpgrade', () => {
  it('retorna custo base para nível 0', () => {
    expect(getCustoUpgrade('melhorar_discurso', 0)).toBe(50)
  })

  it('dobra custo a cada nível', () => {
    expect(getCustoUpgrade('melhorar_discurso', 1)).toBe(100)
    expect(getCustoUpgrade('melhorar_discurso', 2)).toBe(200)
  })
})

describe('comprarUpgrade', () => {
  it('aumenta nível do upgrade', () => {
    const estado = estadoBase()
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.upgrades.melhorar_discurso).toBe(1)
  })

  it('deduz dinheiro', () => {
    const estado = estadoBase({ dinheiro: 100 })
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.dinheiro).toBe(50)
  })

  it('incrementa nível existente', () => {
    const estado = estadoBase({ dinheiro: 5000, upgrades: { melhorar_discurso: 5 }, votosExtras: 5 })
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.upgrades.melhorar_discurso).toBe(6)
  })

  it('não compra se dinheiro insuficiente', () => {
    const estado = estadoBase({ dinheiro: 10 })
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.upgrades.melhorar_discurso).toBeUndefined()
  })

  it('não compra se já no nível máximo', () => {
    const estado = estadoBase({ upgrades: { melhorar_discurso: 100 } })
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.upgrades.melhorar_discurso).toBe(100)
  })

  it('aplica efeito de votos extras', () => {
    const estado = estadoBase()
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.votosExtras).toBe(1)
  })

  it('aplica efeito de dinheiro extra', () => {
    const estado = estadoBase()
    const novo = comprarUpgrade(estado, 'tempo_tv')
    expect(novo.dinheiroExtra).toBe(1)
  })

  it('acumula efeitos de múltiplos níveis', () => {
    const estado = estadoBase({ dinheiro: 5000, upgrades: { melhorar_discurso: 5 }, votosExtras: 5 })
    const novo = comprarUpgrade(estado, 'melhorar_discurso')
    expect(novo.votosExtras).toBe(6)
  })
})

describe('getEfeitoClique', () => {
  it('retorna extras baseados nos upgrades comprados', () => {
    const estado = estadoBase({ upgrades: { melhorar_discurso: 3 }, votosExtras: 3 })
    const efeito = getEfeitoClique(estado)
    expect(efeito.votosExtras).toBe(3)
    expect(efeito.dinheiroExtra).toBe(0)
  })

  it('combina votos e dinheiro extras', () => {
    const estado = estadoBase({ upgrades: { melhorar_discurso: 2, tempo_tv: 3 }, votosExtras: 2, dinheiroExtra: 3 })
    const efeito = getEfeitoClique(estado)
    expect(efeito.votosExtras).toBe(2)
    expect(efeito.dinheiroExtra).toBe(3)
  })
})

describe('getUpgradesDisponiveis', () => {
  it('retorna upgrades desbloqueados para vereador', () => {
    const estado = estadoBase()
    const disponiveis = getUpgradesDisponiveis(estado)
    expect(disponiveis).toContain('melhorar_discurso')
    expect(disponiveis).toContain('tempo_tv')
    expect(disponiveis).not.toContain('marketing_politico')
  })
})