// Sistema de Prestige — e03
import type { GameState, CargoType } from '../types'
import { CARGOS_CONFIG, CARGOS_ORDEM } from './config'

export function getCargoConfig(cargo: CargoType) {
  return CARGOS_CONFIG[cargo]
}

export function getProximoCargo(cargo: CargoType): CargoType | null {
  const idx = CARGOS_ORDEM.indexOf(cargo)
  if (idx < 0 || idx >= CARGOS_ORDEM.length - 1) return null
  return CARGOS_ORDEM[idx + 1]
}

export function podeSubirDeCargo(estado: GameState): boolean {
  const proximo = getProximoCargo(estado.cargoAtual)
  if (!proximo) return false
  const config = getCargoConfig(estado.cargoAtual)
  return estado.votos >= config.limiteVotos
}

export function subirDeCargo(estado: GameState): GameState {
  const proximo = getProximoCargo(estado.cargoAtual)
  if (!proximo) return estado
  const novoConfig = getCargoConfig(proximo)
  return {
    ...estado,
    votos: 0,
    dinheiro: 0,
    cargoAtual: proximo,
    multiplicadorCargo: novoConfig.multiplicador,
    // mantém: upgrades, geradores, habilidades, multiplicadorClique
  }
}

export function getMultiplicadorClique(estado: GameState): number {
  return estado.multiplicadorCargo * estado.multiplicadorClique
}