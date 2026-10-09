// Sistema de Upgrades — e05
import type { GameState } from '../types'
import { UPGRADES_CONFIG, CARGOS_ORDEM } from './config'

export function getCustoUpgrade(id: string, nivel: number): number {
  const config = UPGRADES_CONFIG[id as keyof typeof UPGRADES_CONFIG]
  if (!config) return Infinity
  return Math.floor(config.custoBase * Math.pow(2, nivel))
}

export function comprarUpgrade(estado: GameState, id: string): GameState {
  const config = UPGRADES_CONFIG[id as keyof typeof UPGRADES_CONFIG]
  if (!config) return estado
  const nivel = estado.upgrades[id] || 0
  if (nivel >= config.maxNivel) return estado
  const custo = getCustoUpgrade(id, nivel)
  if (estado.dinheiro < custo) return estado

  let votosExtras = estado.votosExtras
  let dinheiroExtra = estado.dinheiroExtra
  let multiplicadorClique = estado.multiplicadorClique

  if (config.efeito.tipo === 'clique_votos') votosExtras += config.efeito.valor
  if (config.efeito.tipo === 'clique_dinheiro') dinheiroExtra += config.efeito.valor
  if (config.efeito.tipo === 'clique_multiplicador') multiplicadorClique *= config.efeito.valor

  return {
    ...estado,
    dinheiro: estado.dinheiro - custo,
    upgrades: {
      ...estado.upgrades,
      [id]: nivel + 1,
    },
    votosExtras,
    dinheiroExtra,
    multiplicadorClique,
  }
}

export function getEfeitoClique(estado: GameState) {
  return {
    votosExtras: estado.votosExtras,
    dinheiroExtra: estado.dinheiroExtra,
    multiplicadorClique: estado.multiplicadorClique,
  }
}

export function getUpgradesDisponiveis(estado: GameState): string[] {
  const atualIdx = CARGOS_ORDEM.indexOf(estado.cargoAtual)
  return Object.entries(UPGRADES_CONFIG)
    .filter(([, config]) => CARGOS_ORDEM.indexOf(config.desbloqueadoEm) <= atualIdx)
    .map(([id]) => id)
}