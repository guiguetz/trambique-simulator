# e04s01 — Sistema de Geradores

## 1. Business Narrative
Como jogador, quero comprar geradores automáticos (cabos eleitorais, esquemas de propina), para produzir votos e dinheiro passivamente.

## 2. Value
Automação que permite progressão sem clique constante.

## 3. Story
**Como** jogador
**Quero** comprar geradores que produzem moedas por segundo
**Para** progredir mesmo quando não estou clicando

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Geradores

  Scenario: Comprar gerador
    Given o jogador tem dinheiro suficiente
    When o jogador compra um cabo eleitoral
    Then o gerador começa a produzir votos por segundo
    And o dinheiro é deduzido

  Scenario: Produção automática
    Given o jogador tem 10 cabos eleitorais
    When 1 segundo se passa
    Then o jogador ganha 10 votos automaticamente

  Scenario: Upgrade de gerador
    Given o jogador tem um cabo eleitoral nível 1
    When o jogador compra o upgrade para nível 2
    Then o gerador produz o dobro de votos por segundo
```

## 5. Main Flow
1. Jogador vê lista de geradores disponíveis
2. Jogador compra gerador com dinheiro/votos
3. Gerador começa a produzir moedas por segundo
4. Produção é multiplicada pelo nível do gerador

## 6. Alternative Flows
- Geradores podem ser desbloqueados por cargo
- Alguns geradores produzem votos, outros dinheiro

## 7. Data Model
```typescript
interface Gerador {
  id: string
  nome: string
  producao: number  // por segundo
  custo: number
  quantidade: number
  nivel: number
  desbloqueadoEm: CargoType
  produzVotos: boolean
  produzDinheiro: boolean
}
```

## 8. API
- `comprarGerador(id: string): boolean`
- `getProducaoPorSegundo(): {votos: number, dinheiro: number}`
- `getGeradoresDisponiveis(): Gerador[]`

## 9. UI
- Lista de geradores com quantidade, produção e custo
- Botão de compra para cada gerador
- Indicador de produção total por segundo

## 10. Error Handling
- Validação de recursos insuficientes

## 11. Security
- N/A

## 12. Performance
- Cálculo de produção eficiente

## 13. Testing
- Teste unitário para cálculo de produção
- Teste de componente para lista de geradores

## 14. Deployment
- N/A

## 15. Dependencies
- e01 (core gameplay), e03 (prestige)

## 16. Open Questions
- Custos e produções exatos (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Upgrades de gerador (e05)

## 19. Risks
- Equilíbrio entre geradores

## 20. Notes
- Geradores: Cabo Eleitoral, Esquema de Propina, Caixa 2, Rede de Aliados, Fundo Partidário, Lobby, Máquina Política