# PRD — SubTrack

## Identificação

- Produto: SubTrack.
- Tipo: aplicativo mobile para organizar e acompanhar assinaturas recorrentes.
- Idioma e formatação monetária: português do Brasil e valores em BRL.

## Objetivo do produto

Oferecer visibilidade financeira, controle de renovações e organização das assinaturas em um único lugar.

## Público inicial

Pessoas que possuem várias assinaturas digitais e querem controlar os gastos recorrentes.

## Stack do MVP

- React Native.
- Expo SDK 54.
- TypeScript.
- Expo Router.
- Supabase Auth.
- PostgreSQL no Supabase.
- Row Level Security.
- Expo Notifications para notificações locais.
- Git e GitHub.
- Sem backend Node.js ou Express no MVP.

## Escopo funcional do MVP

### Autenticação e sessão

- Cadastro por e-mail e senha.
- Login por e-mail e senha.
- Recuperação de senha.
- Persistência e restauração da sessão.

### Assinaturas

- Adicionar assinatura.
- Listar assinaturas.
- Visualizar os dados de uma assinatura.
- Editar assinatura.
- Excluir assinatura.
- Lembretes locais de renovação.

### Áreas do aplicativo

- Home com estado vazio e estado com assinaturas na mesma rota.
- Dashboard somente com os indicadores financeiros aprovados.
- Perfil com dados aprovados e logout.

## Fora de escopo do MVP

- Dark mode.
- Modo pausado de assinatura.
- Login social.
- Autenticação biométrica.
- Cancelamento automático de serviços.
- Open Finance.
- Leitura de faturas.
- Pagamentos.
- Backend próprio.
- Filtros, gráficos, indicadores, campos, telas ou funcionalidades não aprovados.

## Regras e restrições

- Não inventar requisitos de interface, funcionalidades ou dados.
- Não inferir tabelas, colunas ou tipos de banco de dados; seguir somente `docs/DATABASE_CONTRACT.md`.
- Não criar uma tela separada para a Home vazia.
- Splash somente conforme a configuração e o design aprovados, sem onboarding inventado.
- Notificações locais não exigem uma tela própria de configurações no MVP.

## Decisões pendentes

- PENDENTE: preencher com informação aprovada sobre os campos e as regras de validação de uma assinatura.
- PENDENTE: preencher com informação aprovada sobre os indicadores financeiros do dashboard.
- PENDENTE: preencher com informação aprovada sobre os dados exibidos no perfil.
- PENDENTE: preencher com informação aprovada sobre o contrato de banco de dados, incluindo tabelas, colunas, tipos e políticas.
- PENDENTE: preencher com informação aprovada sobre o design e as especificações do Figma.
- PENDENTE: preencher com informação aprovada sobre critérios de sucesso mensuráveis.

