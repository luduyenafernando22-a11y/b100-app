# B-100 👑

**B-100** é uma PWA editorial para curadoria de produtos de beleza de alta qualidade até **R$ 100** no Brasil. A aplicação foi construída com React, TypeScript, Vite, Tailwind CSS, React Router DOM, Lucide React e Supabase, com redirecionamento afiliado para o AliExpress.

## Desenvolvimento local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Sem variáveis Supabase, a vitrine continua navegável com o estado editorial vazio. Para carregar produtos, configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

## Supabase

Execute `supabase/migrations/001_aliexpress_importer.sql` no SQL Editor. Depois crie um utilizador em **Authentication → Users** e insira o respetivo UUID na tabela `admins`, conforme o comentário no fim da migration. A área `/admin` lê ficheiros `.xls` e `.xlsx`, valida a moeda BRL e o limite de R$ 100 e faz upsert por `aliexpress_id`.

## Netlify

O ficheiro `netlify.toml` já define o comando `pnpm build`, o diretório `dist/public` e o rewrite `/* /index.html 200` necessário para as rotas do React Router. No painel da Netlify, configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` antes do primeiro deploy.

## Rotas

| Rota | Função |
|---|---|
| `/` | Vitrine principal com categorias e filtros de preço |
| `/categoria/:cat` | Capítulo editorial filtrado por categoria |
| `/go/:id` | Regista o clique e redireciona para o link afiliado |
| `/admin/login` | Login Supabase para operações |
| `/admin` | Importador XLS/XLSX protegido por administrador |

## PWA

O manifest está em `client/public/manifest.json`, com `display: standalone` e `theme_color: #d4af37`. O Service Worker em `client/public/sw.js` é registado em produção.
