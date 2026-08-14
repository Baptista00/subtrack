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
- [x] Auditoria somente leitura do Supabase remoto concluída em 06/08/2026: `public.subscriptions`, FK para `auth.users(id)`, `ON DELETE CASCADE`, RLS, políticas para `authenticated`, normalização de nomes e índice de unicidade confirmados.
- [x] Security Advisor remoto revisado: o único aviso relevante era a proteção contra senhas vazadas desabilitada; isso não caracterizava falha de RLS.
- [x] Cliente Supabase configurado no aplicativo.
- [x] Variáveis locais do Supabase configuradas e ignoradas pelo Git.
- [x] Autenticação por e-mail e senha com Supabase Auth implementada.
- [x] Sessão persistida, restaurada e observada por mudanças de autenticação.
- [x] Telas de Login e Cadastro implementadas.
- [x] Home protegida para usuários autenticados.
- [x] Nome da Home obtido de `user_metadata.full_name`.
- [x] Supabase Auth remoto validado: Email Provider e novos cadastros habilitados, confirmação de e-mail habilitada, logins anônimos e linking manual desabilitados e Secure email change habilitado.
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
- [x] Recuperação de senha com Supabase Auth implementada.
- [x] Solicitação de recuperação com mensagem neutra para e-mails cadastrados ou não cadastrados implementada.
- [x] Deep link de recuperação processado com suporte a callbacks por código e por tokens.
- [x] Redefinição de senha com validações inline implementada.
- [x] Sessão temporária de recuperação encerrada após a troca de senha.
- [x] Hardening remoto de senha concluído: `Secure password change` e `Require current password when updating` habilitados.
- [x] Recovery retestado após o hardening em Android físico no SubTrack Dev, com resultado aprovado em 08/08/2026.
- [x] Projeto preparado para a primeira development build com EAS Build.
- [x] `expo-dev-client` instalado para a development build.
- [x] `eas.json` criado com perfis development, preview e production.
- [x] Identificador Android definido como `com.baptista00.subtrack`.
- [x] Identificador iOS reservado como `com.baptista00.subtrack`.
- [x] `expo-notifications` configurado como config plugin mínimo para notificações locais.
- [x] Perfil EAS Production configurado com `environment: production`.
- [x] Variáveis `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` confirmadas no ambiente EAS Production; `APP_VARIANT=development` não está presente.
- [x] Configuração Production confirmada: nome `SubTrack`, scheme `subtrack`, pacote Android e bundle iOS `com.baptista00.subtrack` e versão `1.0.0`.
- [x] Android Keystore gerenciada pelo EAS confirmada; há Build Credentials Default com upload keystore JKS e nenhuma keystore ou senha está no repositório.
- [x] Build Preview existente verificada com versão `1.0.0` e `versionCode` 1; `cli.appVersionSource = remote` e `autoIncrement = true` deixam o próximo contador sob gestão remota do EAS.
- [x] Telas locais de Política de Privacidade e Termos de Uso implementadas com conteúdo tipado e rascunhos explicitamente em revisão.
- [x] Acesso aos documentos legais locais adicionado ao Perfil, Login e Cadastro.
- [x] Versão do aplicativo exibida no Perfil a partir da configuração do Expo.
- [x] Landing, Política de Privacidade, Termos de Uso e página de exclusão publicados em `https://subtrackbr.com.br`, mantendo o aviso de documento em revisão.
- [x] Domínio `subtrackbr.com.br` registrado em 08/08/2026 por um ano.
- [x] Domínio hospedado na Hostinger, com site público e HTTPS ativo.
- [x] Canal oficial `suporte@subtrackbr.com.br` configurado e testado com envio e recebimento.
- [x] Domínio `auth.subtrackbr.com.br` verificado no Resend, com DKIM, SPF e MX verificados.
- [x] SMTP customizado do Supabase configurado com Resend e remetente técnico `no-reply@auth.subtrackbr.com.br`.
- [x] Site URL do Supabase alterada para `https://subtrackbr.com.br`.

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
- PENDENTE: implementar login social.
- PENDENTE: implementar filtros avançados, ordenação manual e paginação na tela Assinaturas.
- PENDENTE: implementar Editar perfil, Notificações, Configurações e alteração de senha; a exclusão de conta já foi concluída.
- PENDENTE: implementar renovação automática de assinaturas.
- PENDENTE: executar QA final de release em Android, iOS e web.
- PENDENTE: gerar o AAB Production; ainda não existe AAB de produção.
- PENDENTE: obter revisão jurídica profissional antes de considerar os documentos legais definitivos.
- PENDENTE: definir a identificação jurídica definitiva do responsável pelo SubTrack.
- PENDENTE: concluir e aprovar os textos legais definitivos; retirar o aviso de documentos em revisão somente após a revisão jurídica aprovada.
- PENDENTE: revisar e aprovar os textos finais dos e-mails de autenticação e recuperação.
- PENDENTE: concluir a conta Google Play Developer e pagar a taxa de US$ 25 somente como etapa final, depois dos demais itens de publicação.

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
