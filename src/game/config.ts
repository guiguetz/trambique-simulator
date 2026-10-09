// Configuração central de balanceamento do jogo
import type { CargoType, CargoConfig } from '../types'

export const CLIQUE_BASE_VOTOS = 1
export const CLIQUE_BASE_DINHEIRO = 1

export const TAXA_VOTOS_PARA_DINHEIRO = 0.1
export const TAXA_DINHEIRO_PARA_VOTOS = 0.1

export const CARGOS_CONFIG: Record<CargoType, CargoConfig> = {
  vereador: {
    nome: 'Vereador do Rio',
    limiteVotos: 1000,
    multiplicador: 1,
    desbloqueios: ['cabos_eleitorais', 'propina', 'desviar_verba', 'forjar_documento'],
  },
  deputado_estadual: {
    nome: 'Deputado Estadual',
    limiteVotos: 10000,
    multiplicador: 2,
    desbloqueios: ['caixa_2', 'comprar_jornalista'],
  },
  governador: {
    nome: 'Governador',
    limiteVotos: 100000,
    multiplicador: 4,
    desbloqueios: ['rede_aliados', 'fraudar_licitacao', 'eventos'],
  },
  deputado_federal: {
    nome: 'Deputado Federal',
    limiteVotos: 1000000,
    multiplicador: 8,
    desbloqueios: ['fundo_partidario', 'delacao_premiada', 'habilidades'],
  },
  senador: {
    nome: 'Senador',
    limiteVotos: 10000000,
    multiplicador: 16,
    desbloqueios: ['lobby', 'impeachment_falso', 'risco_recompensa'],
  },
  presidente: {
    nome: 'Presidente',
    limiteVotos: 100000000,
    multiplicador: 32,
    desbloqueios: ['maquina_politica', 'golpe_estado', 'mega_trambiques'],
  },
  imperador: {
    nome: 'Imperador Supremo',
    limiteVotos: 1000000000,
    multiplicador: 64,
    desbloqueios: ['endgame'],
  },
}

export const CARGOS_ORDEM: CargoType[] = [
  'vereador',
  'deputado_estadual',
  'governador',
  'deputado_federal',
  'senador',
  'presidente',
  'imperador',
]

export const GERADORES_CONFIG = {
  cabos_eleitorais: { nome: 'Cabos Eleitorais', producao: 1, custoBase: 10, produzVotos: true, produzDinheiro: false, desbloqueadoEm: 'vereador' as CargoType },
  propina: { nome: 'Esquema de Propina', producao: 1, custoBase: 10, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'vereador' as CargoType },
  caixa_2: { nome: 'Caixa 2', producao: 5, custoBase: 100, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'deputado_estadual' as CargoType },
  rede_aliados: { nome: 'Rede de Aliados', producao: 10, custoBase: 500, produzVotos: true, produzDinheiro: false, desbloqueadoEm: 'governador' as CargoType },
  fundo_partidario: { nome: 'Fundo Partidário', producao: 50, custoBase: 5000, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'deputado_federal' as CargoType },
  lobby: { nome: 'Lobby', producao: 100, custoBase: 50000, produzVotos: true, produzDinheiro: true, desbloqueadoEm: 'senador' as CargoType },
  maquina_politica: { nome: 'Máquina Política', producao: 1000, custoBase: 500000, produzVotos: true, produzDinheiro: true, desbloqueadoEm: 'presidente' as CargoType },
}

export const UPGRADES_CONFIG = {
  melhorar_discurso: { nome: 'Melhorar Discurso', descricao: 'Cada clique gera +1 voto', custoBase: 50, efeito: { tipo: 'clique_votos' as const, valor: 1 }, maxNivel: 100, desbloqueadoEm: 'vereador' as CargoType },
  tempo_tv: { nome: 'Tempo de TV', descricao: 'Cada clique gera +1 dinheiro', custoBase: 50, efeito: { tipo: 'clique_dinheiro' as const, valor: 1 }, maxNivel: 100, desbloqueadoEm: 'vereador' as CargoType },
  marketing_politico: { nome: 'Marketing Político', descricao: 'Multiplica cliques por 1.5x', custoBase: 500, efeito: { tipo: 'clique_multiplicador' as const, valor: 1.5 }, maxNivel: 10, desbloqueadoEm: 'deputado_estadual' as CargoType },
  fake_news: { nome: 'Fake News', descricao: '10% chance de clique crítico (x10)', custoBase: 5000, efeito: { tipo: 'clique_multiplicador' as const, valor: 10 }, maxNivel: 5, desbloqueadoEm: 'governador' as CargoType },
}

