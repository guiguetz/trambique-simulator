// Conversão votos ↔ dinheiro — e01s02

export function converterVotosParaDinheiro(votos: number, taxa: number): number {
  return Math.floor(votos * taxa)
}

export function converterDinheiroParaVotos(dinheiro: number, taxa: number): number {
  return Math.floor(dinheiro * taxa)
}

export interface TickParams {
  votos: number
  dinheiro: number
  taxaVotosParaDinheiro: number
  taxaDinheiroParaVotos: number
  producaoVotos: number
  producaoDinheiro: number
}

export interface TickResultado {
  votos: number
  dinheiro: number
}

/**
 * Calcula um tick de 1 segundo do jogo.
 * Ciclo vicioso: votos geram dinheiro (propina), dinheiro gera votos (compra de votos).
 * A conversão NÃO consome a moeda de origem — ambos crescem.
 */
export function calcularTick(params: TickParams): TickResultado {
  const {
    votos,
    dinheiro,
    taxaVotosParaDinheiro,
    taxaDinheiroParaVotos,
    producaoVotos,
    producaoDinheiro,
  } = params

  // Conversão cruzada — geração, não consumo
  const dinheiroDeVotos = converterVotosParaDinheiro(votos, taxaVotosParaDinheiro)
  const votosDeDinheiro = converterDinheiroParaVotos(dinheiro, taxaDinheiroParaVotos)

  // Resultado: original + gerado pela conversão + produção de geradores
  const votosFinal = Math.max(0, votos + votosDeDinheiro + producaoVotos)
  const dinheiroFinal = Math.max(0, dinheiro + dinheiroDeVotos + producaoDinheiro)

  return { votos: votosFinal, dinheiro: dinheiroFinal }
}