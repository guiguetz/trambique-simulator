// Tipos principais do jogo Trambique Simulator

export type CargoType =
  | 'vereador'
  | 'deputado_estadual'
  | 'governador'
  | 'deputado_federal'
  | 'senador'
  | 'presidente'
  | 'imperador'

export interface CargoConfig {
  nome: string
  limiteVotos: number
  multiplicador: number
  desbloqueios: string[]
}

export interface GameState {
  votos: number
  dinheiro: number
  cargoAtual: CargoType
  multiplicador: number
  taxaVotosParaDinheiro: number
  taxaDinheiroParaVotos: number
  upgradesPermanentes: Upgrade[]
  geradores: Gerador[]
  trambiques: Trambique[]
  eventosAtivos: Evento[]
  habilidades: ArvoreHabilidades
  pontosHabilidade: number
}

export interface Upgrade {
  id: string
  nome: string
  descricao: string
  custo: number
  efeito: {
    tipo: 'clique_votos' | 'clique_dinheiro' | 'clique_multiplicador'
    valor: number
  }
  nivel: number
  maxNivel: number
  desbloqueadoEm: CargoType
}

export interface Gerador {
  id: string
  nome: string
  producao: number
  custo: number
  quantidade: number
  nivel: number
  desbloqueadoEm: CargoType
  produzVotos: boolean
  produzDinheiro: boolean
}

export interface Trambique {
  id: string
  nome: string
  descricao: string
  efeito: {
    tipo: 'dinheiro_instantaneo' | 'votos_instantaneo' | 'bonus_temporario'
    valor: number
    duracao?: number
  }
  cooldown: number
  cooldownRestante: number
  desbloqueadoEm: CargoType
}

export interface Evento {
  id: string
  nome: string
  descricao: string
  tipo: 'negativo' | 'positivo'
  efeito: {
    tipo: 'reduz_votos' | 'reduz_dinheiro' | 'aumenta_votos' | 'aumenta_dinheiro' | 'remove_penalidades'
    valor: number
    duracao: number
  }
  chance: number
}

export interface ArvoreHabilidades {
  politico: number
  financeiro: number
  trambique: number
  resiliencia: number
}

export interface Habilidade {
  id: string
  nome: string
  descricao: string
  ramo: 'politico' | 'financeiro' | 'trambique' | 'resiliencia'
  custo: number
  efeito: {
    tipo: string
    valor: number
  }
  preRequisito?: string
}

export interface Aposta {
  id: string
  nome: string
  descricao: string
  custo: number
  tipoCusto: 'votos' | 'dinheiro'
  resultadoPositivo: {
    chance: number
    recompensa: number
    tipoRecompensa: 'votos' | 'dinheiro' | 'multiplicador' | 'cargo'
  }
  resultadoNegativo: {
    chance: number
    penalidade: number
    tipoPenalidade: 'votos' | 'dinheiro'
  }
}

export interface SaveData {
  versao: number
  timestamp: number
  estado: GameState
}