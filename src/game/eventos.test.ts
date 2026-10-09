import { describe, it, expect } from 'vitest'
import { verificarEvento, aplicarEvento, tickEventos, getEventosAtivos } from './eventos'
import type { GameState } from '../types'

function estadoBase(overrides: Partial<GameState> = {}): GameState {
  return {
    votos: 100,
    dinheiro: 100,
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

describe('verificarEvento', () => {
  it('retorna null quando não há evento', () => {
    // chance muito alta = não cai em nenhum evento
    const evento = verificarEvento(2.0)
    expect(evento).toBeNull()
  })

  it('retorna evento quando chance favorece', () => {
    const evento = verificarEvento(0.01) // chance baixa = com evento
    expect(evento).not.toBeNull()
  })
})

describe('aplicarEvento', () => {
  it('aplica evento negativo de redução de votos', () => {
    const estado = estadoBase({ votos: 100 })
    const evento = { id: 'cpi', nome: 'CPI', tipo: 'reduz_votos' as const, valor: 0.5, duracao: 30 }
    const novo = aplicarEvento(estado, evento)
    expect(novo.votos).toBe(50)
  })

  it('aplica evento positivo de aumento de votos', () => {
    const estado = estadoBase()
    const evento = { id: 'discurso', nome: 'Discurso Viral', tipo: 'aumenta_votos' as const, valor: 2, duracao: 30 }
    const novo = aplicarEvento(estado, evento)
    expect(novo.eventosAtivos.length).toBe(1)
  })

  it('aplica evento de remoção de penalidades', () => {
    const estado = estadoBase({
      eventosAtivos: [{
        id: 'cpi',
        nome: 'CPI',
        tipo: 'reduz_votos' as const,
        multiplicador: 0.5,
        duracaoRestante: 15,
      }],
    })
    const evento = { id: 'anistia', nome: 'Anistia', tipo: 'remove_penalidades' as const, valor: 1, duracao: 0 }
    const novo = aplicarEvento(estado, evento)
    expect(novo.eventosAtivos.length).toBe(0)
  })
})

describe('tickEventos', () => {
  it('reduz duração dos eventos ativos', () => {
    const estado = estadoBase({
      eventosAtivos: [{
        id: 'cpi',
        nome: 'CPI',
        tipo: 'reduz_votos' as const,
        multiplicador: 0.5,
        duracaoRestante: 10,
      }],
    })
    const novo = tickEventos(estado)
    expect(novo.eventosAtivos[0].duracaoRestante).toBe(9)
  })

  it('remove eventos expirados', () => {
    const estado = estadoBase({
      eventosAtivos: [{
        id: 'cpi',
        nome: 'CPI',
        tipo: 'reduz_votos' as const,
        multiplicador: 0.5,
        duracaoRestante: 1,
      }],
    })
    const novo = tickEventos(estado)
    expect(novo.eventosAtivos.length).toBe(0)
  })
})

describe('getEventosAtivos', () => {
  it('retorna lista de eventos ativos', () => {
    const estado = estadoBase({
      eventosAtivos: [{
        id: 'cpi',
        nome: 'CPI',
        tipo: 'reduz_votos' as const,
        multiplicador: 0.5,
        duracaoRestante: 10,
      }],
    })
    const eventos = getEventosAtivos(estado)
    expect(eventos.length).toBe(1)
    expect(eventos[0].nome).toBe('CPI')
  })
})