// Sistema de Eventos — e07
import type { GameState } from '../types'
import { EVENTOS_NEGATIVOS, EVENTOS_POSITIVOS } from './config'

export function verificarEvento(chance: number): { id: string; nome: string; tipo: string; valor: number; duracao: number } | null {
  let chanceRestante = chance
  const todosEventos = [...EVENTOS_NEGATIVOS, ...EVENTOS_POSITIVOS]
  for (const evento of todosEventos) {
    if (chanceRestante <= evento.chance) {
      return evento
    }
    chanceRestante -= evento.chance
  }
  return null
}

export function aplicarEvento(
  estadoOriginal: GameState,
  evento: { id: string; nome: string; tipo: string; valor: number; duracao: number }
): GameState {
  const estado = { ...estadoOriginal }

  switch (evento.tipo) {
    case 'reduz_votos':
      estado.votos = Math.floor(estado.votos * (1 - evento.valor))
      if (evento.duracao > 0) {
        estado.eventosAtivos = [
          ...estado.eventosAtivos,
          {
            id: evento.id,
            nome: evento.nome,
            tipo: 'reduz_votos' as const,
            multiplicador: evento.valor,
            duracaoRestante: evento.duracao,
          },
        ]
      }
      break
    case 'reduz_dinheiro':
      estado.dinheiro = Math.floor(estado.dinheiro * (1 - evento.valor))
      break
    case 'aumenta_votos':
      estado.eventosAtivos = [
        ...estado.eventosAtivos,
        {
          id: evento.id,
          nome: evento.nome,
          tipo: 'aumenta_votos' as const,
          multiplicador: evento.valor,
          duracaoRestante: evento.duracao,
        },
      ]
      break
    case 'aumenta_dinheiro':
      estado.eventosAtivos = [
        ...estado.eventosAtivos,
        {
          id: evento.id,
          nome: evento.nome,
          tipo: 'aumenta_dinheiro' as const,
          multiplicador: evento.valor,
          duracaoRestante: evento.duracao,
        },
      ]
      break
    case 'remove_penalidades':
      estado.eventosAtivos = estado.eventosAtivos.filter(
        (e) => e.tipo !== 'reduz_votos' && e.tipo !== 'reduz_dinheiro'
      )
      break
  }

  return estado
}

export function tickEventos(estado: GameState): GameState {
  const eventosAtualizados = estado.eventosAtivos
    .map((evento) => ({
      ...evento,
      duracaoRestante: evento.duracaoRestante - 1,
    }))
    .filter((evento) => evento.duracaoRestante > 0)

  return { ...estado, eventosAtivos: eventosAtualizados }
}

export function getEventosAtivos(estado: GameState) {
  return estado.eventosAtivos
}