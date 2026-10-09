import { describe, it, expect } from 'vitest'
import { podeSubirDeCargo, subirDeCargo, getProximoCargo, getCargoConfig, getMultiplicadorClique } from './prestige'
import type { GameState } from '../types'

function estadoBase(overrides: Partial<GameState> = {}): GameState {
  return {
    votos: 0,
    dinheiro: 0,
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

describe('podeSubirDeCargo', () => {
  it('retorna true quando votos >= limite', () => {
    const estado = estadoBase({ votos: 1000 })
    expect(podeSubirDeCargo(estado)).toBe(true)
  })

  it('retorna false quando votos < limite', () => {
    const estado = estadoBase({ votos: 999 })
    expect(podeSubirDeCargo(estado)).toBe(false)
  })

  it('retorna false quando já é imperador', () => {
    const estado = estadoBase({ cargoAtual: 'imperador', votos: 999999999999 })
    expect(podeSubirDeCargo(estado)).toBe(false)
  })
})

describe('subirDeCargo', () => {
  it('reseta votos e dinheiro para 0', () => {
    const estado = estadoBase({ votos: 1000, dinheiro: 500 })
    const novo = subirDeCargo(estado)
    expect(novo.votos).toBe(0)
    expect(novo.dinheiro).toBe(0)
  })

  it('avança para próximo cargo', () => {
    const estado = estadoBase({ votos: 1000 })
    const novo = subirDeCargo(estado)
    expect(novo.cargoAtual).toBe('deputado_estadual')
  })

  it('atualiza multiplicador de cargo', () => {
    const estado = estadoBase({ votos: 1000 })
    const novo = subirDeCargo(estado)
    expect(novo.multiplicadorCargo).toBe(2)
  })

  it('mantém upgrades permanentes', () => {
    const estado = estadoBase({ votos: 1000, upgrades: { melhorar_discurso: 5 } })
    const novo = subirDeCargo(estado)
    expect(novo.upgrades.melhorar_discurso).toBe(5)
  })

  it('mantém habilidades permanentes', () => {
    const estado = estadoBase({ votos: 1000, habilidades: { politico: 3, financeiro: 0, trambique: 0, resiliencia: 0 } })
    const novo = subirDeCargo(estado)
    expect(novo.habilidades.politico).toBe(3)
  })

  it('mantém geradores mas reseta quantidade', () => {
    const estado = estadoBase({ votos: 1000, geradores: { cabos_eleitorais: 10 } })
    const novo = subirDeCargo(estado)
    expect(novo.geradores.cabos_eleitorais).toBe(10)
  })
})

describe('getProximoCargo', () => {
  it('retorna deputado_estadual para vereador', () => {
    expect(getProximoCargo('vereador')).toBe('deputado_estadual')
  })

  it('retorna imperador para presidente', () => {
    expect(getProximoCargo('presidente')).toBe('imperador')
  })

  it('retorna null para imperador', () => {
    expect(getProximoCargo('imperador')).toBeNull()
  })
})

describe('getCargoConfig', () => {
  it('retorna config do vereador', () => {
    const config = getCargoConfig('vereador')
    expect(config.nome).toBe('Vereador do Rio')
    expect(config.limiteVotos).toBe(1000)
    expect(config.multiplicador).toBe(1)
  })
})

describe('getMultiplicadorClique', () => {
  it('retorna multiplicador base do cargo', () => {
    const estado = estadoBase()
    expect(getMultiplicadorClique(estado)).toBe(1)
  })

  it('combina com multiplicadorClique de upgrades', () => {
    const estado = estadoBase({ multiplicadorClique: 2 })
    expect(getMultiplicadorClique(estado)).toBe(2)
  })
})