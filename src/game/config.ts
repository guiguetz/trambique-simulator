// Configuração central de balanceamento do jogo
import type { CargoType, CargoConfig } from '../types'

export const CLIQUE_BASE_VOTOS = 1
export const CLIQUE_BASE_DINHEIRO = 1

// Ciclo vicioso: taxa de conversão cruzada por tick (1s)
// 0.03 = 3% — significativo mas não exponencial
export const TAXA_VOTOS_PARA_DINHEIRO = 0.03
export const TAXA_DINHEIRO_PARA_VOTOS = 0.03

export const CARGOS_CONFIG: Record<CargoType, CargoConfig> = {
  vereador: {
    nome: 'Vereador do Rio',
    limiteVotos: 1_000,
    multiplicador: 1,
    desbloqueios: ['cabos_eleitorais', 'propina', 'desviar_verba', 'forjar_documento'],
  },
  deputado_estadual: {
    nome: 'Deputado Estadual',
    limiteVotos: 10_000,
    multiplicador: 2,
    desbloqueios: ['caixa_2', 'comprar_jornalista'],
  },
  governador: {
    nome: 'Governador',
    limiteVotos: 250_000,
    multiplicador: 4,
    desbloqueios: ['rede_aliados', 'fraudar_licitacao', 'eventos'],
  },
  deputado_federal: {
    nome: 'Deputado Federal',
    limiteVotos: 5_000_000,
    multiplicador: 8,
    desbloqueios: ['fundo_partidario', 'delacao_premiada', 'habilidades'],
  },
  senador: {
    nome: 'Senador',
    limiteVotos: 100_000_000,
    multiplicador: 16,
    desbloqueios: ['lobby', 'impeachment_falso', 'risco_recompensa'],
  },
  presidente: {
    nome: 'Presidente',
    limiteVotos: 5_000_000_000,
    multiplicador: 32,
    desbloqueios: ['maquina_politica', 'golpe_estado', 'mega_trambiques'],
  },
  imperador: {
    nome: 'Imperador Supremo',
    limiteVotos: 100_000_000_000,
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

// Geradores — custo cresce 1.18^quantidade (slower mass-buy)
export const GERADORES_CONFIG = {
  cabos_eleitorais: { nome: 'Cabos Eleitorais', producao: 1, custoBase: 15, produzVotos: true, produzDinheiro: false, desbloqueadoEm: 'vereador' as CargoType },
  propina: { nome: 'Esquema de Propina', producao: 1, custoBase: 15, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'vereador' as CargoType },
  caixa_2: { nome: 'Caixa 2', producao: 5, custoBase: 150, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'deputado_estadual' as CargoType },
  rede_aliados: { nome: 'Rede de Aliados', producao: 12, custoBase: 800, produzVotos: true, produzDinheiro: false, desbloqueadoEm: 'governador' as CargoType },
  fundo_partidario: { nome: 'Fundo Partidário', producao: 50, custoBase: 8_000, produzVotos: false, produzDinheiro: true, desbloqueadoEm: 'deputado_federal' as CargoType },
  lobby: { nome: 'Lobby', producao: 200, custoBase: 100_000, produzVotos: true, produzDinheiro: true, desbloqueadoEm: 'senador' as CargoType },
  maquina_politica: { nome: 'Máquina Política', producao: 2000, custoBase: 2_000_000, produzVotos: true, produzDinheiro: true, desbloqueadoEm: 'presidente' as CargoType },
}

export const GERADOR_GROWTH = 1.18 // custo multiplicado por isso a cada compra

// Upgrades — custo dobra por nível
export const UPGRADES_CONFIG = {
  melhorar_discurso: { nome: 'Melhorar Discurso', descricao: 'Cada clique gera +2 votos', custoBase: 50, efeito: { tipo: 'clique_votos' as const, valor: 2 }, maxNivel: 50, desbloqueadoEm: 'vereador' as CargoType },
  tempo_tv: { nome: 'Tempo de TV', descricao: 'Cada clique gera +2 dinheiro', custoBase: 50, efeito: { tipo: 'clique_dinheiro' as const, valor: 2 }, maxNivel: 50, desbloqueadoEm: 'vereador' as CargoType },
  marketing_politico: { nome: 'Marketing Político', descricao: 'Multiplica cliques por 1.5x', custoBase: 1_000, efeito: { tipo: 'clique_multiplicador' as const, valor: 1.5 }, maxNivel: 10, desbloqueadoEm: 'deputado_estadual' as CargoType },
  fake_news: { nome: 'Fake News', descricao: '10% chance de clique crítico (x10)', custoBase: 10_000, efeito: { tipo: 'clique_multiplicador' as const, valor: 10 }, maxNivel: 5, desbloqueadoEm: 'governador' as CargoType },
}

// Trambiques — valores escalados com multiplicador de cargo
export const TRAMBIQUES_CONFIG = {
  desviar_verba: { nome: 'Desviar Verba', descricao: 'Gera dinheiro instantâneo', efeito: { tipo: 'dinheiro_instantaneo' as const, valor: 100 }, cooldown: 20, desbloqueadoEm: 'vereador' as CargoType },
  forjar_documento: { nome: 'Forjar Documento', descricao: 'Gera votos instantâneo', efeito: { tipo: 'votos_instantaneo' as const, valor: 100 }, cooldown: 30, desbloqueadoEm: 'vereador' as CargoType },
  comprar_jornalista: { nome: 'Comprar Jornalista', descricao: 'Bônus de votos por 60s', efeito: { tipo: 'bonus_temporario' as const, valor: 3, duracao: 60 }, cooldown: 120, desbloqueadoEm: 'deputado_estadual' as CargoType },
  fraudar_licitacao: { nome: 'Fraudar Licitação', descricao: 'Gera dinheiro massivo', efeito: { tipo: 'dinheiro_instantaneo' as const, valor: 2_000 }, cooldown: 120, desbloqueadoEm: 'governador' as CargoType },
  delacao_premiada: { nome: 'Delação Premiada (reverso)', descricao: 'Remove escândalo ativo', efeito: { tipo: 'bonus_temporario' as const, valor: 1, duracao: 0 }, cooldown: 45, desbloqueadoEm: 'deputado_federal' as CargoType },
  impeachment_falso: { nome: 'Impeachment Falso', descricao: 'Bônus massivo de votos', efeito: { tipo: 'votos_instantaneo' as const, valor: 50_000 }, cooldown: 300, desbloqueadoEm: 'senador' as CargoType },
  golpe_estado: { nome: 'Golpe de Estado', descricao: 'Bônus absurdo', efeito: { tipo: 'votos_instantaneo' as const, valor: 5_000_000 }, cooldown: 600, desbloqueadoEm: 'presidente' as CargoType },
}

// Eventos — chance por tick de verificação (a cada 5s)
export const EVENTOS_NEGATIVOS = [
  { id: 'cpi', nome: 'CPI', descricao: 'Reduz geração de votos em 30%', tipo: 'reduz_votos' as const, valor: 0.3, duracao: 20, chance: 0.15 },
  { id: 'delacao', nome: 'Delação Premiada', descricao: 'Perde 15% do dinheiro', tipo: 'reduz_dinheiro' as const, valor: 0.15, duracao: 0, chance: 0.1 },
  { id: 'escandalo', nome: 'Escândalo na Mídia', descricao: 'Reduz votos em 20%', tipo: 'reduz_votos' as const, valor: 0.2, duracao: 15, chance: 0.08 },
]

export const EVENTOS_POSITIVOS = [
  { id: 'festa', nome: 'Festa no Orçamento', descricao: 'Bônus de dinheiro por 30s', tipo: 'aumenta_dinheiro' as const, valor: 2, duracao: 30, chance: 0.12 },
  { id: 'discurso', nome: 'Discurso Viral', descricao: 'Bônus de votos por 30s', tipo: 'aumenta_votos' as const, valor: 2, duracao: 30, chance: 0.12 },
  { id: 'anistia', nome: 'Anistia', descricao: 'Remove penalidades', tipo: 'remove_penalidades' as const, valor: 1, duracao: 0, chance: 0.06 },
]

export const EVENTO_CHECK_INTERVALO = 5 // segundos entre checagens de evento

// Habilidades — desbloqueadas a cada 5 pontos investidos
export const HABILIDADES_CONFIG = {
  politico_1: { nome: 'Discurso Melhorado', descricao: '+15% votos por clique', ramo: 'politico' as const, custo: 1, efeito: { tipo: 'clique_votos_pct', valor: 0.15 } },
  politico_2: { nome: 'Base Eleitoral', descricao: '+25% votos passivos', ramo: 'politico' as const, custo: 2, efeito: { tipo: 'votos_passivos_pct', valor: 0.25 } },
  politico_3: { nome: 'Votos Passivos', descricao: 'Gera votos sem clicar', ramo: 'politico' as const, custo: 4, efeito: { tipo: 'votos_passivos', valor: 2 }, preRequisito: 'politico_2' },
  financeiro_1: { nome: 'Contabilidade Criativa', descricao: '+15% dinheiro por clique', ramo: 'financeiro' as const, custo: 1, efeito: { tipo: 'clique_dinheiro_pct', valor: 0.15 } },
  financeiro_2: { nome: 'Paraíso Fiscal', descricao: '+25% dinheiro passivo', ramo: 'financeiro' as const, custo: 2, efeito: { tipo: 'dinheiro_passivo_pct', valor: 0.25 } },
  financeiro_3: { nome: 'Dinheiro Passivo', descricao: 'Gera dinheiro sem clicar', ramo: 'financeiro' as const, custo: 4, efeito: { tipo: 'dinheiro_passivo', valor: 2 }, preRequisito: 'financeiro_2' },
  trambique_1: { nome: 'Contatos Certos', descricao: '-15% cooldown', ramo: 'trambique' as const, custo: 1, efeito: { tipo: 'cooldown_reducao', valor: 0.15 } },
  trambique_2: { nome: 'Impunidade', descricao: '-25% cooldown', ramo: 'trambique' as const, custo: 2, efeito: { tipo: 'cooldown_reducao', valor: 0.25 }, preRequisito: 'trambique_1' },
  trambique_3: { nome: 'Intocável', descricao: '-50% cooldown', ramo: 'trambique' as const, custo: 5, efeito: { tipo: 'cooldown_reducao', valor: 0.5 }, preRequisito: 'trambique_2' },
  resiliencia_1: { nome: 'Imunidade Parlamentar', descricao: '-25% duração de eventos negativos', ramo: 'resiliencia' as const, custo: 1, efeito: { tipo: 'evento_negativo_duracao', valor: 0.25 } },
  resiliencia_2: { nome: 'Controle de Danos', descricao: '-50% impacto negativo', ramo: 'resiliencia' as const, custo: 3, efeito: { tipo: 'evento_negativo_impacto', valor: 0.5 }, preRequisito: 'resiliencia_1' },
}

// Apostas — risco/recompensa equilibrado
export const APOSTAS_CONFIG = [
  {
    id: 'trambique_arriscado',
    nome: 'Trambique Arriscado',
    descricao: '50% chance de ganhar 3x, 50% de perder 40%',
    custo: 100,
    tipoCusto: 'dinheiro' as const,
    resultadoPositivo: { chance: 0.5, recompensa: 300, tipoRecompensa: 'dinheiro' as const },
    resultadoNegativo: { chance: 0.5, penalidade: 40, tipoPenalidade: 'dinheiro' as const },
  },
  {
    id: 'investimento_politico',
    nome: 'Investimento Político',
    descricao: '35% chance de multiplicador temporário 2x',
    custo: 500,
    tipoCusto: 'dinheiro' as const,
    resultadoPositivo: { chance: 0.35, recompensa: 2, tipoRecompensa: 'multiplicador' as const },
    resultadoNegativo: { chance: 0.65, penalidade: 200, tipoPenalidade: 'dinheiro' as const },
  },
  {
    id: 'aposta_eleitoral',
    nome: 'Aposta Eleitoral',
    descricao: '15% chance de cargo instantâneo',
    custo: 15_000,
    tipoCusto: 'votos' as const,
    resultadoPositivo: { chance: 0.15, recompensa: 1, tipoRecompensa: 'cargo' as const },
    resultadoNegativo: { chance: 0.85, penalidade: 5_000, tipoPenalidade: 'votos' as const },
  },
]

export const SAVE_VERSAO = 2 // bump ao mudar balance
export const AUTO_SAVE_INTERVALO = 30_000 // 30 segundos
export const TICK_INTERVALO = 1_000 // 1 segundo