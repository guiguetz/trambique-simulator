# e01s01 — Sistema de Cliques Básico

## 1. Business Narrative
Como jogador, quero clicar em um botão para gerar votos e dinheiro, para começar a jogar.

## 2. Value
Permite o jogador interagir com o jogo e gerar recursos iniciais.

## 3. Story
**Como** jogador
**Quero** clicar no botão principal
**Para** gerar votos e dinheiro

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Cliques Básico

  Scenario: Clique gera votos
    Given o jogo está rodando
    When o jogador clica no botão principal
    Then a quantidade de votos aumenta em 1
    And a quantidade de dinheiro aumenta em 1

  Scenario: Clique múltiplo
    Given o jogo está rodando
    When o jogador clica 10 vezes no botão principal
    Then a quantidade de votos é 10
    And a quantidade de dinheiro é 10

  Scenario: Exibição de contadores
    Given o jogo está rodando
    When o jogador clica no botão principal
    Then os contadores de votos e dinheiro são atualizados na tela
```

## 5. Main Flow
1. Jogador vê o botão principal na tela
2. Jogador clica no botão
3. Votos e dinheiro são incrementados em 1
4. Contadores são atualizados na UI

## 6. Alternative Flows
- N/A para este story

## 7. Data Model
```typescript
interface GameState {
  votos: number
  dinheiro: number
}
```

## 8. API
- `clique()`: Incrementa votos e dinheiro em 1

## 9. UI
- Botão grande centralizado
- Contadores de votos e dinheiro visíveis

## 10. Error Handling
- N/A (operação local)

## 11. Security
- N/A (jogo client-side)

## 12. Performance
- Cliques devem ser responsivos (< 16ms)

## 13. Testing
- Teste unitário para função clique()
- Teste de componente para UI

## 14. Deployment
- N/A (parte do build principal)

## 15. Dependencies
- React, TypeScript, Tailwind CSS

## 16. Open Questions
- Nenhum

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Multiplicadores de clique (e05)
- Trambiques (e06)

## 19. Risks
- Nenhum significativo

## 20. Notes
- Tom satírico deve ser mantido nos textos da UI