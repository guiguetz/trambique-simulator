// Sistema de Trambiques — e06
import type { GameState, CargoType } from '../types'
import { TRAMBIQUES_CONFIG, CARGOS_ORDEM } from './config'

function cargoIndex(cargo: CargoType): number {
  return CARGOS_ORDEM.indexOf(cargo)
}

export function ativarTrambique(estado: GameState, id: string): GameState {
  const config = TRAMBIQUES_CONFIG[id as keyof typeof TRAMBIQUES_CONFIG]
  if (!config) return estado
  const cooldownAtual = estado.trambiques[id]
  if (cooldownAtual && cooldownAtual > 0) return estado

  const novoEstado = { ...estado }

  if (config.efeito.tipo === 'dinheiro_instantaneo') {
    novoEstado.dinheiro += config.efeito.valor
  } else if (config.efeito.tipo === 'votos_instantaneo') {
    novoEstado.votos += config.efeito.valor
  } else if (config.efeito.tipo === 'bonus_temporario') {
    novoEstado.eventosAtivos = [
      ...novoEstado.eventosAtivos,
      {
        id: `trambique_${id}`,
        nome: config.nome,
        tipo: 'aumenta_votos' as const,
        multiplicador: config.efeito.valor,
        duracaoRestante: config.efeito.duracao || 0,
      },
    ]
  }

  novoEstado.trambiques = {
    ...novoEstado.trambiques,
    [id]: config.cooldown,
  }

  return novoEstado
}

export function tickCooldowns(estado: GameState): GameState {
  const novosTrambiques: Record<string, number> = {}
  for (const [id, cooldown] of Object.entries(estado.trambiques)) {
    const novoCooldown = cooldown - 1
    if (novoCooldown > 0) {
      novosTrambiques[id] = novoCooldown
    }
  }
  return { ...estado, trambiques: novosTrambiques }
}

export function getTrambiquesDisponiveis(estado: GameState): string[] {
  const atualIdx = cargoIndex(estado.cargoAtual)
  return Object.entries(TRAMBIQUES_CONFIG)
    .filter(([, config]) => cargoIndex(config.desbloqueadoEm) <= atualIdx)
    .map(([id]) => id)
}

export function getTrambiqueEfeito(estado: GameState, id: string) {
  const config = TRAMBIQUES_CONFIG[id as keyof typeof TRAMBIQUES_CONFIG]
  if (!config) return null
  const atualIdx = cargoIndex(estado.cargoAtual)
  if (cargoIndex(config.desbloqueadoEm) > atualIdx) return null
  return config.efeito
}