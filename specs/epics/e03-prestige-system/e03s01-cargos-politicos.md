# e03s01 — Sistema de Cargos Políticos

## 1. Business Narrative
Como jogador, quero subir de cargo político (vereador, deputado, governador, etc.), para desbloquear novas mecânicas e ver minha progressão.

## 2. Value
Sistema de prestígio que dá sensação de progressão a longo prazo.

## 3. Story
**Como** jogador
**Quero** acumular votos suficientes para subir de cargo
**Para** resetar e ganhar multiplicadores maiores

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Cargos

  Scenario: Progressão de cargo
    Given o jogador é vereador e tem 1000 votos
    When o jogador atinge o limite de votos para próximo cargo
    Then o jogador pode escolher "subir de cargo"
    And o jogo reseta votos e dinheiro para 0
    And o jogador recebe um multiplicador baseado no novo cargo

  Scenario: Reset parcial
    Given o jogador sobe de cargo
    When o reset ocorre
    Then votos e dinheiro são zerados
    But upgrades permanentes são mantidos
    And novas mecânicas são desbloqueadas

  Scenario: Multiplicadores
    Given o jogador é Deputado Estadual
    When o jogador clica no botão principal
    Then o clique gera mais votos/dinheiro que Vereador
```

## 5. Main Flow
1. Jogador acumula votos até atingir limite do cargo atual
2. Botão "Subir de Cargo" aparece
3. Jogador clica para confirmar
4. Reset parcial: votos e dinheiro zeram
5. Multiplicador é aplicado (x2, x4, x8, etc.)
6. Novas mecânicas são desbloqueadas

## 6. Alternative Flows
- Jogador pode adiar o reset para acumular mais votos
- Confirmação antes do reset

## 7. Data Model
```typescript
interface GameState {
  cargoAtual: CargoType
  multiplicador: number
  votos: number
  dinheiro: number
  upgradesPermanentes: Upgrade[]
}

type CargoType = 'vereador' | 'deputado_estadual' | 'governador' | 'deputado_federal' | 'senador' | 'presidente' | 'imperador'

interface CargoConfig {
  nome: string
  limiteVotos: number
  multiplicador: number
  desbloqueios: string[]
}
```

## 8. API
- `podeSubirDeCargo(): boolean`
- `subirDeCargo(): void`
- `getCargoConfig(cargo: CargoType): CargoConfig`

## 9. UI
- Barra de progresso para próximo cargo
- Botão "Subir de Cargo" quando disponível
- Modal de confirmação antes do reset
- Notificação de novas mecânicas desbloqueadas

## 10. Error Handling
- Validação antes do reset (votos suficientes)

## 11. Security
- N/A

## 12. Performance
- N/A (operação instantânea)

## 13. Testing
- Teste unitário para lógica de progressão
- Teste de componente para UI de prestige

## 14. Deployment
- N/A

## 15. Dependencies
- e01 (core gameplay)

## 16. Open Questions
- Limites exatos de votos para cada cargo (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Árvore de habilidades (e08)

## 19. Risks
- Equilíbrio dos multiplicadores

## 20. Notes
- Cargos: Vereador → Deputado Estadual → Governador → Deputado Federal → Senador → Presidente → Imperador → ???
- Multiplicadores: x2, x4, x8, x16, x32, x64, x128