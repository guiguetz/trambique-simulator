# e10s01 — Sistema de Save/Load

## 1. Business Narrative
Como jogador, quero salvar meu progresso e carregar depois, para não perder meu jogo.

## 2. Value
Persistência de progresso que permite jogar em múltiplas sessões.

## 3. Story
**Como** jogador
**Quero** salvar meu jogo automaticamente e manualmente
**Para** continuar jogando depois

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Save/Load

  Scenario: Auto-save
    Given o jogo está rodando
    When 30 segundos se passam
    Then o jogo salva automaticamente no LocalStorage

  Scenario: Manual save
    Given o jogo está rodando
    When o jogador clica em "Salvar"
    Then o jogo salva no LocalStorage

  Scenario: Load
    Given o jogador abre o jogo
    When há um save no LocalStorage
    Then o jogo carrega o progresso salvo

  Scenario: Export/Import
    Given o jogador quer fazer backup
    When o jogador clica em "Exportar"
    Then um código de save é gerado
    And o jogador pode importar esse código depois
```

## 5. Main Flow
1. Auto-save a cada 30 segundos
2. Save manual via botão
3. Load automático ao abrir o jogo
4. Export gera código de save
5. Import aceita código de save

## 6. Alternative Flows
- Save corrompido deve ser detectado
- Import inválido deve mostrar erro

## 7. Data Model
```typescript
interface SaveData {
  versao: number
  timestamp: number
  estado: GameState
}

interface SaveSystem {
  autoSave(): void
  manualSave(): void
  load(): GameState | null
  export(): string
  import(codigo: string): boolean
}
```

## 8. API
- `autoSave(): void`
- `manualSave(): void`
- `load(): GameState | null`
- `export(): string`
- `import(codigo: string): boolean`

## 9. UI
- Botão de salvar
- Botão de exportar
- Campo de importar
- Notificação de save/load

## 10. Error Handling
- Save corrompido: mensagem de erro e opção de reset
- Import inválido: mensagem de erro

## 11. Security
- Validação de dados importados

## 12. Performance
- Save/load deve ser rápido (< 100ms)

## 13. Testing
- Teste unitário para save/load
- Teste de componente para UI

## 14. Deployment
- N/A

## 15. Dependencies
- Todas as mecânicas do jogo

## 16. Open Questions
- Formato exato do código de export (base64? JSON?)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Save em nuvem
- Múltiplos saves

## 19. Risks
- Corrupção de save

## 20. Notes
- Usar LocalStorage
- Schema versionado para migrações futuras
- Auto-save a cada 30 segundos