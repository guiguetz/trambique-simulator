# e05s01 — Sistema de Upgrades

## 1. Business Narrative
Como jogador, quero comprar upgrades permanentes (melhorar discurso, tempo de TV), para que cada clique gere mais votos e dinheiro.

## 2. Value
Progressão permanente que persiste entre resets de prestige.

## 3. Story
**Como** jogador
**Quero** comprar upgrades que melhoram cliques
**Para** gerar mais recursos por clique

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Upgrades

  Scenario: Comprar upgrade
    Given o jogador tem dinheiro suficiente
    When o jogador compra "Melhorar Discurso"
    Then cada clique gera 2 votos em vez de 1
    And o dinheiro é deduzido

  Scenario: Upgrade permanente
    Given o jogador comprou "Melhorar Discurso"
    When o jogador sobe de cargo (prestige)
    Then o upgrade é mantido
    And o efeito continua ativo

  Scenario: Múltiplos upgrades
    Given o jogador comprou "Melhorar Discurso" e "Tempo de TV"
    When o jogador clica
    Then gera votos extras + dinheiro extras
```

## 5. Main Flow
1. Jogador vê lista de upgrades disponíveis
2. Jogador compra upgrade com dinheiro
3. Upgrade aumenta geração por clique permanentemente
4. Efeito persiste entre resets de prestige

## 6. Alternative Flows
- Upgrades podem ter pré-requisitos (outros upgrades ou cargos)
- Upgrades podem ter níveis (comprar múltiplas vezes)

## 7. Data Model
```typescript
interface Upgrade {
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
```

## 8. API
- `comprarUpgrade(id: string): boolean`
- `getEfeitoClique(): {votos: number, dinheiro: number, multiplicador: number}`
- `getUpgradesDisponiveis(): Upgrade[]`

## 9. UI
- Lista de upgrades com nome, descrição, custo e efeito
- Botão de compra para cada upgrade
- Indicador de nível atual

## 10. Error Handling
- Validação de recursos insuficientes
- Validação de nível máximo

## 11. Security
- N/A

## 12. Performance
- N/A

## 13. Testing
- Teste unitário para cálculo de efeitos
- Teste de componente para lista de upgrades

## 14. Deployment
- N/A

## 15. Dependencies
- e01 (core gameplay), e03 (prestige)

## 16. Open Questions
- Custos e efeitos exatos (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Upgrades de gerador (e04)

## 19. Risks
- Equilíbrio dos upgrades

## 20. Notes
- Upgrades: Melhorar Discurso, Tempo de TV, Marketing Político, Fake News