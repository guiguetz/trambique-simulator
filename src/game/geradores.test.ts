import { describe, it, expect } from 'vitest'
import { comprarGerador, getProducaoPorSegundo, getGeradoresDisponiveis, getCustoGerador } from './geradores'
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

describe('getCustoGerador', () => {
  it('retorna custo base para primeiro gerador', () => {
    expect(getCustoGerador('cabos_eleitorais', 0)).toBe(10)
  })

  it('aumenta custo com quantidade (1.15x por unidade)', () => {
    const custo0 = getCustoGerador('cabos_eleitorais', 0)
    const custo1 = getCustoGerador('cabos_eleitorais', 1)
    expect(custo1).toBeGreaterThan(custo0)
  })
})

describe('comprarGerador', () => {
  it('adiciona gerador ao estado', () => {
    const estado = estadoBase()
    const novo = comprarGerador(estado, 'cabos_eleitorais')
    expect(novo.geradores.cabos_eleitorais).toBe(1)
  })

  it('deduz dinheiro do estado', () => {
    const estado = estadoBase({ dinheiro: 100 })
    const custo = getCustoGerador('cabos_eleitorais', 0)
    const novo = comprarGerador(estado, 'cabos_eleitorais')
    expect(novo.dinheiro).toBe(100 - custo)
  })

  it('incrementa quantidade existente', () => {
    const estado = estadoBase({ geradores: { cabos_eleitorais: 5 } })
    const novo = comprarGerador(estado, 'cabos_eleitorais')
    expect(novo.geradores.cabos_eleitorais).toBe(6)
  })

  it('retorna estado sem mudanças se dinheiro insuficiente', () => {
    const estado = estadoBase({ dinheiro: 0 })
    const novo = comprarGerador(estado, 'cabos_eleitorais')
    expect(novo.geradores.cabos_eleitorais).toBeUndefined()
    expect(novo.dinheiro).toBe(0)
  })
})

describe('getProducaoPorSegundo', () => {
  it('retorna 0 com nenhum gerador', () => {
    const estado = estadoBase()
    const prod = getProducaoPorSegundo(estado)
    expect(prod.votos).toBe(0)
    expect(prod.dinheiro).toBe(0)
  })

  it('calcula produção de cabos eleitorais (votos)', () => {
    const estado = estadoBase({ geradores: { cabos_eleitorais: 10 } })
    const prod = getProducaoPorSegundo(estado)
    expect(prod.votos).toBe(10)
    expect(prod.dinheiro).toBe(0)
  })

  it('calcula produção de propina (dinheiro)', () => {
    const estado = estadoBase({ geradores: { propina: 5 } })
    const prod = getProducaoPorSegundo(estado)
    expect(prod.votos).toBe(0)
    expect(prod.dinheiro).toBe(5)
  })

  it('soma produção de múltiplos geradores', () => {
    const estado = estadoBase({ geradores: { cabos_eleitorais: 10, propina: 5 } })
    const prod = getProducaoPorSegundo(estado)
    expect(prod.votos).toBe(10)
    expect(prod.dinheiro).toBe(5)
  })
})

describe('getGeradoresDisponiveis', () => {
  it('retorna geradores desbloqueados para vereador', () => {
    const estado = estadoBase()
    const disponiveis = getGeradoresDisponiveis(estado)
    expect(disponiveis.length).toBe(2) // cabos_eleitorais + propina
  })

  it('retorna mais geradores para deputado', () => {
    const estado = estadoBase({ cargoAtual: 'deputado_estadual' })
    const disponiveis = getGeradoresDisponiveis(estado)
    expect(disponiveis.length).toBe(3) // + caixa_2
  })
})