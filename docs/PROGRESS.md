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
- [x] Tela Adicionar assinatura implementada.
- [x] Insert real de assinaturas no Supabase implementado.
- [x] Rota de Adicionar assinatura protegida para usuários autenticados.
- [x] FAB e CTA do estado vazio ligados à tela Adicionar assinatura.
- [x] Lembrete de renovação exibido somente como elemento visual.
- [x] Home integrada com as assinaturas reais de `public.subscriptions`.
- [x] Dados demonstrativos removidos da Home e listagem real implementada.
- [x] Estados de carregamento, erro e vazio implementados na Home.
- [x] Refetch da Home implementado ao retornar da tela de cadastro.
- [x] Total mensal calculado com planos anuais convertidos por divisão por 12.
- [x] Renovações próximas definidas como os próximos 30 dias, incluindo hoje.
- [x] Edição de assinatura implementada.
- [x] Card da Home abre a tela de edição da assinatura selecionada.
- [x] Tela de edição carrega somente registro pertencente ao usuário autenticado.
- [x] Update real de assinaturas no Supabase implementado.
- [x] Home atualiza a listagem ao retornar da edição.
- [x] Exclusão de assinatura implementada.
- [x] Confirmação destrutiva obrigatória antes da exclusão.
- [x] Delete filtrado por `id` e `user_id` implementado.
- [x] Home atualiza a listagem ao retornar da exclusão.
- [x] Exclusão definitiva implementada sem restauração ou lixeira.
- [x] Tela Perfil implementada.
- [x] BottomNav navega entre Home e Perfil.
- [x] Nome e e-mail do Perfil obtidos do Supabase Auth.
- [x] Avatar textual por iniciais implementado.
- [x] Logout com confirmação implementado.
- [x] Após logout, a proteção de rotas retorna ao Login.
- [x] Tela Perfil ajustada conforme a referência visual.
- [x] Moeda do Perfil permanece fixa em BRL.
- [x] Logout funcional preservado após o ajuste visual.
- [x] Tela Assinaturas implementada.
- [x] BottomNav totalmente navegável entre Início, Assinaturas e Perfil.
- [x] Listagem real das assinaturas do usuário na tela Assinaturas.
- [x] Pesquisa local de assinaturas por nome.
- [x] Estados de carregamento, erro, vazio e sem resultados na tela Assinaturas.
- [x] Cadastro e edição acessíveis pela tela Assinaturas.
- [x] Lembretes locais de renovação implementados com `expo-notifications`.
- [x] Notificação local agendada para 1 dia antes da renovação, às 09:00 no fuso local.
- [x] Permissão de notificações solicitada somente ao salvar com lembrete ativado.
- [x] Identificadores de lembrete armazenados localmente por assinatura.
- [x] Edição cancela e reagenda o lembrete local.
- [x] Exclusão cancela o lembrete local em melhor esforço.
- [x] Web não agenda lembretes locais.
- [x] Lembretes implementados sem push remoto, tokens ou serviço em nuvem.
- [x] Auditoria técnica pré-build realizada.
- [x] Proteção definitiva contra assinaturas duplicadas implementada no banco por usuário e nome normalizado.
- [x] Tratamento da violação de unicidade PostgreSQL `23505` implementado com mensagem amigável no cadastro e na edição.
- [x] Recarga concorrente da Home, acessibilidade de campos, safe area, teclado e bloqueio de envios concorrentes corrigidos.
- [x] Consultas de assinaturas restringidas aos campos consumidos pela interface, mantendo o filtro explícito por `user_id` e a proteção por RLS.
- [x] Validações automáticas da auditoria executadas: lint, TypeScript, Expo Doctor, compatibilidade de dependências e verificação de diff.

## Próxima etapa

- [ ] Configurar a fonte Inter após sua instalação ou carregamento aprovados.

## Pendências de aprovação

- PENDENTE: preencher com informação aprovada sobre line heights, sombras e animações.
- PENDENTE: preencher com informação aprovada sobre campos, validações e dados exibidos nas telas.
- PENDENTE: preencher com informação aprovada sobre indicadores financeiros do dashboard.
- PENDENTE: configurar a fonte Inter após sua instalação ou carregamento aprovados.
- PENDENTE: definir uma adaptação React Native aprovada para o focus ring do Input em Android e iOS.
- PENDENTE: validar a Home com dados em Android.
- PENDENTE: definir a atualização automática de `updated_at` antes do CRUD final.
- PENDENTE: definir os casos de renovação mensal para os dias 29, 30 e 31.
- PENDENTE: implementar recuperação de senha.
- PENDENTE: implementar deep link para fluxos de autenticação.
- PENDENTE: implementar login social.
- PENDENTE: implementar filtros avançados, ordenação manual e paginação na tela Assinaturas.
- PENDENTE: implementar Editar perfil, Notificações, Configurações, alteração de senha e exclusão de conta.
- PENDENTE: implementar renovação automática de assinaturas.
- PENDENTE: executar o checklist manual pré-build em Android, iOS e web.
- PENDENTE: preparar e gerar os builds finais para Android e iOS após definição dos identificadores e credenciais.

## Próximas etapas de dados

1. [x] Criar a tabela `subscriptions` e as políticas RLS no Supabase.
2. [x] Configurar variáveis de ambiente do Expo.
3. [x] Instalar e configurar o cliente Supabase.
4. [x] Implementar autenticação.
5. [x] Criar tipagens e funções de acesso aos dados.
6. [x] Implementar cadastro de assinatura.
7. [x] Substituir dados demonstrativos da Home por dados reais.
8. [x] Implementar exclusão.
9. [x] Implementar notificações locais.
10. [ ] Implementar posteriormente o avanço automático da renovação.
