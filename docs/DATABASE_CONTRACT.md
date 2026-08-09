# Contrato de Banco de Dados — SubTrack

## Escopo inicial do MVP

- Cada usuário cadastra manualmente as próprias assinaturas.
- Cada assinatura pertence somente ao usuário autenticado.
- Não há integração bancária, cartão, Open Finance ou compartilhamento de assinaturas.
- Não há modo pausado, histórico de pagamentos, nem renovação automática nesta etapa.
- A tabela registra os dados necessários para um avanço automático futuro, sem regras, triggers ou funções SQL para isso agora.

## Provedor e ambiente

- Serviço: Supabase.
- Banco de dados: PostgreSQL.
- Autenticação: Supabase Auth.
- Ambiente atual: projeto de desenvolvimento.
- Região do projeto: São Paulo.
- Auditoria somente leitura remota concluída em 06/08/2026: projeto SubTrack (`nmubendqtacvbdezbbbt`), região `sa-east-1`, status `ACTIVE_HEALTHY` e PostgreSQL 17.
- O aplicativo acessa os dados pelo cliente oficial do Supabase.
- Nenhuma chave secreta de servidor será usada no aplicativo mobile.
- A chave pública publishable é lida de `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; a URL é lida de `EXPO_PUBLIC_SUPABASE_URL`.
- As variáveis `EXPO_PUBLIC_` são configuradas localmente e não registram valores reais nesta documentação.
- A persistência de sessão para a futura autenticação usa AsyncStorage.
- Nenhuma credencial real deve ser registrada neste repositório ou nesta documentação.

## Tabela `subscriptions`

| Campo | Tipo PostgreSQL | Obrigatório | Definição aprovada |
| --- | --- | --- | --- |
| `id` | `uuid` | Sim | Chave primária, com padrão `gen_random_uuid()`. |
| `user_id` | `uuid` | Sim | Referência a `auth.users(id)`, com `on delete cascade`; identifica o proprietário. |
| `name` | `text` | Sim | Nome do serviço; tamanho lógico aceito pelo aplicativo de 1 a 80 caracteres. Não há campo de inicial separado. |
| `price` | `numeric(10,2)` | Sim | Valor maior ou igual a zero, armazenado como número e nunca como texto formatado. A apresentação em BRL é responsabilidade do aplicativo. |
| `category` | `text` | Sim | Usa `CHECK` com: `streaming`, `musica`, `produtividade`, `saude`, `educacao` e `outros`. Não usar enum PostgreSQL nesta etapa. |
| `service_color` | `text` | Sim | Cor hexadecimal no formato `#RRGGBB`, com padrão `#1B4D3E`. A validação rigorosa do formato pode ser feita no aplicativo; não haverá trigger ou função SQL para isso agora. |
| `next_renewal_date` | `date` | Sim | Próxima data conhecida de renovação, sem horário e sem texto em formato `DD/MM/AAAA`. A apresentação é responsabilidade do aplicativo. |
| `billing_cycle` | `text` | Sim | Usa `CHECK` com: `monthly` e `yearly`. Não implementar cálculo automático nesta etapa. |
| `created_at` | `timestamptz` | Sim | Padrão `now()`. |
| `updated_at` | `timestamptz` | Sim | Padrão `now()`. Não haverá trigger de atualização automática nesta etapa. |

### Campos que não existem no MVP inicial

Não criar os campos abaixo nem outros campos além dos aprovados:

- `card_number`
- `bank_account`
- `bank_connection`
- `payment_history`
- `last_payment_date`
- `paused`
- `shared_with`
- `service_initial`
- `formatted_price`
- `formatted_date`
- `notification_id`
- `deleted_at`
- `description`
- `notes`
- `logo_url`

## Lembretes locais de renovação

- Lembretes não são armazenados na tabela `subscriptions` e não criam colunas, tabelas, políticas ou RLS adicionais.
- O identificador de cada notificação fica somente no AsyncStorage do dispositivo, associado ao `id` da assinatura.
- Esse mapeamento local não é sincronizado pelo Supabase. Ao trocar de aparelho ou limpar os dados do aplicativo, o usuário precisa ativar os lembretes novamente.
- Push remoto, tokens de dispositivo e serviços de envio em nuvem não fazem parte desta etapa.

