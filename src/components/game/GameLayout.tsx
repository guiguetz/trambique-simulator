// Componente principal do jogo
import { useGameState } from '../../hooks/useGameState'
import { formatarNumero, formatarTempo, CARGOS_NOMES } from '../../utils/formatar'
import type { GameState } from '../../types'

export function GameLayout() {
  const game = useGameState()
  const { estado, mensagem, clique, limparMensagem } = game

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-yellow-500/30 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">🏛️ Trambique Simulator</h1>
            <p className="text-sm text-green-300">
              Cargo: <span className="font-bold text-yellow-300">{CARGOS_NOMES[estado.cargoAtual]}</span>
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-mono text-blue-300">🗳️ {formatarNumero(estado.votos)}</div>
              <div className="text-xs text-blue-400">Votos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-yellow-300">💰 {formatarNumero(estado.dinheiro)}</div>
              <div className="text-xs text-yellow-400">Dinheiro</div>
            </div>
          </div>
        </div>
      </header>

      {/* Mensagem de evento */}
      {mensagem && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-bold animate-bounce">
          {mensagem}
          <button onClick={limparMensagem} className="ml-4 text-black/50 hover:text-black">✕</button>
        </div>
      )}

      {/* Main */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar esquerda — Geradores */}
        <div className="space-y-4">
          <GeradoresPanel game={game} />
        </div>

        {/* Centro — Botão de clique */}
        <div className="flex flex-col items-center justify-center">
          <CliqueButton clique={clique} estado={estado} />
          {game.podeSubir && (
            <button
              onClick={game.subirCargo}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all animate-pulse"
            >
              ⬆️ Subir de Cargo!
            </button>
          )}
        </div>

        {/* Sidebar direita — Upgrades, Trambiques */}
        <div className="space-y-4">
          <UpgradesPanel game={game} />
          <TrambiquesPanel game={game} />
        </div>
      </main>

      {/* Footer — Ações secundárias */}
      <footer className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <HabilidadesPanel game={game} />
        <ApostasPanel game={game} />
        <SavePanel game={game} />
      </footer>
    </div>
  )
}

function CliqueButton({ clique }: { clique: () => void; estado: GameState }) {
  return (
    <button
      onClick={clique}
      className="w-48 h-48 rounded-full bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 active:scale-95 transition-all shadow-2xl shadow-green-500/50 flex items-center justify-center text-6xl border-4 border-green-300/50"
    >
      🗳️
    </button>
  )
}

