# Política de Privacidade — Rascunho técnico interno

> **Status:** não publicar sem revisão jurídica profissional e sem preencher todos os marcadores `[PENDENTE]`.
>
> **Última atualização do rascunho:** 06/08/2026.

## 1. Quem é o SubTrack e para que serve

O SubTrack é um aplicativo para organizar e acompanhar assinaturas recorrentes informadas manualmente pela pessoa usuária. Ele permite criar uma conta, registrar assinaturas, consultar valores e datas de renovação e, quando habilitado no aplicativo móvel, agendar lembretes locais.

Esta política descreve o comportamento identificado no código e na documentação técnica do projeto em 06/08/2026. Ela ainda não é uma política pública definitiva.

**Controlador:** [PENDENTE: definir identificação jurídica do responsável pelo SubTrack.]

**Canal oficial de contato:** suporte@subtrackbr.com.br

## 2. Dados tratados

O SubTrack trata os dados abaixo para disponibilizar suas funcionalidades.

| Categoria | Dados | Como são usados |
| --- | --- | --- |
| Conta | endereço de e-mail, nome informado no cadastro, identificador de usuário e senha | criar e autenticar a conta, exibir nome e e-mail no Perfil e viabilizar recuperação de senha. A senha é enviada ao Supabase Auth e não é armazenada nem exibida pelo código do aplicativo. |
| Assinaturas | nome do serviço, preço, categoria, ciclo de cobrança, próxima data de renovação, cor do serviço, identificador da assinatura e timestamps de criação/atualização | registrar, listar, editar, excluir assinaturas e calcular informações exibidas pelo aplicativo. |
| Sessão e recuperação | sessão de autenticação, tokens de acesso/renovação tratados pelo Supabase e estado local de recuperação de senha | manter a sessão, restaurá-la ao abrir o aplicativo e concluir a recuperação de senha. |
| Lembretes locais | identificadores locais de notificações; conteúdo do lembrete com nome, preço e identificador da assinatura | agendar, atualizar e cancelar lembretes locais de renovação no aplicativo móvel. |

O detalhamento de origem, local de armazenamento, retenção e exclusão está em [DATA_INVENTORY.md](DATA_INVENTORY.md).

## 3. Dados que não foram identificados no escopo atual

Na auditoria de código realizada para este rascunho, não foram identificados recursos do SubTrack para coleta de localização, contatos, câmera, microfone, biometria, dados bancários, dados de cartão, pagamentos, Open Finance, leitura de faturas, anúncios ou analytics comportamental.

Também não foi identificado código de push remoto, token de push ou serviço em nuvem para envio de lembretes. Os lembretes implementados são locais ao aparelho. Essa constatação é limitada ao código e às configurações versionadas auditadas; a revisão de SDKs e configurações de produção continua necessária antes de qualquer declaração pública definitiva.

## 4. Como os dados são usados

Os dados são usados para:

- criar e manter a conta de acesso;
- autenticar a pessoa usuária, recuperar senha e proteger as rotas autenticadas;
- associar cada assinatura à respectiva conta;
- exibir, organizar, editar e excluir assinaturas;
- calcular valores mensais e indicar renovações próximas;
- agendar lembretes locais quando a pessoa usuária escolher ativá-los; e
- atender à solicitação de exclusão de conta.

O código auditado não usa os dados das assinaturas para publicidade direcionada, venda de dados ou perfilamento de marketing.

## 5. Autenticação e armazenamento no Supabase

O SubTrack usa o Supabase Auth para cadastro por e-mail e senha, login, recuperação de senha e gerenciamento da conta. Os dados das assinaturas são armazenados na tabela `public.subscriptions` em projeto Supabase, associada ao identificador de autenticação da pessoa usuária.

O aplicativo usa um cliente público do Supabase configurado por variáveis `EXPO_PUBLIC_`. Nenhuma chave administrativa é incluída no aplicativo. A chave administrativa necessária para excluir uma conta existe somente no ambiente server-side da Edge Function `delete-account`.

O Supabase atua como provedor de infraestrutura e operador técnico de autenticação, banco de dados e Edge Function para o SubTrack. Por isso, os dados necessários para essas funções são enviados do aparelho ao Supabase. Isto não significa venda de dados nem compartilhamento para fins de anúncios; a classificação jurídica e a resposta final sobre “compartilhamento” na Google Play dependem de revisão do contrato, da configuração e da definição aplicável da plataforma.

