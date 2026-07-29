# Design Tokens — SubTrack

## Cores

| Token | Valor |
| --- | --- |
| `primary` | `#1B4D3E` |
| `success` | `#22C55E` |
| `warning` | `#F59E0B` |
| `error` | `#EF4444` |
| `background` | `#F8FAF9` |
| `surface` | `#FFFFFF` |
| `textPrimary` | `#1A1A1A` |
| `textSecondary` | `#6B7280` |
| `border` | `#E5E7EB` |
| `toggleOff` | `#D1D5DB` |

## Cores de categoria

| Categoria | Valor |
| --- | --- |
| `streaming` | `#8B5CF6` |
| `musica` | `#EC4899` |
| `produtividade` | `#3B82F6` |
| `saude` | `#22C55E` |
| `educacao` | `#F59E0B` |
| `outros` | `#6B7280` |

## Tipografia

- Família: Inter.

| Token | Tamanho | Peso |
| --- | --- | --- |
| Display | 28px | 800 |
| Heading 1 | 22px | 700 |
| Heading 2 | 18px | 600 |
| Body | 15px | 400 |
| Label | 13px | 500 |
| Small/Helper | 12px | 400 |
| Section Label | 11px | 700 |

- Line heights fora da especificação já aprovada para o nome no SubscriptionCard: PENDENTE: preencher com informação aprovada.

## Espaçamento

- 4px, 8px, 12px, 16px, 24px, 32px e 48px.

## Border radius

| Token | Valor | Uso aprovado |
| --- | --- | --- |
| `xs` | 6px | PENDENTE: preencher com informação aprovada. |
| `sm` | 8px | PENDENTE: preencher com informação aprovada. |
| `md` | 12px | Inputs e botões. |
| `lg` | 16px | Cards e modais. |
| `xl` | 20px | Sheets. |
| `pill` | PENDENTE: preencher com informação aprovada. | Chips seletores. |

## Componentes documentados

- Botões: primary, secondary, danger e ghost.
- Inputs: vazio, focado, preenchido, erro e senha com mostrar/ocultar.
- Card de assinatura: normal, vencendo em até 3 dias e vencida.
- Chips/badges de categoria.
- Toggle: 52 × 30 pt.
- Barra inferior: Início, Assinaturas e Perfil.
- Estado vazio.
- Componentes visuais de perfil.

## Especificações aprovadas — Button

### Estrutura geral

Primary, secondary e danger:

- Altura: 52px.
- Largura mínima: 160px.
- Largura automática, podendo crescer conforme o conteúdo.
- Border radius: 12px.
- Alinhamento central.
- Tamanho do texto: 15px.
- Peso do texto: 600.
- Espaçamento entre ícone e texto: 8px.
- PENDENTE: preencher com informação aprovada sobre padding horizontal.

Ghost:

- Altura determinada pelo conteúdo.
- `paddingVertical`: 4px.
- `paddingHorizontal`: 0px.
- Tamanho do texto: 14px.
- Peso do texto: 600.
- Sem ícone.
- Sem sublinhado visível no estado normal.

### Primary

Estado padrão:

- `backgroundColor`: `#1B4D3E`.
- Texto: `#FFFFFF`.
- Sem borda.
- Sombra equivalente a `0 2px 8px rgba(27, 77, 62, 0.25)`.

Estado pressionado:

- `backgroundColor`: `#143D30`.
- Texto: `#FFFFFF`.
- Sem sombra.
- Transformação de escala: `0.98`.

Estado desabilitado:

- `backgroundColor`: `#9CA3AF`.
- Texto: `#E5E7EB`.
- Sem sombra.
- Impedir acionamento.

Estado loading:

- Mesmo visual do estado padrão.
- Impedir acionamento.
- Substituir o label por “Carregando...”.
- Exibir `ActivityIndicator` branco à esquerda do texto.
- Espaçamento de 8px entre indicador e texto.

- Ícone opcional por `ReactNode`, à esquerda do texto, com tamanho visual esperado de 20px e espaçamento de 8px.

### Secondary

Estados aprovados: padrão e pressionado.

- `borderWidth`: 1.5px.
- Sem sombra.

Padrão:

- `backgroundColor`: transparente.
- `borderColor`: `#1B4D3E`.
- Texto: `#1B4D3E`.

Pressionado:

- `backgroundColor`: `#EAF2EF`.
- `borderColor`: `#143D30`.
- Texto: `#1B4D3E`.

### Danger

Somente estado padrão aprovado.

- `borderWidth`: 1.5px.
- `borderColor`: `#EF4444`.
- `backgroundColor`: transparente.
- Texto: `#EF4444`.
- Sem sombra.
- Ícone opcional por `ReactNode`, com tamanho visual esperado de 18px e espaçamento de 8px.

### Ghost

Somente estado padrão aprovado.

- `backgroundColor`: transparente.
- Sem borda.
- Texto: `#1B4D3E`.
- Sem sombra.

## Especificações aprovadas — Formulários

### Input

Estados aprovados: padrão, focado, preenchido e erro.

- Largura: 100%.
- Altura não fixa.
- `paddingVertical`: 14px.
- `paddingHorizontal`: 16px.
- Border radius: 12px.
- `borderWidth`: 1.5px.
- `backgroundColor`: `#FFFFFF`.
- Tamanho do texto: 14px.
- Texto preenchido: `#1A1A1A`.
- Placeholder: `#6B7280`.
- Sem `fontFamily` e sem `lineHeight` nesta etapa.

Padrão e preenchido sem foco:

- `borderColor`: `#E5E7EB`.

Focado:

- `borderColor`: `#1B4D3E`.

Erro:

- `borderColor`: `#EF4444`.
- Tem prioridade visual sobre o foco.

### FormField

Organiza label, campo e mensagem de erro.

Label:

- Tamanho: 13px.
- Peso: 500.
- `marginBottom`: 6px.
- Padrão: `#6B7280`.
- Focado: `#1B4D3E`.
- Erro: `#EF4444`.
- Erro tem prioridade sobre foco.

Mensagem de erro:

- Exibida somente quando houver texto de erro.
- Tamanho: 12px.
- Peso: 500.
- Cor: `#EF4444`.
- `marginTop`: 5px.
- Sem `lineHeight`.

Não há helper text ou estado desabilitado aprovados.

### PasswordInput

- A senha inicia oculta e alterna `secureTextEntry` instantaneamente.
- Ícones equivalentes a `eye` e `eye-off` de `@expo/vector-icons`.
- Tamanho do ícone: 20px.
- Cor do ícone: `#6B7280`.
- Área do ícone com `paddingHorizontal`: 14px, sem fundo e sem borda.
- Rótulos de acessibilidade: “Mostrar senha” e “Ocultar senha”.
- O `TextInput` mantém `paddingHorizontal`: 16px e `flex: 1`.
- O botão de visibilidade é irmão do `TextInput` no mesmo contêiner horizontal, sem posicionamento absoluto e sem padding direito adicional no texto.

## Especificações aprovadas — CategoryBadge

- `borderRadius`: pill. Na implementação React Native, o token equivalente usa `9999px`.
- `paddingHorizontal`: 8px.
- `paddingVertical`: 2px.
- Texto: 10px, peso 600.
- Sem borda e sem sombra.

| Categoria | Fundo | Texto |
| --- | --- | --- |
| Streaming | `#E8F5F0` | `#1B4D3E` |
| Música | `#F3E8FF` | `#7C3AED` |
| Produtividade | `#EFF6FF` | `#1D4ED8` |
| Saúde | `#FFF7ED` | `#C2410C` |
| Fallback, incluindo Educação e Outros | `#F3F4F6` | `#374151` |

## Especificações aprovadas — SubscriptionCard

### Contêiner

- Largura: 100%.
- Fundo: `#FFFFFF`.
- `borderRadius`: 16px.
- `paddingHorizontal`: 16px.
- `paddingVertical`: 14px.
- Espaçamento entre as colunas principais: 12px.
- Borda: 1px, `#F3F4F6`.
- Alinhamento vertical central.
- Sombra React Native: `shadowColor: #000000`, `shadowOffset: { width: 0, height: 1 }`, `shadowOpacity: 0.05`, `shadowRadius: 1` e `elevation: 1` no Android.
- Estado pressionado: fundo `#F9FAFB`.

### Ícone do serviço

- Contêiner: 44px × 44px, `borderRadius`: 16px, sem encolhimento e com conteúdo centralizado.
- Inicial: 15px, peso 700 e cor recebida por `serviceColor`.
- Fundo: `serviceColor` com alpha 0.094, equivalente ao sufixo hexadecimal `18`.
- Se `serviceColor` não estiver no formato `#RRGGBB`, usar fundo `#F3F4F6` e texto `#374151`.