function GeradoresPanel({ game }: { game: ReturnType<typeof useGameState> }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-green-500/30 p-4">
      <h2 className="text-lg font-bold text-green-400 mb-3">🏭 Geradores</h2>
      <div className="space-y-2">
        {game.geradoresDisponiveis.map((id) => {
          const quantidade = game.estado.geradores[id] || 0
          const custo = game.getCustoGerador(id)
          const podeComprar = game.estado.dinheiro >= custo
          return (
            <button
              key={id}
              onClick={() => game.comprarGerador(id)}
              disabled={!podeComprar}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                podeComprar
                  ? 'bg-green-800/50 hover:bg-green-700/50 border border-green-500/30'
                  : 'bg-gray-800/50 border border-gray-600/30 opacity-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{id.replace(/_/g, ' ')}</span>
                <span className="text-yellow-300">x{quantidade}</span>
              </div>
              <div className="text-sm text-gray-400">
                Custo: 💰 {formatarNumero(custo)}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function UpgradesPanel({ game }: { game: ReturnType<typeof useGameState> }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-yellow-500/30 p-4">
      <h2 className="text-lg font-bold text-yellow-400 mb-3">⬆️ Upgrades</h2>
      <div className="space-y-2">
        {game.upgradesDisponiveis.map((id) => {
          const nivel = game.estado.upgrades[id] || 0
          const custo = game.getCustoUpgrade(id)
          const podeComprar = game.estado.dinheiro >= custo
          return (
            <button
              key={id}
              onClick={() => game.comprarUpgrade(id)}
              disabled={!podeComprar}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                podeComprar
                  ? 'bg-yellow-800/50 hover:bg-yellow-700/50 border border-yellow-500/30'
                  : 'bg-gray-800/50 border border-gray-600/30 opacity-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{id.replace(/_/g, ' ')}</span>
                <span className="text-yellow-300">Lv.{nivel}</span>
              </div>
              <div className="text-sm text-gray-400">
                Custo: 💰 {formatarNumero(custo)}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TrambiquesPanel({ game }: { game: ReturnType<typeof useGameState> }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-red-500/30 p-4">
      <h2 className="text-lg font-bold text-red-400 mb-3">🔧 Trambiques</h2>
      <div className="space-y-2">
        {game.trambiquesDisponiveis.map((id) => {
          const cooldown = game.estado.trambiques[id]
          const emCooldown = cooldown && cooldown > 0
          return (
            <button
              key={id}
              onClick={() => game.ativarTrambique(id)}
              disabled={!!emCooldown}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                !emCooldown
                  ? 'bg-red-800/50 hover:bg-red-700/50 border border-red-500/30'
                  : 'bg-gray-800/50 border border-gray-600/30 opacity-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{id.replace(/_/g, ' ')}</span>
                {emCooldown && <span className="text-red-400">{formatarTempo(cooldown)}</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HabilidadesPanel({ game }: { game: ReturnType<typeof useGameState> }) {
  const ramos = ['politico', 'financeiro', 'trambique', 'resiliencia'] as const
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4">
      <h2 className="text-lg font-bold text-purple-400 mb-3">🧠 Habilidades</h2>
      <div className="grid grid-cols-2 gap-2">
        {ramos.map((ramo) => (
          <button
            key={ramo}
            onClick={() => game.investirHabilidade(ramo)}
            className="p-3 rounded-lg bg-purple-800/50 hover:bg-purple-700/50 border border-purple-500/30 transition-all"
          >
            <div className="font-bold capitalize">{ramo}</div>
            <div className="text-sm text-purple-300">Nv.{game.estado.habilidades[ramo]}</div>
          </button>
        ))}
      </div>
      {game.habilidadesDesbloqueadas.length > 0 && (
        <div className="mt-3 text-sm text-purple-300">
          Desbloqueadas: {game.habilidadesDesbloqueadas.join(', ')}
        </div>
      )}
    </div>
  )
}

function ApostasPanel({ game }: { game: ReturnType<typeof useGameState> }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-orange-500/30 p-4">
      <h2 className="text-lg font-bold text-orange-400 mb-3">🎲 Apostas</h2>
      <div className="space-y-2">
        {game.apostasDisponiveis.map((aposta) => (
          <button
            key={aposta.id}
            onClick={() => game.apostar(aposta.id)}
            className="w-full p-3 rounded-lg bg-orange-800/50 hover:bg-orange-700/50 border border-orange-500/30 text-left transition-all"
          >
            <div className="font-bold">{aposta.nome}</div>
            <div className="text-sm text-orange-300">{aposta.descricao}</div>
            <div className="text-xs text-gray-400 mt-1">
              Custo: {aposta.tipoCusto === 'dinheiro' ? '💰' : '🗳️'} {formatarNumero(aposta.custo)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function SavePanel({ game }: { game: ReturnType<typeof useGameState> }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-500/30 p-4">
      <h2 className="text-lg font-bold text-gray-400 mb-3">💾 Save/Load</h2>
      <div className="space-y-2">
        <button
          onClick={game.salvar}
          className="w-full p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/30 transition-all"
        >
          💾 Salvar
        </button>
        <button
          onClick={game.exportar}
          className="w-full p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/30 transition-all"
        >
          📋 Exportar
        </button>
        <button
          onClick={() => {
            const codigo = prompt('Cole o código de save:')
            if (codigo) game.importar(codigo)
          }}
          className="w-full p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/30 transition-all"
        >
          📥 Importar
        </button>
      </div>
    </div>
  )
}