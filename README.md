# 🎌 Desafio Frontend — Ani.me Clone

> Bem-vindo ao desafio! Você vai construir uma interface de um site de animes inspirado no layout fornecido, usando os dados de animes do repositório.

---

## 📋 Sobre o Desafio

O objetivo é colocar em prática seus conhecimentos de **Next.js** e construção de interfaces fiéis a um design. Você receberá um layout no Figma e um banco de dados local para trabalhar.

**Neste repositório**, os dados vêm do arquivo `src/db/db.json` e são acessados pela **lib** `src/lib/animes.ts`. Basta subir o projeto com `npm run dev` (ou `pnpm run dev`) — não é necessário rodar nenhuma API em outro terminal.

---

## 🛠️ Tecnologias

- **Next.js** (App Router — já configurado)
- **Estilização:** Livre — Tailwind CSS, CSS Modules, Styled Components, etc. (o projeto usa Tailwind 4)
- **Dados:** Lib em `src/lib/animes.ts` — funções `getAnimes`, `getAnimeById` e `getAnimesPaginados` que leem o `src/db/db.json`

---

## 🗂️ Estrutura do Projeto

```
animeflix/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── lib/
│   │   └── animes.ts            # getAnimes, getAnimeById, getAnimesPaginados
│   └── db/
│       └── db.json              # Banco local de animes
├── generate-db.mjs              # Script opcional para popular db.json (Jikan/AniList)
├── package.json
└── README.md
```

---

## 🚀 Como Começar

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd animeflix

# Instale as dependências
pnpm install
# ou: npm install

# Rode o projeto
pnpm run dev
# ou: npm run dev
```

Obs: Se usar `pnpm` e der erro, rode antes no terminal `corepack enable` e tente novamente.

O app fica em **http://127.0.0.1:3000**.

**Outros comandos:**

| Comando         | Descrição               |
|-----------------|-------------------------|
| `npm run build` | Build de produção       |
| `npm run start` | Servidor de produção    |
| `npm run lint`  | Rodar ESLint            |

---

## 📚 Lib de dados — como usar

Importe as funções de `@/lib/animes` nas suas páginas ou componentes (Server Components).

### `getAnimes()` / `getAnimes(options?)`

- **Sem argumentos:** retorna **todos** os animes (`Anime[]`). Use para listar, filtrar ou buscar no seu código.
- **Com `{ page?, limit? }`:** retorna um objeto paginado (`AnimesPaginados`): `{ animes, total, page, limit, totalPages }`.
  - **page:** número da página (default: 1)
  - **limit:** itens por página (default: 10, máx.: 100)

```ts
import { getAnimes } from "@/lib/animes";

// Todos os animes (array)
const animes = getAnimes();

// Paginação direta — retorna { animes, total, page, limit, totalPages }
const resultado = getAnimes({ page: 2, limit: 10 });
// resultado.animes, resultado.total, resultado.totalPages, etc.

// Só limit (primeira página)
const primeiraPagina = getAnimes({ limit: 20 });

// Filtrar o array no seu código (nome, gênero, letra)
const todos = getAnimes();
const porNome = todos.filter((a) =>
  a.titulo.toLowerCase().includes("naruto")
);
const porGenero = todos.filter((a) =>
  a.generos.some((g) => g.toLowerCase() === "acao")
);
```

### `getAnimeById(id: string)`

Retorna um anime pelo `id` (UUID) ou `null` se não existir. Inclui o array **`relacionados`** (até 8 animes do mesmo gênero).

```ts
import { getAnimeById } from "@/lib/animes";

// Em um Server Component, ex.: app/animes/[id]/page.tsx
const anime = getAnimeById(params.id);
if (!anime) notFound();
// anime.titulo, anime.sinopse, anime.relacionados, etc.
```

### `getAnimesPaginados(animes, page?, limit?)`

Quando você já tem um **array** (por exemplo depois de filtrar com `getAnimes()`), use esta função para paginar esse array. Retorno: `{ animes, total, page, limit, totalPages }`.

```ts
import { getAnimes, getAnimesPaginados } from "@/lib/animes";