### Conteúdo central

- Nome: 14px, peso 600, line-height 17.5px, `#1A1A1A` e margem inferior de 4px.
- O nome pode quebrar linha; não usar truncamento, ellipsis ou `numberOfLines`.
- Segunda linha: direção horizontal, alinhamento central e gap de 8px.
- Renovação: 11px, peso 500, `#9CA3AF`; quando houver alerta, `#F59E0B` e ícone de alerta de 12px na mesma linha.

### Coluna direita

- Direção horizontal, alinhamento central, gap de 6px e sem encolhimento.
- Preço: 14px, peso 700, `#1A1A1A`.
- Chevron: 14px, `#D1D5DB`.

## Especificações aprovadas — FinancialSummaryCard

### Container e gradiente

- Largura: 100%.
- Gradiente diagonal equivalente a 135deg, de `#1B4D3E` para `#163D31`.
- `borderRadius`: 24px.
- `padding`: 24px.
- `overflow`: hidden.
- Sem borda, sombra ou altura fixa.

### Círculos decorativos

- Cor: `rgba(255,255,255,0.04)`.
- Círculo superior direito: 160px × 160px, raio 80px, `top: -32px` e `right: -32px`.
- Círculo inferior direito: 112px × 112px, raio 56px, `bottom: -40px` e `right: -16px`.
- São apenas visuais, sem animação e ocultos de tecnologias assistivas.

### Tipografia e estatísticas

- Label principal: 10px, peso 600, `rgba(255,255,255,0.50)`, caixa alta, `letterSpacing: 1px` e margem inferior de 8px.
- Valor principal: 40px, peso 800, `#FFFFFF`, `lineHeight: 40px`, `letterSpacing: -1px`, algarismos tabulares e margem inferior de 20px.
- Linha de estatísticas: espaçamento de 16px entre elementos.
- Labels das estatísticas: 11px, peso 500, `rgba(255,255,255,0.50)` e margem inferior de 2px.
- Valores das estatísticas: 18px, peso 700, `#FFFFFF` e algarismos tabulares.
- Sufixo “este mês”: 11px, peso 600 e `#22C55E`.
- Divisor: 1px × 32px, `rgba(255,255,255,0.15)`.

## Pendências

- Line heights: PENDENTE: preencher com informação aprovada.
- Sombras fora das especificações já aprovadas para Button e SubscriptionCard: PENDENTE: preencher com informação aprovada.
- Animações: PENDENTE: preencher com informação aprovada.

## Especificações aprovadas — HomeHeader

- Container: `paddingHorizontal` 20px, `paddingTop` 20px e `paddingBottom` 16px.
- Título: 22px, peso 700, `#1A1A1A` e `letterSpacing` de -0,55px.
- O menu existe apenas no estado com assinaturas: 36px × 36px, circular, fundo `#FFFFFF`, borda de 1px `#E5E7EB`, sombra pequena e ícone de três pontos de 18px em `#1A1A1A`.

## Especificações aprovadas — EmptyState

- Container centralizado: `flex: 1`, `paddingHorizontal` 32px, `gap` 24px e deslocamento vertical de -32px.
- Ilustração: 200px × 168px, montada apenas com formas visuais usando `#1B4D3E` e as opacidades aprovadas.
- Título: 17px, peso 700, `#1A1A1A`, margem inferior de 8px e alinhamento central.
- Descrição: 14px, peso 400, `#6B7280`, `lineHeight` 22,75px e alinhamento central.
- CTA: 100% da largura do container, 52px de altura, raio de 16px, fundo `#1B4D3E`, sombra pequena, ícone de adicionar de 16px e estado pressionado `#163D31` com escala 0,98.

## Especificações aprovadas — FloatingActionButton

- Posição absoluta: 88px acima da borda inferior e 20px à direita.
- 56px × 56px, circular, fundo `#1B4D3E` e ícone de adicionar de 22px em `#FFFFFF`.
- Sombra: `0 4px 20px rgba(27,77,62,0.4)`; no Android, `elevation` 6 como equivalente visual.
- Estado pressionado: fundo `#163D31` e escala 0,95.
