import { describe, it, expect } from 'vitest'
import { realizarAposta, getApostasDisponiveis } from './apostas'
import type { GameState } from '../types'

function estadoBase(overrides: Partial<GameState> = {}): GameState {
  return {
    votos: 0,
    dinheiro: 10000,
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

describe('realizarAposta', () => {
  it('deduz custo da aposta e aplica resultado', () => {
    const estado = estadoBase({ dinheiro: 1000 })
    const resultado = realizarAposta(estado, 'trambique_arriscado', 0.3) // vitória
    // 1000 - 100 custo + 500 recompensa = 1400
    expect(resultado.novoEstado.dinheiro).toBe(1400)
    expect(resultado.vitoria).toBe(true)
  })

  it('retorna vitória quando chance favorece', () => {
    const estado = estadoBase({ dinheiro: 1000 })
    const resultado = realizarAposta(estado, 'trambique_arriscado', 0.3) // < 0.5 = vitória
    expect(resultado.vitoria).toBe(true)
    expect(resultado.novoEstado.dinheiro).toBeGreaterThan(900)
  })

  it('retorna derrota quando chance não favorece', () => {
    const estado = estadoBase({ dinheiro: 1000 })
    const resultado = realizarAposta(estado, 'trambique_arriscado', 0.7) // >= 0.5 = derrota
    expect(resultado.vitoria).toBe(false)
    expect(resultado.novoEstado.dinheiro).toBeLessThan(900)
  })

  it('não aposta se dinheiro insuficiente', () => {
    const estado = estadoBase({ dinheiro: 50 })
    const resultado = realizarAposta(estado, 'trambique_arriscado', 0.3)
    expect(resultado.novoEstado.dinheiro).toBe(50)
    expect(resultado.vitoria).toBeNull()
  })

  it('aposta com votos como custo', () => {
    const estado = estadoBase({ votos: 20000 })
    const resultado = realizarAposta(estado, 'aposta_eleitoral', 0.05) // < 0.1 = vitória
    expect(resultado.vitoria).toBe(true)
    expect(resultado.novoEstado.votos).toBe(10000) // 20000 - 10000 custo (cargo reward não implementado)
  })
})

describe('getApostasDisponiveis', () => {
  it('retorna todas as apostas', () => {
    const apostas = getApostasDisponiveis()
    expect(apostas.length).toBe(3)
  })
})