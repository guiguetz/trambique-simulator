// Hook principal do jogo — integra toda a lógica
import { useState, useEffect, useRef, useCallback } from 'react'
import type { GameState } from '../types'
import { TICK_INTERVALO, AUTO_SAVE_INTERVALO, TAXA_VOTOS_PARA_DINHEIRO, TAXA_DINHEIRO_PARA_VOTOS } from '../game/config'
import { calcularClique } from '../game/clique'
import { calcularTick } from '../game/conversao'
import { podeSubirDeCargo, subirDeCargo, getMultiplicadorClique } from '../game/prestige'
import { comprarGerador, getProducaoPorSegundo, getGeradoresDisponiveis, getCustoGerador } from '../game/geradores'
import { comprarUpgrade, getUpgradesDisponiveis, getCustoUpgrade } from '../game/upgrades'
import { ativarTrambique, tickCooldowns, getTrambiquesDisponiveis } from '../game/trambiques'
import { verificarEvento, aplicarEvento, tickEventos } from '../game/eventos'
import { investirPonto, getHabilidadesDesbloqueadas } from '../game/habilidades'
import { realizarAposta, getApostasDisponiveis } from '../game/apostas'
import { salvarManual, carregar, exportarSave, importarSave } from '../game/save'

const ESTADO_INICIAL: GameState = {
  votos: 0,
  dinheiro: 0,
  cargoAtual: 'vereador',
  multiplicadorCargo: 1,
  taxaVotosParaDinheiro: TAXA_VOTOS_PARA_DINHEIRO,
  taxaDinheiroParaVotos: TAXA_DINHEIRO_PARA_VOTOS,
  votosExtras: 0,
  dinheiroExtra: 0,
  multiplicadorClique: 1,
  geradores: {},
  upgrades: {},
  trambiques: {},
  eventosAtivos: [],
  habilidades: { politico: 0, financeiro: 0, trambique: 0, resiliencia: 0 },
  habilidadesDesbloqueadas: [],
}

export function useGameState() {
  const [estado, setEstado] = useState<GameState>(() => {
    const salvo = carregar()
    return salvo || ESTADO_INICIAL
  })
  const [mensagem, setMensagem] = useState<string>('')
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Tick principal — a cada 1 segundo
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setEstado((prev) => {
        const producao = getProducaoPorSegundo(prev)
        const novoTick = calcularTick({
          votos: prev.votos,
          dinheiro: prev.dinheiro,
          taxaVotosParaDinheiro: prev.taxaVotosParaDinheiro,
          taxaDinheiroParaVotos: prev.taxaDinheiroParaVotos,
          producaoVotos: producao.votos,
          producaoDinheiro: producao.dinheiro,
        })
        let novo = { ...prev, votos: novoTick.votos, dinheiro: novoTick.dinheiro }
        novo = tickCooldowns(novo)
        novo = tickEventos(novo)
        // Verificar evento aleatório (2% por segundo)
        if (Math.random() < 0.02) {
          const evento = verificarEvento(Math.random())
          if (evento) {
            novo = aplicarEvento(novo, evento)
            setMensagem(`📢 ${evento.nome}: ${evento.tipo}`)
          }
        }
        return novo
      })
    }, TICK_INTERVALO)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [])

  // Auto-save
  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      salvarManual(estado)
    }, AUTO_SAVE_INTERVALO)
    return () => { if (autoSaveRef.current) clearInterval(autoSaveRef.current) }
  }, [estado])

  const clique = useCallback(() => {
    setEstado((prev) => {
      const mult = getMultiplicadorClique(prev)
      const resultado = calcularClique({
        multiplicador: mult,
        votosExtras: prev.votosExtras,
        dinheiroExtra: prev.dinheiroExtra,
        multiplicadorClique: 1,
      })
      return {
        ...prev,
        votos: prev.votos + resultado.votos,
        dinheiro: prev.dinheiro + resultado.dinheiro,
      }
    })
  }, [])

  const comprarGeradorAction = useCallback((id: string) => {
    setEstado((prev) => comprarGerador(prev, id))
  }, [])

  const comprarUpgradeAction = useCallback((id: string) => {
    setEstado((prev) => comprarUpgrade(prev, id))
  }, [])

  const ativarTrambiqueAction = useCallback((id: string) => {
    setEstado((prev) => {
      const novo = ativarTrambique(prev, id)
      if (novo !== prev) {
        setMensagem(`🔧 Trambique ativado!`)
      }
      return novo
    })
  }, [])

  const subirCargo = useCallback(() => {
    setEstado((prev) => {
      if (!podeSubirDeCargo(prev)) return prev
      setMensagem(`⬆️ Cargo elevado!`)
      return subirDeCargo(prev)
    })
  }, [])

  const investirHabilidade = useCallback((ramo: string) => {
    setEstado((prev) => investirPonto(prev, ramo))
  }, [])

  const apostar = useCallback((id: string) => {
    setEstado((prev) => {
      const resultado = realizarAposta(prev, id, Math.random())
      if (resultado.vitoria !== null) {
        setMensagem(resultado.mensagem)
      }
      return resultado.novoEstado
    })
  }, [])

  const salvar = useCallback(() => {
    salvarManual(estado)
    setMensagem('💾 Jogo salvo!')
  }, [estado])

  const exportar = useCallback(() => {
    const codigo = exportarSave(estado)
    navigator.clipboard.writeText(codigo).catch(() => {})
    setMensagem('📋 Código copiado!')
    return codigo
  }, [estado])

  const importar = useCallback((codigo: string) => {
    const novo = importarSave(codigo)
    if (novo) {
      setEstado(novo)
      setMensagem('✅ Jogo importado!')
    } else {
      setMensagem('❌ Código inválido!')
    }
  }, [])

  const limparMensagem = useCallback(() => {
    setMensagem('')
  }, [])

  return {
    estado,
    mensagem,
    clique,
    comprarGerador: comprarGeradorAction,
    comprarUpgrade: comprarUpgradeAction,
    ativarTrambique: ativarTrambiqueAction,
    subirCargo,
    investirHabilidade,
    apostar,
    salvar,
    exportar,
    importar,
    limparMensagem,
    podeSubir: podeSubirDeCargo(estado),
    geradoresDisponiveis: getGeradoresDisponiveis(estado),
    upgradesDisponiveis: getUpgradesDisponiveis(estado),
    trambiquesDisponiveis: getTrambiquesDisponiveis(estado),
    habilidadesDesbloqueadas: getHabilidadesDesbloqueadas(estado),
    apostasDisponiveis: getApostasDisponiveis(),
    getCustoGerador: (id: string) => getCustoGerador(id, estado.geradores[id] || 0),
    getCustoUpgrade: (id: string) => getCustoUpgrade(id, estado.upgrades[id] || 0),
  }
}