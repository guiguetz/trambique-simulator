import { describe, it, expect } from 'vitest'
import { investirPonto, getHabilidadesDesbloqueadas, resetarHabilidades, getRamosDisponiveis } from './habilidades'
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

describe('investirPonto', () => {
  it('investe ponto no ramo político', () => {
    const estado = estadoBase()
    const novo = investirPonto(estado, 'politico')
    expect(novo.habilidades.politico).toBe(1)
  })

  it('investe ponto no ramo financeiro', () => {
    const estado = estadoBase()
    const novo = investirPonto(estado, 'financeiro')
    expect(novo.habilidades.financeiro).toBe(1)
  })

  it('acumula pontos no mesmo ramo', () => {
    const estado = estadoBase({ habilidades: { politico: 3, financeiro: 0, trambique: 0, resiliencia: 0 } })
    const novo = investirPonto(estado, 'politico')
    expect(novo.habilidades.politico).toBe(4)
  })

  it('desbloqueia habilidade a cada 5 pontos', () => {
    const estado = estadoBase({ habilidades: { politico: 4, financeiro: 0, trambique: 0, resiliencia: 0 } })
    const novo = investirPonto(estado, 'politico')
    expect(novo.habilidadesDesbloqueadas).toContain('politico_1')
  })

  it('não desbloqueia habilidade antes de 5 pontos', () => {
    const estado = estadoBase({ habilidades: { politico: 2, financeiro: 0, trambique: 0, resiliencia: 0 } })
    const novo = investirPonto(estado, 'politico')
    expect(novo.habilidadesDesbloqueadas).not.toContain('politico_1')
  })

  it('aplica efeito de habilidade desbloqueada', () => {
    const estado = estadoBase({ votos: 100, habilidades: { politico: 4, financeiro: 0, trambique: 0, resiliencia: 0 } })
    const novo = investirPonto(estado, 'politico')
    expect(novo.votosExtras).toBe(10) // +10% de 100 votos
  })
})

describe('getHabilidadesDesbloqueadas', () => {
  it('retorna habilidades desbloqueadas', () => {
    const estado = estadoBase({ habilidadesDesbloqueadas: ['politico_1', 'financeiro_1'] })
    const habs = getHabilidadesDesbloqueadas(estado)
    expect(habs.length).toBe(2)
  })

  it('retorna vazio se nenhuma desbloqueada', () => {
    const estado = estadoBase()
    const habs = getHabilidadesDesbloqueadas(estado)
    expect(habs.length).toBe(0)
  })
})

describe('resetarHabilidades', () => {
  it('reseta todos os pontos para 0', () => {
    const estado = estadoBase({ habilidades: { politico: 5, financeiro: 3, trambique: 2, resiliencia: 1 } })
    const novo = resetarHabilidades(estado)
    expect(novo.habilidades.politico).toBe(0)
    expect(novo.habilidades.financeiro).toBe(0)
    expect(novo.habilidades.trambique).toBe(0)
    expect(novo.habilidades.resiliencia).toBe(0)
  })

  it('limpa habilidades desbloqueadas', () => {
    const estado = estadoBase({ habilidadesDesbloqueadas: ['politico_1'] })
    const novo = resetarHabilidades(estado)
    expect(novo.habilidadesDesbloqueadas.length).toBe(0)
  })
})

describe('getRamosDisponiveis', () => {
  it('retorna todos os 4 ramos', () => {
    const ramos = getRamosDisponiveis()
    expect(ramos).toContain('politico')
    expect(ramos).toContain('financeiro')
    expect(ramos).toContain('trambique')
    expect(ramos).toContain('resiliencia')
  })
})