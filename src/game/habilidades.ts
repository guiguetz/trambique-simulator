// Sistema de Árvore de Habilidades — e08
import type { GameState } from '../types'
import { HABILIDADES_CONFIG } from './config'

const RAMOS = ['politico', 'financeiro', 'trambique', 'resiliencia'] as const

export function investirPonto(estado: GameState, ramo: string): GameState {
  if (!RAMOS.includes(ramo as typeof RAMOS[number])) return estado

  const novasHabilidades = { ...estado.habilidades }
  novasHabilidades[ramo as keyof typeof novasHabilidades] += 1

  const novasDesbloqueadas = [...estado.habilidadesDesbloqueadas]
  let votosExtras = estado.votosExtras
  let dinheiroExtra = estado.dinheiroExtra

  // Desbloqueio a cada 5 pontos no ramo
  const pontos = novasHabilidades[ramo as keyof typeof novasHabilidades]
  const nivelDesbloqueio = Math.floor(pontos / 5)
  const habKey = `${ramo}_${nivelDesbloqueio}`

  if (
    nivelDesbloqueio > 0 &&
    !novasDesbloqueadas.includes(habKey) &&
    habKey in HABILIDADES_CONFIG
  ) {
    novasDesbloqueadas.push(habKey)
    const habConfig = HABILIDADES_CONFIG[habKey as keyof typeof HABILIDADES_CONFIG]
    if (habConfig.efeito.tipo === 'clique_votos_pct') {
      votosExtras += Math.floor(estado.votos * habConfig.efeito.valor)
    }
    if (habConfig.efeito.tipo === 'clique_dinheiro_pct') {
      dinheiroExtra += Math.floor(estado.dinheiro * habConfig.efeito.valor)
    }
  }

  return {
    ...estado,
    habilidades: novasHabilidades,
    habilidadesDesbloqueadas: novasDesbloqueadas,
    votosExtras,
    dinheiroExtra,
  }
}

export function getHabilidadesDesbloqueadas(estado: GameState): string[] {
  return estado.habilidadesDesbloqueadas
}

export function resetarHabilidades(estado: GameState): GameState {
  return {
    ...estado,
    habilidades: { politico: 0, financeiro: 0, trambique: 0, resiliencia: 0 },
    habilidadesDesbloqueadas: [],
  }
}

export function getRamosDisponiveis(): string[] {
  return [...RAMOS]
}