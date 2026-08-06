# Checklist de publicação — Privacidade, termos e Google Play

> **Status:** checklist técnico interno. Os documentos em `docs/legal/` são rascunhos e exigem revisão jurídica profissional antes de publicação pública.
>
> **Referência da auditoria:** 06/08/2026.

## Implementado e confirmado no projeto

- [x] Exclusão de conta disponível dentro do aplicativo em **Perfil → Excluir minha conta**.
- [x] Exclusão remota realizada por Edge Function `delete-account` autenticada por JWT.
- [x] A Edge Function resolve o usuário pelo JWT e não aceita `userId`, e-mail ou identificador arbitrário do cliente.
- [x] A exclusão usa cliente administrativo somente no ambiente server-side da Edge Function; nenhuma chave administrativa está no aplicativo.
- [x] Assinaturas relacionadas são removidas pela relação documentada `subscriptions.user_id → auth.users(id)` com `ON DELETE CASCADE`.
- [x] O aplicativo tenta cancelar os lembretes locais vinculados, remove o mapa de IDs do AsyncStorage, encerra a sessão e limpa o AuthProvider após a exclusão remota.
- [x] O checklist de QA registra teste aprovado de exclusão segura em 06/08/2026, no SubTrack Dev, em aparelho Android físico e com conta descartável.
- [x] Não há integração bancária, Open Finance, cartão ou intermediação de pagamentos identificada no código e no contrato de dados auditados.
- [x] Não foram identificados no escopo auditado anúncios, analytics comportamental, rastreamento, localização, contatos, câmera, microfone, biometria ou push remoto.

## Pendências obrigatórias antes de publicação pública

- [ ] Obter revisão jurídica profissional da Política de Privacidade, Termos de Uso, página de exclusão e inventário.
- [ ] Definir a identificação jurídica do responsável pelo SubTrack.
- [ ] Escolher um e-mail público de privacidade e suporte; não reutilizar e-mail pessoal sem autorização expressa.
- [ ] Definir procedimento de atendimento aos direitos do titular, verificação de identidade e prazo de resposta.
- [ ] Definir política aplicável a crianças e adolescentes.
- [ ] Publicar a Política de Privacidade em URL pública.
- [ ] Publicar a página externa de solicitação/exclusão de conta em URL pública.
- [ ] Confirmar que as URLs são ativas, públicas, não geobloqueadas e não apontam para PDF.
- [ ] Incluir links da Política de Privacidade e dos Termos de Uso dentro do aplicativo.
- [ ] Incluir instrução clara sobre exclusão de conta no aplicativo e na página pública.
- [ ] Preencher a seção **Segurança dos dados** da Google Play com base em revisão final do [inventário](DATA_INVENTORY.md).
- [ ] Conferir SDKs diretos e transitivos, permissões e configurações remotas antes das respostas definitivas da Play Console.
- [ ] Confirmar tecnicamente HTTPS/TLS do endpoint Supabase de produção e documentar evidência.
- [ ] Confirmar contratos, região, acessos administrativos, logs, backups, retenção e eliminação operacional do Supabase.
- [ ] Configurar SMTP profissional antes de produção e revisar os textos de e-mails de autenticação/recuperação.
- [ ] Definir domínio próprio ou alternativa pública estável para os documentos legais e a página de exclusão.
- [ ] Verificar consistência entre aplicativo, Política, Termos, página de exclusão, documentação técnica e Play Console.
- [ ] Testar em aparelho físico o fluxo publicado de exclusão, incluindo a abertura dos links públicos e o retorno ao Login.

## Artefatos a revisar

- [PRIVACY_POLICY_DRAFT.md](PRIVACY_POLICY_DRAFT.md)
- [TERMS_OF_USE_DRAFT.md](TERMS_OF_USE_DRAFT.md)
- [ACCOUNT_DELETION_PAGE_DRAFT.md](ACCOUNT_DELETION_PAGE_DRAFT.md)
- [DATA_INVENTORY.md](DATA_INVENTORY.md)

## Critério de saída para publicação

Não publicar estes textos enquanto houver marcador `[PENDENTE]`, enquanto não houver revisão jurídica profissional e enquanto a auditoria técnica de configuração/SDKs de produção não estiver registrada. A publicação deve usar uma versão aprovada, datada e acessível publicamente.
