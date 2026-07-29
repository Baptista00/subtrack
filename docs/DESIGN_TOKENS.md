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

- Line heights: PENDENTE: preencher com informação aprovada.

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

## Pendências

- Line heights: PENDENTE: preencher com informação aprovada.
- Sombras: PENDENTE: preencher com informação aprovada.
- Animações: PENDENTE: preencher com informação aprovada.