export const TRAMBIQUES_CONFIG = {
  desviar_verba: { nome: 'Desviar Verba', descricao: 'Gera dinheiro instantâneo', efeito: { tipo: 'dinheiro_instantaneo' as const, valor: 50 }, cooldown: 30, desbloqueadoEm: 'vereador' as CargoType },
  forjar_documento: { nome: 'Forjar Documento', descricao: 'Gera votos instantâneo', efeito: { tipo: 'votos_instantaneo' as const, valor: 50 }, cooldown: 45, desbloqueadoEm: 'vereador' as CargoType },
  comprar_jornalista: { nome: 'Comprar Jornalista', descricao: 'Bônus de votos por 60s', efeito: { tipo: 'bonus_temporario' as const, valor: 2, duracao: 60 }, cooldown: 120, desbloqueadoEm: 'deputado_estadual' as CargoType },
  fraudar_licitacao: { nome: 'Fraudar Licitação', descricao: 'Gera dinheiro massivo', efeito: { tipo: 'dinheiro_instantaneo' as const, valor: 500 }, cooldown: 180, desbloqueadoEm: 'governador' as CargoType },
  delacao_premiada: { nome: 'Delação Premiada (reverso)', descricao: 'Remove escândalo ativo', efeito: { tipo: 'bonus_temporario' as const, valor: 1, duracao: 0 }, cooldown: 60, desbloqueadoEm: 'deputado_federal' as CargoType },
  impeachment_falso: { nome: 'Impeachment Falso', descricao: 'Bônus massivo de votos', efeito: { tipo: 'votos_instantaneo' as const, valor: 5000 }, cooldown: 300, desbloqueadoEm: 'senador' as CargoType },
  golpe_estado: { nome: 'Golpe de Estado', descricao: 'Bônus absurdo', efeito: { tipo: 'votos_instantaneo' as const, valor: 100000 }, cooldown: 600, desbloqueadoEm: 'presidente' as CargoType },
}

export const EVENTOS_NEGATIVOS = [
  { id: 'cpi', nome: 'CPI', descricao: 'Reduz geração de votos em 50%', tipo: 'reduz_votos' as const, valor: 0.5, duracao: 30, chance: 0.3 },
  { id: 'delacao', nome: 'Delação Premiada', descricao: 'Perde 20% do dinheiro', tipo: 'reduz_dinheiro' as const, valor: 0.2, duracao: 0, chance: 0.2 },
  { id: 'escandalo', nome: 'Escândalo na Mídia', descricao: 'Reduz tudo em 30%', tipo: 'reduz_votos' as const, valor: 0.3, duracao: 20, chance: 0.15 },
]

export const EVENTOS_POSITIVOS = [
  { id: 'festa', nome: 'Festa no Orçamento', descricao: 'Bônus de dinheiro por 30s', tipo: 'aumenta_dinheiro' as const, valor: 2, duracao: 30, chance: 0.2 },
  { id: 'discurso', nome: 'Discurso Viral', descricao: 'Bônus de votos por 30s', tipo: 'aumenta_votos' as const, valor: 2, duracao: 30, chance: 0.2 },
  { id: 'anistia', nome: 'Anistia', descricao: 'Remove penalidades', tipo: 'remove_penalidades' as const, valor: 1, duracao: 0, chance: 0.1 },
]

