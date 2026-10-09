# 🇧🇷 Trambique Simulator

Jogo incremental (clicker) com tema de corrupção política brasileira. Clique, acumule votos, desvie verbas e suba na política!

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) **v22 ou superior** (recomendado: LTS)
- [Git](https://git-scm.com/)

Para verificar se está tudo instalado:

```bash
node --version   # deve mostrar v22.x.x ou superior
git --version    # deve mostrar git version 2.x.x
```

## Primeiros passos

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/trambique-simulator.git
cd trambique-simulator
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador. O jogo vai recarregar automaticamente quando você salvar alterações.

## Comandos úteis

| Comando             | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Inicia o servidor de desenvolvimento       |
| `npm run build`     | Compila o projeto para produção            |
| `npm run preview`   | Visualiza o build de produção localmente   |
| `npm run test`      | Roda os testes em modo watch               |
| `npm run test:run`  | Roda os testes uma vez só                  |
| `npm run lint`      | Verifica problemas de código (linting)     |

## Estrutura do projeto

```
src/
├── components/     # Componentes React (só UI)
│   ├── ui/         # Componentes genéricos (botões, modais)
│   └── game/       # Componentes específicos do jogo
├── game/           # Lógica pura do jogo (sem React)
├── hooks/          # React hooks customizados
├── store/          # Gerenciamento de estado
├── types/          # Interfaces e tipos TypeScript
├── utils/          # Funções utilitárias
└── test/           # Configuração e helpers de teste
```

**Regra de ouro:** a lógica do jogo fica em `src/game/`, os componentes só cuidam da interface.

## Como contribuir

### 1. Crie uma branch para sua feature

```bash
git checkout -b feat/minha-feature
```

### 2. Faça suas alterações

- Escreva código em TypeScript estrito (sem `any`)
- Use nomes em português para conceitos do jogo (`votos`, `dinheiro`, `trambique`)
- Textos da interface em **pt-BR**
- Componentes React: somente funções (sem classes)

### 3. Rode os testes e o lint antes de commitar

```bash
npm run test:run
npm run lint
```

Tudo verde? Prossiga.

### 4. Faça o commit

Use [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```bash
git add .
git commit -m "feat: adiciona sistema de propinas"
```

Prefixos válidos: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`

### 5. Abra um Pull Request

```bash
git push origin feat/minha-feature
```

Depois abra o PR no GitHub.

## Stack tecnológica

| Tecnologia       | Versão | Para quê             |
| ---------------- | ------ | -------------------- |
| TypeScript       | 6      | Tipagem estática     |
| React            | 19     | Interface            |
| Vite             | 8      | Build e dev server   |
| Tailwind CSS     | 4      | Estilos              |
| Vitest           | 5      | Testes               |
| ESLint + Oxlint  | -      | Linting              |

## Regras importantes

- **Sem `any`** — use `unknown` e type guards
- **Sem `as` casts** — use `satisfies` ou type guards
- **Lógica do jogo em `src/game/`** — funções puras, sem React
- **Testes para mecânicas do jogo** — nunca pule (afetam balanceamento)
- **Commits só com tudo verde** — testes + lint passando

## Problemas?

Se algo der errado:

1. Delete `node_modules` e reinstale: `rm -rf node_modules && npm install`
2. Limpe o cache do build: `rm -rf dist`
3. Verifique a versão do Node: `node --version` (precisa ser v22+)

## Licença

Projeto open source. Contribuições são bem-vindas!