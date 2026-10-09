# e01s02 — Ciclo Vicioso Votos-Dinheiro

## 1. Business Narrative
Como jogador, quero que votos gerem dinheiro e dinheiro gere votos, para criar um ciclo vicioso de progressão.

## 2. Value
Cria a mecânica central do jogo — o ciclo vicioso que mantém o jogador engajado.

## 3. Story
**Como** jogador
**Quero** que votos e dinheiro se convertam entre si
**Para** criar um ciclo de progressão contínua

## 4. Acceptance Criteria
```gherkin
Feature: Ciclo Vicioso Votos-Dinheiro

  Scenario: Votos geram dinheiro
    Given o jogador tem 100 votos
    When o ciclo de conversão é executado
    Then o jogador ganha X dinheiro (baseado em fórmula)

  Scenario: Dinheiro gera votos
    Given o jogador tem 100 dinheiro
    When o ciclo de conversão é executado
    Then o jogador ganha Y votos (baseado em fórmula)

  Scenario: Taxa de conversão
    Given o jogo está rodando
    When a cada segundo
    Then votos são convertidos em dinheiro
    And dinheiro é convertido em votos
```

## 5. Main Flow
1. A cada tick (1 segundo), votos são parcialmente convertidos em dinheiro
2. A cada tick, dinheiro é parcialmente convertido em votos
3. Fórmulas de conversão equilibram o jogo

## 6. Alternative Flows
- Conversão pode ser bloqueada por upgrades/events
- Taxa de conversão pode ser alterada por habilidades

## 7. Data Model
```typescript
interface GameState {
  votos: number
  dinheiro: number
  taxaVotosParaDinheiro: number  // ex: 0.1 = 10% por segundo
  taxaDinheiroParaVotos: number  // ex: 0.1 = 10% por segundo
}
```

## 8. API
- `converterVotosParaDinheiro(votos: number): number`
- `converterDinheiroParaVotos(dinheiro: number): number`
- `tick()`: Executa conversão a cada segundo

## 9. UI
- Indicadores de taxa de conversão
- Animações sutis mostrando fluxo de moedas

## 10. Error Handling
- Valores negativos não devem ocorrer (clamped para 0)

## 11. Security
- N/A

## 12. Performance
- Tick deve ser eficiente (< 1ms)

## 13. Testing
- Teste unitário para fórmulas de conversão
- Teste de integração para ciclo completo

## 14. Deployment
- N/A

## 15. Dependencies
- e01s01 (sistema de cliques básico)

## 16. Open Questions
- Fórmulas exatas de conversão (definir no balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Multiplicadores de conversão (e05)
- Habilidades que afetam conversão (e08)

## 19. Risks
- Equilíbrio do ciclo vicioso pode ser difícil

## 20. Notes
- Fórmulas iniciais: votos * 0.1 = dinheiro/s, dinheiro * 0.1 = votos/s