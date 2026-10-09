// Cálculo de clique — e01s01
export interface CliqueParams {
  multiplicador: number
  votosExtras: number
  dinheiroExtra: number
  multiplicadorClique: number
}

export interface CliqueResultado {
  votos: number
  dinheiro: number
}

const CLIQUE_BASE = 1

/**
 * Fórmula: (base + extras) * multiplicadorCargo * multiplicadorClique
 * Arredondado para inteiro.
 */
export function calcularClique(params: CliqueParams): CliqueResultado {
  const { multiplicador, votosExtras, dinheiroExtra, multiplicadorClique } = params
  const votos = Math.floor((CLIQUE_BASE + votosExtras) * multiplicador * multiplicadorClique)
  const dinheiro = Math.floor((CLIQUE_BASE + dinheiroExtra) * multiplicador * multiplicadorClique)
  return { votos, dinheiro }
}