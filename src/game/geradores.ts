// Sistema de Geradores — e04
import type { GameState, CargoType } from '../types'
import { GERADORES_CONFIG, CARGOS_ORDEM } from './config'

const CUSTO_MULTIPLICADOR = 1.15

export function getCustoGerador(id: string, quantidade: number): number {
  const config = GERADORES_CONFIG[id as keyof typeof GERADORES_CONFIG]
  if (!config) return Infinity
  return Math.floor(config.custoBase * Math.pow(CUSTO_MULTIPLICADOR, quantidade))
}

export function comprarGerador(estado: GameState, id: string): GameState {
  const config = GERADORES_CONFIG[id as keyof typeof GERADORES_CONFIG]
  if (!config) return estado
  const quantidade = estado.geradores[id] || 0
  const custo = getCustoGerador(id, quantidade)
  if (estado.dinheiro < custo) return estado
  return {
    ...estado,
    dinheiro: estado.dinheiro - custo,
    geradores: {
      ...estado.geradores,
      [id]: quantidade + 1,
    },
  }
}

export function getProducaoPorSegundo(estado: GameState): { votos: number; dinheiro: number } {
  let votos = 0
  let dinheiro = 0
  for (const [id, quantidade] of Object.entries(estado.geradores)) {
    const config = GERADORES_CONFIG[id as keyof typeof GERADORES_CONFIG]
    if (!config || quantidade <= 0) continue
    if (config.produzVotos) votos += config.producao * quantidade
    if (config.produzDinheiro) dinheiro += config.producao * quantidade
  }
  return { votos, dinheiro }
}

function cargoIndex(cargo: CargoType): number {
  return CARGOS_ORDEM.indexOf(cargo)
}

export function getGeradoresDisponiveis(estado: GameState): string[] {
  const atualIdx = cargoIndex(estado.cargoAtual)
  return Object.entries(GERADORES_CONFIG)
    .filter(([, config]) => cargoIndex(config.desbloqueadoEm) <= atualIdx)
    .map(([id]) => id)
}