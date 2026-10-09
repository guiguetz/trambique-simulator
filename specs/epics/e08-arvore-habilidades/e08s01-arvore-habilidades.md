# e08s01 — Sistema de Árvore de Habilidades

## 1. Business Narrative
Como jogador, quero investir pontos de habilidade em uma árvore, para desbloquear melhorias permanentes e estratégicas.

## 2. Value
Progressão estratégica que permite customização do estilo de jogo.

## 3. Story
**Como** jogador
**Quero** investir pontos em habilidades
**Para** desbloquear melhorias permanentes

## 4. Acceptance Criteria
```gherkin
Feature: Árvore de Habilidades

  Scenario: Investir ponto de habilidade
    Given o jogador tem 1 ponto de habilidade
    When o jogador investe no ramo "Político"
    Then a geração de votos é aumentada em 10%

  Scenario: Desbloquear habilidade
    Given o jogador investiu 5 pontos no ramo "Político"
    When a habilidade "Votos Passivos" é desbloqueada
    Then o jogador gera votos mesmo quando não está clicando

  Scenario: Reset de habilidades
    Given o jogador quer mudar de estratégia
    When o jogador usa "Reset de Habilidades"
    Then todos os pontos são devolvidos
    And as habilidades são desbloqueadas novamente
```

## 5. Main Flow
1. Jogador ganha pontos de habilidade (por cargo ou conquistas)
2. Jogador investe pontos em um dos 4 ramos
3. Cada ponto melhora um aspecto do jogo
4. Habilidades especiais são desbloqueadas a cada 5 pontos

## 6. Alternative Flows
- Reset de habilidades pode ser comprado com dinheiro
- Alguns ramos têm pré-requisitos

## 7. Data Model
```typescript
interface ArvoreHabilidades {
  politico: number
  financeiro: number
  trambique: number
  resiliencia: number
}

interface Habilidade {
  id: string
  nome: string
  descricao: string
  ramo: 'politico' | 'financeiro' | 'trambique' | 'resiliencia'
  custo: number
  efeito: {
    tipo: string
    valor: number
  }
  preRequisito?: string
}
```

## 8. API
- `investirPonto(ramo: string): boolean`
- `getHabilidadesDesbloqueadas(): Habilidade[]`
- `resetarHabilidades(): void`

## 9. UI
- Árvore visual com 4 ramos
- Botões para investir pontos
- Indicador de pontos disponíveis
- Descrição das habilidades

## 10. Error Handling
- Validação de pontos insuficientes

## 11. Security
- N/A

## 12. Performance
- N/A

## 13. Testing
- Teste unitário para lógica de habilidades
- Teste de componente para árvore

## 14. Deployment
- N/A

## 15. Dependencies
- e03 (prestige)

## 16. Open Questions
- Efeitos exatos das habilidades (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- N/A

## 19. Risks
- Equilíbrio das habilidades

## 20. Notes
- Ramos: Político (votos), Financeiro (dinheiro), Trambique (cooldowns), Resiliência (eventos negativos)