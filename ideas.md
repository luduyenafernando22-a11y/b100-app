# B-100 — Direção visual

## Três abordagens consideradas

### Theme Name: Editorial Quiet Luxury
Very Brief Intro: Uma vitrine de beleza com atmosfera de revista, materiais tácteis e curadoria silenciosa. O foco está em transformar o limite de preço numa assinatura de bom gosto.
Probability: 0.07

### Theme Name: Rosé Laboratory
Very Brief Intro: Uma linguagem mais experimental, com superfícies de laboratório, blush suave e pequenos apontamentos cromados. A sensação é de descoberta técnica e auto-cuidado inteligente.
Probability: 0.03

### Theme Name: Golden Utility
Very Brief Intro: Uma abordagem funcional e direta, inspirada em etiquetas de preço, cartões de curadoria e ferramentas de beleza. A interface privilegia eficiência e comparação sem perder o toque premium.
Probability: 0.09

## Abordagem escolhida: Editorial Quiet Luxury

### Design Movement
Editorial Quiet Luxury, cruzando direção de arte de revistas de beleza independentes com minimalismo materialista brasileiro.

### Core Principles
1. A curadoria vem antes do catálogo: poucas escolhas fortes, com contexto suficiente para inspirar confiança.
2. O limite de R$ 100 é uma promessa visual e funcional, nunca um elemento promocional gritante.
3. Contraste entre serifas expressivas, sans-serif utilitária e superfícies de papel/ pedra para criar ritmo editorial.
4. Toda interação deve parecer uma descoberta: fluida, clara e sem ruído.

### Color Philosophy
O marfim aquece a base e lembra papel editorial; o espresso dá autoridade e legibilidade; o ouro antigo representa a coroa sem cair no brilho excessivo; blush e sage aparecem apenas como notas de cuidado e frescura. A cor proprietária é o **B-100 Gold**, um dourado envelhecido pensado para funcionar tanto em fundos claros como em microdetalhes.

### Layout Paradigm
A página principal alterna uma composição assimétrica de hero com uma grelha editorial modular. O conteúdo começa alinhado à esquerda, os produtos surgem em cartões de proporções alternadas e a navegação de categorias funciona como um índice horizontal, não como um menu genérico centralizado.

### Signature Elements
- Marca-coroa abstrata baseada em três pétalas e uma pequena reentrância de etiqueta de preço.
- Etiquetas “até R$ 100” e “curado” em cápsulas de papel, com cantos suaves mas não uniformemente arredondados.
- Linhas finas de moldura e pequenos números de edição que dão ao catálogo uma sensação de publicação.

### Interaction Philosophy
Hover, focus e seleção devem revelar informação adicional com pouca deslocação: uma elevação curta do cartão, uma linha dourada e um CTA que se torna mais afirmativo. Estados de carregamento e erro são calmos e explicativos.

### Animation
Usar transições entre 160 e 260 ms, com ease-out físico. As imagens entram com uma ligeira subida e opacidade apenas quando o utilizador não prefere movimento reduzido. Cartões podem elevar-se 3 px no hover, sem escalas exageradas. A navegação de categorias desliza horizontalmente no mobile; filtros alternam instantaneamente para manter eficiência.

### Typography System
- Display: Cormorant Garamond, 600, para headlines e títulos editoriais.
- Interface: DM Sans, 400–700, para navegação, filtros, preços e microcopy.
- Hierarquia: headlines grandes e arejadas; labels em uppercase com tracking; preço em DM Sans semibold para leitura rápida.

### Brand Essence
A curadoria brasileira de beleza que encontra produtos surpreendentes até R$ 100, para pessoas que preferem comprar menos e escolher melhor.
Personalidade: criteriosa, calorosa, perspicaz.

### Brand Voice
Headlines e CTAs devem soar como uma editora que recomenda, não como um marketplace que grita. Evitar “bem-vindo”, “comece agora” e urgência artificial.

Exemplos:
- “Pequenos luxos, escolhidos com critério.”
- “Ver a seleção e descobrir o próximo favorito.”

### Wordmark & Logo
O wordmark B-100 usa “B” serifado com um hífen curto e “100” em sans-serif condensada; a coroa abstrata aparece como símbolo independente antes do nome e como favicon. Nunca usar o nome sozinho em tipografia default.

### Signature Brand Color
**B-100 Gold — #D4AF37**, usado para detalhes de foco, a coroa, linhas de seleção e pequenos elementos de distinção; nunca como preenchimento dominante.

## Style Decisions
- A interface pública usa fundo marfim, texto espresso e dourado antigo, sem gradientes roxos ou estética neon.
- A hero usa imagem editorial escura/contrastada com texto claro apenas sobre a área protegida por overlay; as áreas claras usam texto espresso.
- A área admin usa a mesma identidade, mas prioriza densidade, tabelas legíveis e estados de importação explícitos.

## Emendas de estilo aceites

- B-100 Gold #D4AF37 aparece apenas na coroa, regras ativas, labels pequenas, numerais e ações principais; nunca como painel dominante.
- Estados vazios mantêm a voz editorial e não expõem nomes de infraestrutura, base de dados ou dependências técnicas.
- Cada categoria funciona como um capítulo editorial próprio, com label e linha de apoio específicos sem quebrar o sistema global.
