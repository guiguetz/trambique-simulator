import { describe, it, expect, beforeEach } from 'vitest'
import { salvarManual, carregar, exportarSave, importarSave, getSaveFromStorage } from './save'
import type { GameState } from '../types'

function estadoBase(overrides: Partial<GameState> = {}): GameState {
  return {
    votos: 100,
    dinheiro: 200,
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

beforeEach(() => {
  localStorage.clear()
})

describe('salvarManual', () => {
  it('salva estado no localStorage', () => {
    const estado = estadoBase()
    salvarManual(estado)
    const salvo = localStorage.getItem('trambique_save')
    expect(salvo).not.toBeNull()
  })
})

describe('carregar', () => {
  it('carrega estado do localStorage', () => {
    const estado = estadoBase({ votos: 999 })
    salvarManual(estado)
    const carregado = carregar()
    expect(carregado?.votos).toBe(999)
  })

  it('retorna null se não há save', () => {
    const carregado = carregar()
    expect(carregado).toBeNull()
  })
})

describe('exportarSave', () => {
  it('gera código base64', () => {
    const estado = estadoBase()
    const codigo = exportarSave(estado)
    expect(typeof codigo).toBe('string')
    expect(codigo.length).toBeGreaterThan(0)
  })

  it('código pode ser decodificado', () => {
    const estado = estadoBase({ votos: 42 })
    const codigo = exportarSave(estado)
    const decodificado = JSON.parse(atob(codigo))
    expect(decodificado.estado.votos).toBe(42)
    expect(decodificado.versao).toBe(1)
  })
})

describe('importarSave', () => {
  it('importa estado de código válido', () => {
    const estado = estadoBase({ votos: 777 })
    const codigo = exportarSave(estado)
    const importado = importarSave(codigo)
    expect(importado?.votos).toBe(777)
  })

  it('retorna null para código inválido', () => {
    const importado = importarSave('codigo_invalido')
    expect(importado).toBeNull()
  })

  it('retorna null para JSON válido mas sem campos esperados', () => {
    const importado = importarSave(btoa(JSON.stringify({ foo: 'bar' })))
    expect(importado).toBeNull()
  })
})

describe('getSaveFromStorage', () => {
  it('retorna save do localStorage', () => {
    const estado = estadoBase()
    salvarManual(estado)
    const save = getSaveFromStorage()
    expect(save).not.toBeNull()
    expect(save?.versao).toBe(1)
  })

  it('retorna null se não há save', () => {
    const save = getSaveFromStorage()
    expect(save).toBeNull()
  })
})