# Regras permanentes — SubTrack

## Plataforma e ambiente

- O projeto é React Native com Expo SDK 54, TypeScript e Expo Router.
- O ambiente de desenvolvimento é Windows, usando PowerShell.
- Usar `npm`; não usar Yarn ou pnpm.
- O aplicativo foi testado em um celular Android com Expo Go.
- Antes de escrever código, ler a documentação exata do Expo SDK 54: https://docs.expo.dev/versions/v54.0.0/.

## Produto, design e arquitetura

- Seguir exclusivamente o PRD, os documentos do projeto e o Figma aprovados.
- Se algo estiver ambíguo ou ainda estiver marcado como pendente, perguntar antes de assumir.
- Não inventar telas, campos, filtros, indicadores ou funcionalidades.
- Não implementar dark mode.
- Não implementar modo pausado de assinatura.
- Usar apenas design tokens aprovados; não inventar cores, tipografia ou espaçamentos.
- Reutilizar componentes existentes antes de criar novos.
- Não alterar a arquitetura sem aprovação.
- Trabalhar em uma etapa pequena por vez.

## Dados e integrações

- Supabase será usado para autenticação e banco de dados.
- Não adicionar backend Node.js ou Express no MVP.
- Não inferir tabelas, colunas ou tipos do banco de dados; seguir apenas `docs/DATABASE_CONTRACT.md`.

## Dependências, validação e Git

- Não instalar dependências sem antes explicar a necessidade e aguardar aprovação.
- Após alterações de código, executar `npm run lint` e `npx tsc --noEmit`.
- Não fazer commits automaticamente.
- Ao sugerir mensagens de commit, usar o padrão Conventional Commits com descrição em português.
- Ao concluir uma etapa, apresentar um resumo dos arquivos criados, modificados e removidos.