## 6. Sessão, recuperação e dados mantidos no aparelho

O cliente do Supabase está configurado para persistir a sessão no AsyncStorage do aplicativo. O SubTrack também mantém um indicador local de recuperação de senha no AsyncStorage. Os tokens de sessão e os dados temporários de recuperação são usados para autenticação; os prazos exatos de expiração e rotação são definidos pelo serviço de autenticação e não estão documentados neste repositório.

O aplicativo não usa SecureStore no código auditado. [PENDENTE: avaliar e registrar a proteção em repouso aplicável à sessão em cada plataforma antes da publicação pública.]

## 7. Lembretes locais

Quando a pessoa usuária ativa um lembrete ao salvar uma assinatura no aplicativo móvel, o SubTrack solicita a permissão de notificações ao sistema operacional e agenda um lembrete local para o dia anterior à renovação, às 09:00 no horário local. O conteúdo programado pode incluir o nome e o preço da assinatura.

Os identificadores das notificações gerenciadas pelo SubTrack são mantidos em um mapa no AsyncStorage, associado ao identificador da assinatura. Esse mapa não é sincronizado com o Supabase. Na web, o aplicativo não agenda lembretes locais.

## 8. Segurança e transmissão

O SubTrack separa o cliente público usado pelo aplicativo do cliente administrativo usado apenas na Edge Function de exclusão de conta. A Edge Function obtém a identidade exclusivamente pelo JWT enviado no cabeçalho de autorização e exclui apenas o usuário resolvido por esse token.

Medidas técnicas reduzem riscos, mas nenhum sistema pode prometer segurança absoluta. [PENDENTE: confirmar e documentar a evidência de HTTPS/TLS do endpoint Supabase de produção, a configuração remota de autenticação, controles de acesso administrativos e a política de logs/backups do provedor.]

## 9. Retenção

Os dados de conta e assinaturas permanecem no ambiente principal do SubTrack enquanto a conta estiver ativa, salvo exclusão individual de uma assinatura. Os identificadores de lembrete e o estado de sessão permanecem no aparelho conforme a sessão, os lembretes e o armazenamento local existirem.

O código implementa exclusão de conta e limpeza local, mas não documenta prazos de retenção de backups, logs de infraestrutura, registros de segurança ou exigências legais. Portanto, nenhum prazo numérico adicional é afirmado neste rascunho.

## 10. Exclusão de conta

A pessoa usuária pode solicitar a exclusão dentro do aplicativo em **Perfil → Excluir minha conta**. Após a confirmação explícita:

1. o aplicativo chama a Edge Function autenticada `delete-account`;
2. a função valida o JWT e identifica o usuário por `auth.getUser()`;
3. a função exclui somente esse usuário do Supabase Auth;
4. as assinaturas relacionadas são removidas pela relação `subscriptions.user_id` com `ON DELETE CASCADE` documentada no projeto;
5. o aplicativo tenta cancelar os lembretes locais gerenciados pelo SubTrack, remove o mapa de identificadores, limpa a sessão e retorna à tela de Login.

O resultado da exclusão remota é confirmado antes da limpeza local. Se o cancelamento local de algum lembrete falhar, a conta permanece excluída e o aplicativo informa o resultado de forma segura.

O conteúdo da página pública de exclusão está documentado em [ACCOUNT_DELETION_PAGE_DRAFT.md](ACCOUNT_DELETION_PAGE_DRAFT.md) e permanece em revisão.

## 11. Direitos do titular

Dependendo da legislação aplicável, a pessoa titular pode ter direitos de confirmação, acesso, correção, anonimização, bloqueio, eliminação, informação e revisão sobre seus dados. O SubTrack disponibiliza a exclusão de conta no aplicativo.

[PENDENTE: definir procedimento operacional, prazo de resposta e identificação do responsável para solicitações que não possam ser atendidas diretamente no aplicativo.]

## 12. Crianças e adolescentes

O projeto não documenta atualmente uma faixa etária de público, fluxo de consentimento específico ou procedimento de atendimento para crianças e adolescentes.

[PENDENTE: definir política de público, base legal e procedimento para solicitações de responsáveis antes da publicação pública.]

## 13. Alterações desta política

Mudanças relevantes neste documento deverão ser refletidas em versão atualizada da política pública, com nova data de atualização e comunicação adequada no aplicativo ou no canal público definido.

## 14. Contato

Para assuntos de privacidade e direitos do titular: suporte@subtrackbr.com.br.