## Relacionamentos, integridade e índices

### Confirmado remotamente em 06/08/2026

- `public.subscriptions` existe com as colunas `id`, `user_id`, `name`, `price`, `category`, `service_color`, `next_renewal_date`, `billing_cycle`, `created_at` e `updated_at`.
- `subscriptions.user_id` referencia `auth.users(id)`.
- A chave estrangeira usa `ON DELETE CASCADE`.
- A função `public.normalize_subscription_name(text)` existe.
- O índice único `subscriptions_user_normalized_name_key` garante unicidade por `user_id` e nome normalizado. A normalização cobre diferenças de espaços, acentos e capitalização.

### Índices previstos no contrato, sem confirmação remota registrada nesta auditoria

- Índice por proprietário: `user_id`.
- Índice composto para próximas renovações: `user_id, next_renewal_date`.

- O cliente mantém uma validação preventiva de nomes duplicados para uma melhor experiência.
- O banco protege definitivamente contra condições de corrida; a violação de unicidade PostgreSQL `23505` é traduzida no aplicativo para uma mensagem amigável.

## Row Level Security — confirmado remotamente em 06/08/2026

RLS está habilitado em `public.subscriptions`. As políticas confirmadas são destinadas à role `authenticated`; não há política pública de acesso aos dados.

As políticas usam `auth.uid()` para comparar a propriedade da linha:

| Operação | Política confirmada |
| --- | --- |
| `SELECT` | Consultar somente linhas em que `user_id` seja igual a `auth.uid()`. |
| `INSERT` | Inserir somente linhas em que o `user_id` informado seja igual a `auth.uid()`, usando `WITH CHECK`. |
| `UPDATE` | Atualizar somente linhas do próprio usuário com `USING`, e manter `user_id` igual a `auth.uid()` com `WITH CHECK`. |
| `DELETE` | Excluir somente linhas em que `user_id` seja igual a `auth.uid()`. |

Nenhuma política aceita um `user_id` de outro usuário.

## Contrato futuro do aplicativo

O banco usa `snake_case`; o domínio do aplicativo usará `camelCase`. A interface futura, ainda sem arquivo de código, será:

```ts
interface Subscription {
  id: string;
  userId: string;
  name: string;
  price: number;
  category:
    | "streaming"
    | "musica"
    | "produtividade"
    | "saude"
    | "educacao"
    | "outros";
  serviceColor: string;
  nextRenewalDate: string;
  billingCycle: "monthly" | "yearly";
  createdAt: string;
  updatedAt: string;
}
```

Mapeamento de campos:

| Banco | Aplicativo |
| --- | --- |
| `user_id` | `userId` |
| `service_color` | `serviceColor` |
| `next_renewal_date` | `nextRenewalDate` |
| `billing_cycle` | `billingCycle` |
| `created_at` | `createdAt` |
| `updated_at` | `updatedAt` |

Não incluir campos formatados nessa interface de domínio.

## Regras de negócio registradas

- O usuário cadastra a assinatura manualmente.
- O preço é armazenado como número; a moeda exibida é BRL.
- A data é armazenada como `date`.
- A categoria tem fallback visual no aplicativo.
- Somente assinaturas do usuário autenticado entram nos totais.
- A Home consulta e exibe somente as assinaturas do usuário autenticado.
- A renovação automática futura usará `next_renewal_date` e `billing_cycle`.
- A definição dos casos de dia 29, 30 e 31 permanece pendente.
- Nenhuma data será avançada automaticamente nesta etapa.
- Nenhuma integração com cartão ou Open Finance faz parte do MVP.

## Pendências técnicas

- Definir a atualização automática de `updated_at` antes de qualquer automação que dependa desse campo.
- Definir os casos de renovação mensal para os dias 29, 30 e 31 antes de implementar o avanço automático.
