# Excluir conta do SubTrack — Conteúdo da página pública

> **Status:** conteúdo técnico da página pública, ainda sujeito a revisão jurídica. Não cria formulário funcional nem processo automatizado.
>
> **Última atualização do rascunho:** 06/08/2026.

## Como excluir sua conta no aplicativo

1. Abra o SubTrack e entre na sua conta.
2. Acesse **Perfil**.
3. Toque em **Excluir minha conta**.
4. Leia a confirmação e escolha **Excluir permanentemente**.

A confirmação informa que a conta, as assinaturas e os lembretes serão removidos permanentemente. Não há opção de desfazer a ação.

## O que é removido

Após a confirmação remota da exclusão:

- a conta é removida do Supabase Auth;
- as assinaturas associadas à conta são removidas pela relação `ON DELETE CASCADE` documentada para `subscriptions.user_id`;
- a sessão local é encerrada e o estado de autenticação do aplicativo é limpo;
- o aplicativo tenta cancelar os lembretes locais que ele gerencia e remove o mapa local de identificadores de notificações.

O aplicativo confirma primeiro a exclusão remota. Se houver falha excepcional ao cancelar algum lembrete local, a conta continuará excluída e o aplicativo mostrará essa limitação de limpeza local; ele não tenta recriar a conta.

## Importante

- A exclusão é permanente para a conta e os dados principais associados no ambiente do aplicativo.
- O SubTrack não cancela serviços externos, cobranças, contratos ou pagamentos de terceiros. Para isso, contate cada serviço de assinatura diretamente.
- Registros que precisem ser mantidos por obrigação legal ou em backups operacionais poderiam seguir a regra aplicável, caso existam. Este projeto não documenta atualmente retenção específica desse tipo; ela deve ser definida antes da publicação pública.

## Alternativa de solicitação

Se não conseguir acessar o aplicativo, entre em contato pelo canal oficial:

**suporte@subtrackbr.com.br**

O e-mail é um canal de contato e não representa um processo automatizado. [PENDENTE: definir quais informações mínimas serão solicitadas, como a identidade será verificada, o prazo de resposta e como a conclusão será comunicada.] Não inclua senha, token de sessão ou outros segredos no pedido.

## Contato

**E-mail oficial:** suporte@subtrackbr.com.br
