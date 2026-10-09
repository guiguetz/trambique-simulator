import { describe, it, expect } from 'vitest'
import { ativarTrambique, getTrambiquesDisponiveis, tickCooldowns, getTrambiqueEfeito } from './trambiques'
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

describe('ativarTrambique', () => {
  it('ativa trambique e aplica efeito de dinheiro instantâneo', () => {
    const estado = estadoBase()
    const novo = ativarTrambique(estado, 'desviar_verba')
    expect(novo.dinheiro).toBe(100)
  })

  it('ativa trambique e aplica efeito de votos instantâneo', () => {
    const estado = estadoBase()
    const novo = ativarTrambique(estado, 'forjar_documento')
    expect(novo.votos).toBe(100)
  })

  it('inicia cooldown após ativação', () => {
    const estado = estadoBase()
    const novo = ativarTrambique(estado, 'desviar_verba')
    expect(novo.trambiques.desviar_verba).toBe(20)
  })

  it('não ativa se em cooldown', () => {
    const estado = estadoBase({ trambiques: { desviar_verba: 15 } })
    const novo = ativarTrambique(estado, 'desviar_verba')
    expect(novo.dinheiro).toBe(0) // não aplicou efeito
    expect(novo.trambiques.desviar_verba).toBe(15) // cooldown não mudou
  })
})

describe('tickCooldowns', () => {
  it('reduz cooldown em 1 segundo', () => {
    const estado = estadoBase({ trambiques: { desviar_verba: 10 } })
    const novo = tickCooldowns(estado)
    expect(novo.trambiques.desviar_verba).toBe(9)
  })

  it('remove cooldown quando chega a 0', () => {
    const estado = estadoBase({ trambiques: { desviar_verba: 1 } })
    const novo = tickCooldowns(estado)
    expect(novo.trambiques.desviar_verba).toBeUndefined()
  })

  it('não afeta trambiques sem cooldown', () => {
    const estado = estadoBase()
    const novo = tickCooldowns(estado)
    expect(novo.trambiques.desviar_verba).toBeUndefined()
  })
})

describe('getTrambiquesDisponiveis', () => {
  it('retorna trambiques desbloqueados para vereador', () => {
    const estado = estadoBase()
    const disponiveis = getTrambiquesDisponiveis(estado)
    expect(disponiveis).toContain('desviar_verba')
    expect(disponiveis).toContain('forjar_documento')
    expect(disponiveis).not.toContain('comprar_jornalista')
  })
})

describe('getTrambiqueEfeito', () => {
  it('retorna efeito de bônus temporário', () => {
    const estado = estadoBase()
    const efeito = getTrambiqueEfeito(estado, 'comprar_jornalista')
    expect(efeito).toBeNull() // não desbloqueado
  })

  it('retorna null para trambique inexistente', () => {
    const estado = estadoBase()
    const efeito = getTrambiqueEfeito(estado, 'inexistente')
    expect(efeito).toBeNull()
  })
})