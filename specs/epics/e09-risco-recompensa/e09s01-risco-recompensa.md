# e09s01 — Sistema de Risco/Recompensa

## 1. Business Narrative
Como jogador, quero ter opções de alto risco e alta recompensa, para adicionar emoção e estratégia ao jogo.

## 2. Value
Mecânicas que adicionam profundidade e emoção ao jogo.

## 3. Story
**Como** jogador
**Quero** apostar recursos para chance de ganhos maiores
**Para** ter emoção e estratégia

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Risco/Recompensa

  Scenario: Trambique arriscado
    Given o jogador tem 1000 dinheiro
    When o jogador escolhe "Trambique Arriscado"
    Then há 50% chance de ganhar 5000 dinheiro
    And há 50% chance de perder 500 dinheiro

  Scenario: Investimento político
    Given o jogador tem 500 dinheiro
    When o jogador investe em "Investimento Político"
    Then há chance de receber multiplicador temporário

  Scenario: Aposta eleitoral
    Given o jogador tem 10000 votos
    When o jogador aposta em "Aposta Eleitoral"
    Then há chance pequena de subir de cargo instantaneamente
```

## 5. Main Flow
1. Jogador vê opções de risco/recompensa
2. Jogador escolhe uma opção
3. Sistema calcula resultado (chance)
4. Recompensa ou penalidade é aplicada

## 6. Alternative Flows
- Jogador pode desistir antes de confirmar
- Habilidades podem melhorar chances

## 7. Data Model
```typescript
interface Aposta {
  id: string
  nome: string
  descricao: string
  custo: number
  tipoCusto: 'votos' | 'dinheiro'
  resultadoPositivo: {
    chance: number
    recompensa: number
    tipoRecompensa: 'votos' | 'dinheiro' | 'multiplicador' | 'cargo'
  }
  resultadoNegativo: {
    chance: number
    penalidade: number
    tipoPenalidade: 'votos' | 'dinheiro'
  }
}
```

## 8. API
- `realizarAposta(id: string): ResultadoAposta`
- `getApostasDisponiveis(): Aposta[]`

## 9. UI
- Lista de apostas com custo, chance e recompensa
- Animação de resultado (positivo/negativo)
- Histórico de apostas

## 10. Error Handling
- Validação de recursos insuficientes

## 11. Security
- N/A

## 12. Performance
- N/A

## 13. Testing
- Teste unitário para lógica de apostas
- Teste de componente para UI de apostas

## 14. Deployment
- N/A

## 15. Dependencies
- e03 (prestige)

## 16. Open Questions
- Chances e recompensas exatas (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- N/A

## 19. Risks
- Equilíbrio das apostas

## 20. Notes
- Apostas: Trambique Arriscado, Investimento Político, Aposta Eleitoral