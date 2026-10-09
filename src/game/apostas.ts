// Sistema de Risco/Recompensa — e09
import type { GameState } from '../types'
import { APOSTAS_CONFIG } from './config'

export interface ResultadoAposta {
  novoEstado: GameState
  vitoria: boolean | null
  mensagem: string
}

export function realizarAposta(estado: GameState, id: string, random: number): ResultadoAposta {
  const aposta = APOSTAS_CONFIG.find((a) => a.id === id)
  if (!aposta) return { novoEstado: estado, vitoria: null, mensagem: 'Aposta não encontrada' }

  // Verifica se tem recursos suficientes
  if (aposta.tipoCusto === 'dinheiro' && estado.dinheiro < aposta.custo) {
    return { novoEstado: estado, vitoria: null, mensagem: 'Dinheiro insuficiente' }
  }
  if (aposta.tipoCusto === 'votos' && estado.votos < aposta.custo) {
    return { novoEstado: estado, vitoria: null, mensagem: 'Votos insuficientes' }
  }

  // Deduz custo
  const novoEstado = { ...estado }
  if (aposta.tipoCusto === 'dinheiro') {
    novoEstado.dinheiro -= aposta.custo
  } else {
    novoEstado.votos -= aposta.custo
  }

  // Determina resultado
  if (random < aposta.resultadoPositivo.chance) {
    // Vitória
    const recompensa = aposta.resultadoPositivo.recompensa
    const tipo = aposta.resultadoPositivo.tipoRecompensa as string
    if (tipo === 'dinheiro') {
      novoEstado.dinheiro += recompensa
    } else if (tipo === 'votos') {
      novoEstado.votos += recompensa
    } else if (tipo === 'multiplicador') {
      novoEstado.multiplicadorClique *= recompensa
    }
    return { novoEstado, vitoria: true, mensagem: `Vitória! +${recompensa} ${tipo}` }
  } else {
    // Derrota
    const penalidade = aposta.resultadoNegativo.penalidade
    const tipo = aposta.resultadoNegativo.tipoPenalidade as string
    if (tipo === 'dinheiro') {
      novoEstado.dinheiro = Math.max(0, novoEstado.dinheiro - penalidade)
    } else if (tipo === 'votos') {
      novoEstado.votos = Math.max(0, novoEstado.votos - penalidade)
    }
    return { novoEstado, vitoria: false, mensagem: `Derrota! -${penalidade} ${tipo}` }
  }
}

export function getApostasDisponiveis() {
  return APOSTAS_CONFIG
}