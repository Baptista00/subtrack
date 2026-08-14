# Checklist de publicação — Privacidade, termos e Google Play

> **Status:** checklist técnico interno. Os documentos em `docs/legal/` são rascunhos; as páginas públicas permanecem identificadas como documentos em revisão e exigem revisão jurídica profissional antes de serem consideradas definitivas.
>
> **Referência das auditorias e confirmações operacionais:** 06/08/2026, 08/08/2026 e 14/08/2026.

## Implementado e confirmado no projeto

- [x] Exclusão de conta disponível dentro do aplicativo em **Perfil → Excluir minha conta**.
- [x] Exclusão remota realizada por Edge Function `delete-account` autenticada por JWT, auditada remotamente como `ACTIVE` com `verify_jwt: true`.
- [x] A Edge Function resolve o usuário pelo JWT e não aceita `userId`, e-mail ou identificador arbitrário do cliente.
- [x] A exclusão usa cliente administrativo somente no ambiente server-side da Edge Function; nenhuma chave administrativa está no aplicativo.
- [x] Auditoria remota confirmou a relação `subscriptions.user_id → auth.users(id)`, o `ON DELETE CASCADE`, RLS habilitado e políticas de propriedade para `authenticated` em `public.subscriptions`.
- [x] O aplicativo tenta cancelar os lembretes locais vinculados, remove o mapa de IDs do AsyncStorage, encerra a sessão e limpa o AuthProvider após a exclusão remota.
- [x] O checklist de QA registra teste aprovado de exclusão segura em 06/08/2026, no SubTrack Dev, em aparelho Android físico e com conta descartável.
- [x] Não há integração bancária, Open Finance, cartão ou intermediação de pagamentos identificada no código e no contrato de dados auditados.
- [x] Não foram identificados no escopo auditado anúncios, analytics comportamental, rastreamento, localização, contatos, câmera, microfone, biometria ou push remoto.
- [x] Domínio `subtrackbr.com.br` hospedado na Hostinger, com site público disponível em `https://subtrackbr.com.br` e HTTPS ativo.
- [x] Política de Privacidade, Termos de Uso e página de exclusão disponíveis no site público, mantendo o aviso de documento em revisão.
- [x] E-mail oficial `suporte@subtrackbr.com.br` confirmado e testado com envio e recebimento.
- [x] Domínio `auth.subtrackbr.com.br` verificado no Resend, com DKIM, SPF e MX verificados.
- [x] SMTP customizado do Supabase configurado com Resend e remetente técnico `no-reply@auth.subtrackbr.com.br`.
- [x] Site URL do Supabase configurada como `https://subtrackbr.com.br`.
- [x] Links da Política de Privacidade e dos Termos de Uso disponíveis dentro do aplicativo.
- [x] Instrução clara sobre exclusão de conta disponível no aplicativo e na página pública.

## Pendências obrigatórias antes dos textos definitivos e da Google Play

- [ ] Obter revisão jurídica profissional da Política de Privacidade, Termos de Uso, página de exclusão e inventário.
- [ ] Definir a identificação jurídica do responsável pelo SubTrack.
- [ ] Definir procedimento de atendimento aos direitos do titular, verificação de identidade e prazo de resposta.
- [ ] Definir política aplicável a crianças e adolescentes.
- [ ] Confirmar que as URLs são ativas, públicas, não geobloqueadas e não apontam para PDF.
- [ ] Preencher a seção **Segurança dos dados** da Google Play com base em revisão final do [inventário](DATA_INVENTORY.md).
- [ ] Conferir SDKs diretos e transitivos, permissões e configurações remotas antes das respostas definitivas da Play Console.
- [ ] Confirmar tecnicamente HTTPS/TLS do endpoint Supabase de produção e documentar evidência.
- [ ] Confirmar contratos, acessos administrativos, logs, backups, retenção e eliminação operacional do Supabase; a região já foi confirmada na auditoria remota.
- [ ] Revisar e aprovar os textos finais dos e-mails de autenticação e recuperação.
- [ ] Verificar consistência entre aplicativo, Política, Termos, página de exclusão, documentação técnica e Play Console.
- [ ] Testar em aparelho físico o fluxo publicado de exclusão, incluindo a abertura dos links públicos e o retorno ao Login.

## Artefatos a revisar

- [PRIVACY_POLICY_DRAFT.md](PRIVACY_POLICY_DRAFT.md)
- [TERMS_OF_USE_DRAFT.md](TERMS_OF_USE_DRAFT.md)
- [ACCOUNT_DELETION_PAGE_DRAFT.md](ACCOUNT_DELETION_PAGE_DRAFT.md)
- [DATA_INVENTORY.md](DATA_INVENTORY.md)

## Critério de saída para publicação

Não tratar estes textos como definitivos nem remover o aviso de documento em revisão enquanto houver marcador `[PENDENTE]`, enquanto não houver revisão jurídica profissional e enquanto a auditoria técnica de configuração/SDKs de produção não estiver registrada. A versão definitiva deverá ser aprovada, datada e acessível publicamente.
