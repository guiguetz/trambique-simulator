// Sistema de Save/Load — e10
import type { GameState, SaveData } from '../types'
import { SAVE_VERSAO } from './config'

const SAVE_KEY = 'trambique_save'

export function salvarManual(estado: GameState): void {
  const saveData: SaveData = {
    versao: SAVE_VERSAO,
    timestamp: Date.now(),
    estado,
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
}

export function carregar(): GameState | null {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    const saveData: SaveData = JSON.parse(raw)
    if (!saveData || !saveData.estado) return null
    return saveData.estado
  } catch {
    return null
  }
}

export function exportarSave(estado: GameState): string {
  const saveData: SaveData = {
    versao: SAVE_VERSAO,
    timestamp: Date.now(),
    estado,
  }
  return btoa(JSON.stringify(saveData))
}

export function importarSave(codigo: string): GameState | null {
  try {
    const json = atob(codigo)
    const saveData: SaveData = JSON.parse(json)
    if (!saveData || !saveData.estado || typeof saveData.estado.votos !== 'number') {
      return null
    }
    return saveData.estado
  } catch {
    return null
  }
}

export function getSaveFromStorage(): SaveData | null {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    const saveData: SaveData = JSON.parse(raw)
    if (!saveData || !saveData.estado) return null
    return saveData
  } catch {
    return null
  }
}