# Progresso — SubTrack

## Concluído

- [x] Ambiente Windows configurado.
- [x] Projeto Expo criado com TypeScript e Expo Router.
- [x] Expo SDK 54.
- [x] Aplicativo validado no Expo Go em celular Android.
- [x] Template demonstrativo removido.
- [x] Tela inicial mínima exibindo “SubTrack”.
- [x] `npm run lint` executado sem erros.
- [x] `npx tsc --noEmit` executado sem erros.
- [x] Primeiro commit da base limpa realizado.
- [x] Documentação inicial criada.
- [x] Regras permanentes consolidadas no `AGENTS.md`.
- [x] Referências do Figma documentadas.
- [x] Design tokens definidos.
- [x] Design tokens implementados no código.
- [x] AppText e ScreenContainer implementados.
- [x] Button implementado.
- [x] FormField, Input e PasswordInput implementados.
- [x] CategoryBadge e SubscriptionCard implementados.
- [x] FinancialSummaryCard implementado.
- [x] `expo-linear-gradient` instalado para o FinancialSummaryCard.
- [x] HomeHeader, EmptyState e FloatingActionButton implementados.
- [x] BottomNav implementada.
- [x] Home vazia integrada em `app/index.tsx`.
- [x] Primeira tela visual da Home disponível para teste.
- [x] Home com dados integrada visualmente em `app/index.tsx`.
- [x] FinancialSummaryCard, SubscriptionCard e FloatingActionButton integrados na Home com dados.
- [x] BottomNav e estado vazio preservados na Home.
- [x] Validação web disponível nesta etapa.
- [x] Contrato inicial da tabela `subscriptions` documentado.
- [x] Tabela `subscriptions` criada no Supabase, com RLS e políticas aplicadas.
- [x] Auditoria de segurança do Supabase concluída sem alertas.
- [x] Cliente Supabase configurado no aplicativo.
- [x] Variáveis locais do Supabase configuradas e ignoradas pelo Git.
- [x] Autenticação por e-mail e senha com Supabase Auth implementada.
- [x] Sessão persistida, restaurada e observada por mudanças de autenticação.
- [x] Telas de Login e Cadastro implementadas.
- [x] Home protegida para usuários autenticados.
- [x] Nome da Home obtido de `user_metadata.full_name`.
- [x] Confirmação de e-mail desabilitada somente durante os testes.

## Próxima etapa

- [ ] Configurar a fonte Inter após sua instalação ou carregamento aprovados.

## Pendências de aprovação

- PENDENTE: preencher com informação aprovada sobre line heights, sombras e animações.
- PENDENTE: preencher com informação aprovada sobre a tela visual final de Perfil.
- PENDENTE: preencher com informação aprovada sobre campos, validações e dados exibidos nas telas.
- PENDENTE: preencher com informação aprovada sobre indicadores financeiros do dashboard.
- PENDENTE: configurar a fonte Inter após sua instalação ou carregamento aprovados.
- PENDENTE: definir uma adaptação React Native aprovada para o focus ring do Input em Android e iOS.
- PENDENTE: implementar navegação aprovada para o CTA “Adicionar assinatura”.
- PENDENTE: substituir os dados demonstrativos temporários do Figma em `app/index.tsx` por dados do Supabase.
- PENDENTE: implementar navegação aprovada para menu, FAB, cards e barra inferior.
- PENDENTE: validar a Home com dados em Android.
- PENDENTE: definir a atualização automática de `updated_at` antes do CRUD final.
- PENDENTE: definir os casos de renovação mensal para os dias 29, 30 e 31.
- PENDENTE: implementar recuperação de senha.
- PENDENTE: implementar deep link para fluxos de autenticação.
- PENDENTE: implementar login social.
- PENDENTE: implementar logout visual.
- PENDENTE: implementar CRUD de assinaturas.

## Próximas etapas de dados

1. [x] Criar a tabela `subscriptions` e as políticas RLS no Supabase.
2. [x] Configurar variáveis de ambiente do Expo.
3. [x] Instalar e configurar o cliente Supabase.
4. [x] Implementar autenticação.
5. [ ] Criar tipagens e funções de acesso aos dados.
6. [ ] Implementar cadastro de assinatura.
7. [ ] Substituir dados demonstrativos da Home por dados reais.
8. [ ] Implementar edição e exclusão.
9. [ ] Implementar notificações locais.
10. [ ] Implementar posteriormente o avanço automático da renovação.
