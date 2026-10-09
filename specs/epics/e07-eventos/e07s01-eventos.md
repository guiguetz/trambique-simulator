# e07s01 — Sistema de Eventos

## 1. Business Narrative
Como jogador, quero que eventos aleatórios aconteçam durante o jogo, para adicionar imprevisibilidade e variedade.

## 2. Value
Sistema que mantém o jogo imprevisível e interessante.

## 3. Story
**Como** jogador
**Quero** que eventos aleatórios apareçam
**Para** ter variedade e desafios

## 4. Acceptance Criteria
```gherkin
Feature: Sistema de Eventos

  Scenario: Evento por timer
    Given o jogo está rodando
    When 2-5 minutos se passam
    Then um evento aleatório pode aparecer

  Scenario: Evento por ação
    Given o jogador compra um upgrade
    Then a chance de evento aumenta em 5-10%

  Scenario: Evento negativo
    Given uma CPI é disparada
    When o evento está ativo
    Then a geração de votos é reduzida por X segundos

  Scenario: Evento positivo
    Given um Discurso Viral é disparado
    When o evento está ativo
    Then a geração de votos é aumentada por X segundos
```

## 5. Main Flow
1. Timer base verifica a cada 2-5 minutos
2. Chance de evento é calculada
3. Se evento ocorre, efeito é aplicado
4. Efeito dura X segundos
5. Notificação aparece na tela

## 6. Alternative Flows
- Eventos podem ser cancelados por habilidades
- Eventos podem se acumular

## 7. Data Model
```typescript
interface Evento {
  id: string
  nome: string
  descricao: string
  tipo: 'negativo' | 'positivo'
  efeito: {
    tipo: 'reduz_votos' | 'reduz_dinheiro' | 'aumenta_votos' | 'aumenta_dinheiro' | 'remove_penalidades'
    valor: number
    duracao: number
  }
  chance: number  // 0-1
}
```

## 8. API
- `verificarEvento(): void`
- `aplicarEvento(evento: Evento): void`
- `getEventosAtivos(): Evento[]`

## 9. UI
- Notificação de evento aparece como pop-up
- Indicadores de eventos ativos
- Timer de duração do evento

## 10. Error Handling
- N/A

## 11. Security
- N/A

## 12. Performance
- Verificação de evento eficiente

## 13. Testing
- Teste unitário para lógica de eventos
- Teste de componente para notificações

## 14. Deployment
- N/A

## 15. Dependencies
- e01 (core gameplay)

## 16. Open Questions
- Chances e durações exatas (balanceamento)

## 17. Gherkin
Ver acceptance criteria acima.

## 18. Out of Scope
- Árvore de habilidades que afeta eventos (e08)

## 19. Risks
- Equilíbrio dos eventos

## 20. Notes
- Eventos: CPI, Delação Premiada, Escândalo na Mídia, Mega Escândalo, Festa no Orçamento, Discurso Viral, Anistia