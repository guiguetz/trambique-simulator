// Simulação de balanceamento — teste offline com novos valores
const TAXA = 0.03
const GERADOR_GROWTH = 1.18

function custoGerador(custoBase: number, qtd: number): number {
  return Math.floor(custoBase * Math.pow(GERADOR_GROWTH, qtd))
}

// Simula progressão até cada cargo
function simularProgressao() {
  console.log('=== Simulação de Progressão (taxa=0.03, growth=1.18) ===\n')

  const cargos = [
    { nome: 'Vereador → Deputado Estadual', limite: 1_000, mult: 1 },
    { nome: 'Deputado → Governador', limite: 10_000, mult: 2 },
    { nome: 'Governador → Deputado Federal', limite: 250_000, mult: 4 },
    { nome: 'Deputado Federal → Senador', limite: 5_000_000, mult: 8 },
  ]

  let votos = 0
  let dinheiro = 0
  const geradores = { cabos: 0, propina: 0, caixa2: 0, rede: 0 }
  let tempo = 0
  let cargoIndex = 0

  while (cargoIndex < cargos.length && tempo < 36000) { // max 10h
    // Cliques (1/s base, com multiplicador do cargo)
    const cliqueVotos = 1 * cargos[cargoIndex].mult
    const cliqueDinheiro = 1 * cargos[cargoIndex].mult
    votos += cliqueVotos
    dinheiro += cliqueDinheiro

    // Comprar geradores quando possível
    const custoCabos = custoGerador(15, geradores.cabos)
    if (dinheiro >= custoCabos && cargoIndex >= 0) {
      dinheiro -= custoCabos
      geradores.cabos++
    }
    const custoPropina = custoGerador(15, geradores.propina)
    if (dinheiro >= custoPropina && cargoIndex >= 0) {
      dinheiro -= custoPropina
      geradores.propina++
    }
    if (cargoIndex >= 1) {
      const custoCaixa = custoGerador(150, geradores.caixa2)
      if (dinheiro >= custoCaixa) {
        dinheiro -= custoCaixa
        geradores.caixa2++
      }
    }
    if (cargoIndex >= 2) {
      const custoRede = custoGerador(800, geradores.rede)
      if (dinheiro >= custoRede) {
        dinheiro -= custoRede
        geradores.rede++
      }
    }

    // Produção dos geradores (com multiplicador de cargo)
    const prodVotos = (geradores.cabos * 1 + geradores.rede * 12) * cargos[cargoIndex].mult
    const prodDinheiro = (geradores.propina * 1 + geradores.caixa2 * 5) * cargos[cargoIndex].mult
    votos += prodVotos
    dinheiro += prodDinheiro

    // Ciclo vicioso (conversão cruzada — NÃO consome)
    const dinheiroDeVotos = Math.floor(votos * TAXA)
    const votosDeDinheiro = Math.floor(dinheiro * TAXA)
    votos += votosDeDinheiro
    dinheiro += dinheiroDeVotos

    tempo++

    // Verificar se atingiu o limite do cargo atual
    if (votos >= cargos[cargoIndex].limite) {
      const minutos = Math.floor(tempo / 60)
      const segundos = tempo % 60
      console.log(`${cargos[cargoIndex].nome}:`)
      console.log(`  Tempo: ${minutos}m ${segundos}s`)
      console.log(`  Votos: ${votos.toLocaleString()}, Dinheiro: ${dinheiro.toLocaleString()}`)
      console.log(`  Geradores: cabos=${geradores.cabos}, propina=${geradores.propina}, caixa2=${geradores.caixa2}, rede=${geradores.rede}\n`)
      cargoIndex++
    }
  }

  if (cargoIndex < cargos.length) {
    console.log(`⚠️ Não atingiu ${cargos[cargoIndex].nome} em 10h`)
  }
}

// Simula com cliques rápidos (5/s)
function simularCliquesRapidos() {
  console.log('=== Simulação com 5 cliques/s (jogador ativo) ===\n')

  let votos = 0
  let dinheiro = 0
  const geradores = { cabos: 0, propina: 0 }
  let tempo = 0

  while (votos < 1_000 && tempo < 600) {
    // 5 cliques/s
    votos += 5
    dinheiro += 5

    // Comprar geradores
    const custoCabos = custoGerador(15, geradores.cabos)
    if (dinheiro >= custoCabos) {
      dinheiro -= custoCabos
      geradores.cabos++
    }
    const custoPropina = custoGerador(15, geradores.propina)
    if (dinheiro >= custoPropina) {
      dinheiro -= custoPropina
      geradores.propina++
    }

    // Produção
    votos += geradores.cabos * 1
    dinheiro += geradores.propina * 1

    // Ciclo vicioso
    votos += Math.floor(dinheiro * TAXA)
    dinheiro += Math.floor(votos * TAXA)

    tempo++
  }

  const minutos = Math.floor(tempo / 60)
  const segundos = tempo % 60
  console.log(`Vereador → Deputado (1000 votos): ${minutos}m ${segundos}s`)
  console.log(`Geradores: cabos=${geradores.cabos}, propina=${geradores.propina}`)
}

// Simula impacto dos upgrades
function simularUpgrades() {
  console.log('\n=== Impacto dos Upgrades ===')
  console.log('melhorar_discurso Lv.1: +2 votos/clique (custo 50)')
  console.log('tempo_tv Lv.1: +2 dinheiro/clique (custo 50)')
  console.log('marketing_politico Lv.1: 1.5x multiplicador (custo 1000)')
  console.log('fake_news Lv.1: 10% chance x10 (custo 10000)')
  console.log('\nCom multiplicador de cargo x2 (Deputado):')
  console.log('  Base: 1 voto/clique')
  console.log('  + melhorar_discurso Lv.5: +10 votos/clique')
  console.log('  + marketing_politico Lv.1: 1.5x')
  console.log('  Total: (1 + 10) * 2 * 1.5 = 33 votos/clique')
}

simularProgressao()
simularCliquesRapidos()
simularUpgrades()