export const HABILIDADES_CONFIG = {
  politico_1: { nome: 'Discurso Melhorado', descricao: '+10% votos por clique', ramo: 'politico' as const, custo: 1, efeito: { tipo: 'clique_votos_pct', valor: 0.1 } },
  politico_2: { nome: 'Base Eleitoral', descricao: '+20% votos passivos', ramo: 'politico' as const, custo: 2, efeito: { tipo: 'votos_passivos_pct', valor: 0.2 } },
  politico_3: { nome: 'Votos Passivos', descricao: 'Gera votos sem clicar', ramo: 'politico' as const, custo: 5, efeito: { tipo: 'votos_passivos', valor: 1 }, preRequisito: 'politico_2' },
  financeiro_1: { nome: 'Contabilidade Criativa', descricao: '+10% dinheiro por clique', ramo: 'financeiro' as const, custo: 1, efeito: { tipo: 'clique_dinheiro_pct', valor: 0.1 } },
  financeiro_2: { nome: 'Paraíso Fiscal', descricao: '+20% dinheiro passivo', ramo: 'financeiro' as const, custo: 2, efeito: { tipo: 'dinheiro_passivo_pct', valor: 0.2 } },
  financeiro_3: { nome: 'Dinheiro Passivo', descricao: 'Gera dinheiro sem clicar', ramo: 'financeiro' as const, custo: 5, efeito: { tipo: 'dinheiro_passivo', valor: 1 }, preRequisito: 'financeiro_2' },
  trambique_1: { nome: 'Contatos Certos', descricao: '-10% cooldown', ramo: 'trambique' as const, custo: 1, efeito: { tipo: 'cooldown_reducao', valor: 0.1 } },
  trambique_2: { nome: 'Impunidade', descricao: '-20% cooldown', ramo: 'trambique' as const, custo: 2, efeito: { tipo: 'cooldown_reducao', valor: 0.2 }, preRequisito: 'trambique_1' },
  trambique_3: { nome: 'Intocável', descricao: '-50% cooldown', ramo: 'trambique' as const, custo: 5, efeito: { tipo: 'cooldown_reducao', valor: 0.5 }, preRequisito: 'trambique_2' },
  resiliencia_1: { nome: 'Imunidade Parlamentar', descricao: '-20% duração de eventos negativos', ramo: 'resiliencia' as const, custo: 1, efeito: { tipo: 'evento_negativo_duracao', valor: 0.2 } },
  resiliencia_2: { nome: 'Controle de Danos', descricao: '-50% impacto negativo', ramo: 'resiliencia' as const, custo: 3, efeito: { tipo: 'evento_negativo_impacto', valor: 0.5 }, preRequisito: 'resiliencia_1' },
}

export const APOSTAS_CONFIG = [
  {
    id: 'trambique_arriscado',
    nome: 'Trambique Arriscado',
    descricao: '50% chance de ganhar 5x, 50% de perder 50%',
    custo: 100,
    tipoCusto: 'dinheiro' as const,
    resultadoPositivo: { chance: 0.5, recompensa: 500, tipoRecompensa: 'dinheiro' as const },
    resultadoNegativo: { chance: 0.5, penalidade: 50, tipoPenalidade: 'dinheiro' as const },
  },
  {
    id: 'investimento_politico',
    nome: 'Investimento Político',
    descricao: '30% chance de multiplicador temporário',
    custo: 500,
    tipoCusto: 'dinheiro' as const,
    resultadoPositivo: { chance: 0.3, recompensa: 3, tipoRecompensa: 'multiplicador' as const },
    resultadoNegativo: { chance: 0.7, penalidade: 200, tipoPenalidade: 'dinheiro' as const },
  },
  {
    id: 'aposta_eleitoral',
    nome: 'Aposta Eleitoral',
    descricao: '10% chance de cargo instantâneo',
    custo: 10000,
    tipoCusto: 'votos' as const,
    resultadoPositivo: { chance: 0.1, recompensa: 1, tipoRecompensa: 'cargo' as const },
    resultadoNegativo: { chance: 0.9, penalidade: 5000, tipoPenalidade: 'votos' as const },
  },
]

export const SAVE_VERSAO = 1
export const AUTO_SAVE_INTERVALO = 30000 // 30 segundos
export const TICK_INTERVALO = 1000 // 1 segundo