const todos = getAnimes();
const filtrados = todos.filter((a) => a.generos.includes("Action"));
const { animes, total, totalPages } = getAnimesPaginados(filtrados, 2, 10);
```

---

## 📄 Estrutura do `db.json`

O arquivo `src/db/db.json` contém um objeto com a chave `animes`:

```json
{
  "animes": [
    {
      "id": "uuid",
      "titulo": "Nome do anime",
      "titulo_japones": "nome em japonês ou null",
      "capa": "url da capa ou null",
      "banner": "url do banner ou null",
      "sinopse": "texto ou null",
      "generos": ["Ação", "Drama", ...],
      "status": "Finished Airing | Currently Airing | ...",
      "episodios": 12,
      "nota": 8.5,
      "estudio": "Nome do estúdio ou null",
      "ano": 2024
    }
  ]
}
```

> 💡 Você pode enriquecer o `db.json` com mais animes. O script opcional `node generate-db.mjs` busca dados na [Jikan API](https://jikan.moe) e gera o arquivo.

---

## 📄 Páginas Obrigatórias

### 1. 🏠 Home (`/`)

- Banner principal com destaque de uma novidade
- Seção "Últimas novidades"
- Seção "Últimas atualizações" (grade de cards)
- Seção "Animes recentes"
- Use **`getAnimes()`** e exiba os dados nas seções

### 2. 📋 Listagem de Animes (`/animes`)

- Grade com todos os animes disponíveis
- Filtro por gênero (filtrar o array retornado por `getAnimes()` no seu código)
- Campo de busca por nome (filtrar por `titulo`)
- Paginação ou scroll infinito (use **`getAnimes({ page, limit })`** ou `getAnimesPaginados()` se já tiver a lista filtrada)

### 3. 🎬 Detalhes do Anime (`/animes/[id]`)

- Banner e capa do anime
- Informações: título, sinopse, gênero, status, classificação, nota
- Lista de episódios (quando disponível no projeto)
- Seção de animes relacionados — use **`getAnimeById(id)`**, que já retorna o array `relacionados`

---

## 🎯 Critérios de Avaliação

### ✅ Obrigatórios

| Critério | Descrição |
|----------|-----------|
| **Fidelidade ao Layout** | A interface deve ser visualmente próxima ao Figma fornecido |
| **Responsividade** | O site deve funcionar bem em mobile, tablet e desktop |
| **Qualidade do Código** | Componentes bem organizados, reutilizáveis e com responsabilidades claras |
| **Commits Organizados** | Histórico de commits descritivo e incremental (ex: `feat: add anime card component`) |

### 📌 O que será observado nos commits

- Mensagens claras e em inglês (padrão convencional)
- Commits atômicos (uma coisa por commit)
- Progressão lógica do desenvolvimento

---

## 🔀 Fluxo de trabalho com Git

Este desafio é uma boa oportunidade para praticar **branches**, **feature branch** e **pull request**. Se você nunca usou isso, não se preocupe: o texto abaixo explica do zero.

---

### O que é uma branch? E o que é feature branch?

- **Branch** (“ramo”) é uma **linha de desenvolvimento** separada. Você pode pensar na branch principal (`main`) como a “versão oficial” do projeto. Quando você **cria uma nova branch**, você está criando um **cópia** a partir daquele ponto, onde pode alterar arquivos e fazer commits **sem mexer na `main`**.
- **Feature branch** é uma branch usada **só para uma funcionalidade (ou uma correção)**. A ideia é: em vez de commitar tudo direto na `main`, você **ramifica uma vez**, faz **todos os commits daquela feature nessa branch** e, quando a feature estiver pronta, **integra de uma vez** na `main` (geralmente via pull request).

**Por que fazer assim?**

- A **`main`** continua estável e sempre “funcionando” (em teoria só entra código já revisado/testado).
- Cada **feature** fica “empacotada” em uma branch: fica fácil ver o que mudou, reverter só aquela feature ou fazer code review.
- No dia a dia em equipe, várias pessoas podem trabalhar em branches diferentes ao mesmo tempo.

**Resumindo:** você **ramifica** quando for começar uma feature, **desenvolve tudo nessa branch** (vários commits, se precisar) e **coloca na `main` de uma vez** quando terminar (via merge/pull request). Isso é o conceito de **feature branch**.

---

### Na prática: quando criar a branch e quando integrar

1. **Antes de começar a feature** (ex.: “vou fazer a página de listagem de animes”):
   - Crie uma branch a partir da `main`, por exemplo: `feat/listagem-animes`.
   - A partir daí, **todo o trabalho dessa feature** (novos arquivos, alterações, vários commits) é feito **nessa branch**.
2. **Enquanto desenvolve:**
   - Você faz commit normalmente: `feat: add grid of animes`, `feat: add genre filter`, etc. **Tudo isso fica na sua feature branch**, a `main` não muda.
3. **Quando a feature estiver pronta** (listagem funcionando, você deu uma revisada):
   - Você **abre um pull request** da sua branch (`feat/listagem-animes`) para a `main`.
   - No PR você descreve o que foi feito; em equipe, alguém revisa. Sozinho, você pode só revisar e dar merge.
   - Ao fazer o **merge**, **todas as alterações daquela branch entram na `main` de uma vez**. A “feature” vira parte oficial do projeto.

Depois disso, para a **próxima** feature (ex.: página de detalhes do anime), você volta para a `main`, atualiza, cria **outra** branch (ex.: `feat/detalhes-anime`) e repete o processo. Assim cada funcionalidade fica em uma branch própria e é integrada por vez.

---

### Comandos básicos: trocar de branch, criar branch, atualizar (pull)

Aqui estão só os comandos essenciais para o dia a dia. Nada de rebase, cherry-pick ou reset — apenas o necessário para trabalhar com branches e manter o repositório atualizado.

#### Ver em qual branch você está e listar branches

```bash
git branch
```

A branch atual aparece com um `*` ao lado. As listadas são as que existem **no seu computador**.

#### Trocar de branch (mudar para outra já existente)

```bash
git checkout main
git checkout feat/listagem-animes
```

Ou, no Git mais recente:

```bash
git switch main
git switch feat/listagem-animes
```

Você **precisa** ter commitado ou guardado suas alterações antes de trocar, senão o Git pode reclamar ou levar as mudanças junto. Se quiser “guardar” temporariamente sem commitar: `git stash` (e depois `git stash pop` para recuperar).

#### Criar uma branch nova (e já mudar para ela)

Sempre que você cria uma branch, ela é criada **a partir da branch em que você está no momento**. Por isso o fluxo comum é:

1. Ir para a branch que será a “base” (geralmente `main`).
2. Atualizar essa branch com o que tem no remoto (ver **pull** abaixo).
3. Criar a nova branch a partir daí.

**Criar e já mudar para a nova branch:**

```bash
git checkout -b feat/nome-da-feature
```

Ou:

```bash
git switch -c feat/nome-da-feature
```

Exemplo: você está na `main`, quer criar uma branch para a listagem. Roda `git checkout -b feat/listagem-animes`. A nova branch `feat/listagem-animes` é criada **a partir da `main`** e você já passa a estar nela.

**Criar uma branch a partir de outra sem estar nela:**  
Primeiro mude para a branch que será a base (`git checkout main` ou `git checkout outra-branch`), atualize com `git pull` se precisar, depois rode `git checkout -b feat/nova-branch`. A nova branch sempre nasce a partir da branch em que você está.

#### Atualizar a branch atual com o que está no remoto (pull)

Quando alguém (ou você em outro lugar) envia alterações para o repositório (GitHub, etc.), você traz essas alterações para o **seu** repositório local com **pull**:

```bash
git pull
```

Ou, de forma explícita:

```bash
git pull origin main
```

- Se você está na `main`, `git pull` (ou `git pull origin main`) atualiza a sua `main` com o que foi enviado para a `main` no remoto.
- Se você está em outra branch (ex.: `feat/listagem-animes`), `git pull` atualiza **essa** branch com o que existe no remoto para ela. Se a branch só existe no seu PC, não há “remoto” ainda; depois do primeiro `git push origin feat/listagem-animes`, `git pull` passará a atualizar essa branch a partir do remoto.

**Boa prática:** antes de **criar** uma nova feature branch, vá na `main` (`git checkout main`), rode `git pull` e **depois** crie a branch (`git checkout -b feat/...`). Assim sua feature já nasce em cima da versão mais recente da `main`.

---

### Branches — prefixos no nome

Crie uma branch para cada tarefa ou correção, usando um prefixo que descreve o tipo de mudança:

| Prefixo   | Uso |
|-----------|-----|
| `feat/`   | Nova funcionalidade (ex.: `feat/home-banner`, `feat/anime-card`) |
| `fix/`    | Correção de bug (ex.: `fix/pagination-edge-case`) |
| `docs/`   | Apenas documentação (ex.: `docs/readme-install`) |
| `style/`  | Formatação, CSS, sem mudança de lógica (ex.: `style/button-responsive`) |
| `refactor/` | Refatoração de código, sem nova feature nem correção |
| `test/`   | Testes (ex.: `test/animes-lib`) |
| `chore/`  | Tarefas de manutenção (deps, config, etc.) |

**Exemplos:**

```bash
git checkout -b feat/listagem-animes
git checkout -b fix/layout-mobile
git checkout -b docs/readme
```

A branch principal (ex.: `main`) fica estável; o trabalho acontece nas branches e volta para a principal via **pull request**.

### Pull Request (PR)

O **pull request** é o passo em que você **propõe** que as alterações da sua feature branch entrem na `main`. Em resumo:

1. **Trabalhe na branch** — faça todos os commits daquela feature na `feat/...` (ou `fix/...`).
2. **Envie a branch** para o repositório: `git push origin feat/nome-da-branch`.
3. **Abra um Pull Request** no GitHub (ou GitLab, etc.): você está dizendo “quero integrar esta branch na `main`”. Compare a branch com a `main`, descreva o que foi feito e, se tiver equipe, peça review.
4. **Após aprovação (ou sua própria revisão)** — faça o **merge** do PR. Todas as alterações daquela branch entram na `main` de uma vez.

**Resumo:** uma **feature branch** vira **um** PR; quando o PR é aprovado e você faz o merge, a **feature inteira** entra na `main` de uma vez. Assim o histórico fica claro: cada PR = uma feature ou fix, e os commits dentro dele seguem o padrão semântico abaixo.

### Commits semânticos (Conventional Commits)

Use no **corpo da mensagem de commit** um tipo + descrição curta, em inglês:

| Tipo       | Uso |
|------------|-----|
| `feat:`    | Nova funcionalidade |
| `fix:`     | Correção de bug |
| `docs:`    | Documentação |
| `style:`   | Formatação (ex.: Prettier, CSS) |
| `refactor:`| Refatoração |
| `test:`    | Testes |
| `chore:`   | Outros (deps, config) |

**Formato:** `tipo(escopo opcional): descrição`

**Exemplos:**

```
feat: add anime card component
feat(home): add hero banner with random anime
fix: pagination when list is empty
docs: update README with install steps
style: responsive layout for anime grid
```

- **Mensagens em inglês** e **commits atômicos** (um propósito por commit) facilitam o review e o histórico.

**Onde ver a convenção completa:** [Conventional Commits](https://www.conventionalcommits.org/) — site oficial com regras, exemplos e boas práticas para commits semânticos.

---

## 🌟 Bônus (Opcional)

| Bônus | Descrição |
|-------|-----------|
| 🔍 **Busca funcional** | Campo de busca na navbar que filtra animes em tempo real |
| 🚀 **Deploy na Vercel** | Projeto publicado e acessível online |
| 🔐 **Autenticação** | Tela de login e cadastro (pode ser mockada, sem backend real) |
| ❤️ **Lista de favoritos** | Usuário pode favoritar animes (localStorage) |
| 🌙 **Tema escuro/claro** | Toggle entre os temas |
| 📱 **Menu mobile** | Navbar responsiva com hamburger menu |

---

## 📦 Como Entregar

1. Crie um repositório **público** no GitHub (pode ser um fork deste ou um novo com o código).
2. O repositório deve conter:
   - Código do projeto Next.js
   - Arquivo `db.json` (ou `src/db/db.json`) com dados suficientes para popular a interface
   - `README.md` explicando como rodar o projeto localmente
3. Envie o link do repositório.

### Checklist antes de entregar

- [ ] Projeto roda com `npm run dev` (ou `pnpm run dev`) sem erros
- [ ] As 3 páginas obrigatórias estão implementadas
- [ ] O README explica como instalar e rodar
- [ ] Commits organizados e descritivos

---

## 🎨 Design

O layout de referência está disponível no Figma: [Desafios — CodeLab](https://www.figma.com/design/Yb9IBH56g7T1hdIyZ3BMNO/Desafios---CodeLab?node-id=130247-1282&p=f&t=C8FMsega0gfGIBiy-0)

> As imagens dos animes podem ser obtidas de fontes públicas como [MyAnimeList](https://myanimelist.net) ou [Jikan API](https://jikan.moe) para popular o `db.json`.

