# e06s01 — Sistema de Trambiques

## 1. Business Narrative
Como jogador, quero ativar trambiques (ações especiais com cooldown), para ganhar bônus temporários de votos e dinheiro.

## 2. Value
Mecânica ativa que dá sensação de controle e estratégia.

## 3. Story
**Como** jogador
**Quero** ativar trambiques com cooldown
**Para** ganhar bônus temporários

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Trambiques

  Scenario: Ativar trambique
    Given o trambique "Desviar Verba" está disponível
    When o jogador clica no botão do trambique
    Then o jogador ganha X dinheiro instantaneamente
    And o cooldown de 30 segundos começa

  Scenario: Cooldown
    Given o jogador ativou "Desviar Verba"
    When o cooldown não terminou
    Then o botão do trambique fica desabilitado
    And o tempo restante é exibido

  Scenario: Trambique com bônus temporário
    Given o trambique "Comprar Jornalista" está disponível
    When o jogador ativa o trambique
    Then o jogador ganha bônus de votos por 60 segundos
```

## 5. Main Flow
1. Jogador vê lista de trambiques disponíveis
2. Jogador ativa trambique (se não estiver em cooldown)
3. Efeito é aplicado (instantâneo ou temporário)
4. Cooldown começa a contar

## 6. Alternative Flows
- Trambiques podem ser desbloqueados por cargo
- Cooldown pode ser reduzido por upgrades

## 7. Data Model
```typescript
interface Trambique {
  id: string
  nome: string
  descricao: string
  efeito: {
    tipo: 'dinheiro_instantaneo' | 'votos_instantaneo' | 'bonus_temporario'
    valor: number
    duracao?: number  // para bônus temporários
  }
  cooldown: number  // em segundos
  cooldownRestante: number
  desbloqueadoEm: CargoType
}
```

## 8. API
- `ativarTrambique(id: string): boolean`
- `getTrambiquesDisponiveis(): Trambique[]`
- `getCooldown(id: string): number`

## 9. UI
- Lista de trambiques com nome, descrição e cooldown
- Botão de ativação (desabilitado durante cooldown)
- Barra de cooldown visual
- Notificação de efeito ativado

## 10. Error Handling
- Validação de cooldown não terminado
- Validação de trambique desbloqueado

## 11. Security
- N/A

## 12. Performance
- Cooldown deve ser preciso

## 13. Testing
- Teste unitário para lógica de cooldown
- Teste de componente para UI de trambiques

## 14. Deployment
- N/A

## 15. Dependencies
- e01 (core gameplay), e03 (prestige)

## 16. Open Questions
- Efeitos e cooldowns exatos (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Árvore de habilidades que afeta trambiques (e08)

## 19. Risks
- Equilíbrio dos trambiques

## 20. Notes
- Trambiques: Desviar Verba, Forjar Documento, Comprar Jornalista, Fraudar Licitação, Delação Premiada, Impeachment Falso, Golpe de Estado