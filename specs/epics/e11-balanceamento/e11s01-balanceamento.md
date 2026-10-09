# e11s01 — Balanceamento Geral

## 1. Business Narrative
Como jogador, quero um jogo equilibrado que mantenha interesse a longo prazo, para não ficar fácil demais ou difícil demais.

## 2. Value
Jogo equilibrado que mantém engajamento a longo prazo.

## 3. Story
**Como** jogador
**Quero** um jogo equilibrado
**Para** ter desafio constante e progressão satisfatória

## 4. Acceptance Criteria
```gherkin
Feature: Balanceamento Geral

  Scenario: Progressão de tempo
    Given o jogador joga por 1 hora
    Then o jogador deve ter progredido significativamente
    And o jogo não deve ficar fácil demais

  Scenario: Endgame
    Given o jogador atinge o cargo de Imperador
    Then o jogo deve oferecer desafios contínuos
    And números devem ser exponenciais

  Scenario: Equilíbrio de moedas
    Given o jogador joga normalmente
    Then votos e dinheiro devem ser equilibrados
    And um não deve dominar completamente o outro
```

## 5. Main Flow
1. Ajustar fórmulas de progressão
2. Testar tempo de jogo para cada cargo
3. Equilibrar geradores e upgrades
4. Ajustar eventos e trambiques
5. Testar endgame com números exponenciais

## 6. Alternative Flows
- Pode precisar de múltiplos rounds de balanceamento

## 7. Data Model
- N/A (apenas ajustes de números)

## 8. API
- N/A

## 9. UI
- N/A

## 10. Error Handling
- N/A

## 11. Security
- N/A

## 12. Performance
- N/A

## 13. Testing
- Testes de balanceamento com simulações

## 14. Deployment
- N/A

## 15. Dependencies
- Todos os outros epics

## 16. Open Questions
- Valores exatos para cada mecânica

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- N/A

## 19. Risks
- Pode ser iterativo

## 20. Notes
- Foco em manter o jogo interessante a longo prazo
- Números exponenciais para endgame
- Equilíbrio entre votos e dinheiro