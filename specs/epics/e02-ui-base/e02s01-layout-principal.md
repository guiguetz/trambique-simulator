# e02s01 — Layout Principal do Jogo

## 1. Business Narrative
Como jogador, quero uma interface clara e organizada, para poder jogar confortavelmente.

## 2. Value
Interface intuitiva que mostra todas as informações importantes.

## 3. Story
**Como** jogador
**Quero** ver votos, dinheiro, geradores e botões de ação
**Para** interagir com o jogo

## 4. Acceptance Criteria
```gherkin
Feature: Layout Principal

  Scenario: Exibição de contadores
    Given o jogo está rodando
    When o jogador abre o jogo
    Then os contadores de votos e dinheiro são visíveis no topo

  Scenario: Botão de clique
    Given o jogo está rodando
    When o jogador abre o jogo
    Then o botão principal de clique está centralizado

  Scenario: Painéis laterais
    Given o jogo está rodando
    When o jogador abre o jogo
    Then há painéis para geradores, upgrades e trambiques
```

## 5. Main Flow
1. Layout com header (contadores), main (botão de clique), sidebars (geradores, upgrades)
2. Responsivo para diferentes tamanhos de tela
3. Tema visual com cores de política brasileira

## 6. Alternative Flows
- Layout mobile: sidebars viram tabs ou accordion

## 7. Data Model
- N/A (apenas UI)

## 8. API
- N/A

## 9. UI
- Header: Votos, Dinheiro, Cargo atual
- Main: Botão de clique grande
- Sidebar esquerda: Geradores
- Sidebar direita: Upgrades, Trambiques
- Footer: Eventos aleatórios

## 10. Error Handling
- N/A

## 11. Security
- N/A

## 12. Performance
- Renderização eficiente com React.memo onde necessário

## 13. Testing
- Testes de componente para layout

## 14. Deployment
- N/A

## 15. Dependencies
- React, Tailwind CSS

## 16. Open Questions
- Design exato das cores e fontes

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Animações complexas
- Temas customizáveis

## 19. Risks
- Nenhum significativo

## 20. Notes
- Usar Tailwind CSS para styling
- Cores: verde (#009739), amarelo (#FEDD00), azul (#002776)