# Termos de Uso — Rascunho técnico interno

> **Status:** não publicar sem revisão jurídica profissional e sem preencher todos os marcadores `[PENDENTE]`.
>
> **Última atualização do rascunho:** 06/08/2026.

## 1. Objeto do SubTrack

O SubTrack é uma ferramenta de organização para acompanhar assinaturas recorrentes inseridas manualmente pela pessoa usuária. O aplicativo permite registrar dados de assinaturas, visualizar valores e datas de renovação e, quando ativado, receber lembretes locais.

O SubTrack não é uma instituição financeira, não oferece aconselhamento financeiro e não substitui a conferência das condições de cada serviço contratado pela pessoa usuária.

## 2. Conta e responsabilidade pelos dados inseridos

Para usar as funcionalidades autenticadas, a pessoa usuária cria uma conta com e-mail e senha e informa um nome. Ela é responsável pela correção, atualização e legitimidade dos dados de assinaturas que inserir, bem como por manter a confidencialidade de suas credenciais.

O SubTrack não deve ser usado para inserir conteúdo ilícito, dados de terceiros sem autorização ou informações que a pessoa usuária não tenha direito de tratar.

## 3. Sem integração bancária ou pagamentos

No comportamento atual auditado, o SubTrack não possui integração bancária, Open Finance, cartão, leitura de faturas ou intermediação de pagamentos. Preços e datas são informados manualmente pela pessoa usuária para organização pessoal.

O aplicativo não efetua pagamentos, não cancela cobranças e não altera contratos mantidos entre a pessoa usuária e os serviços de assinatura.

## 4. Lembretes

Os lembretes são um recurso auxiliar. No aplicativo móvel, eles podem ser agendados localmente para o dia anterior à data de renovação, às 09:00 no horário local, se a permissão de notificações for concedida.

O recebimento do lembrete pode depender de permissões, configurações do aparelho, sistema operacional, energia, conectividade e outros fatores fora do controle do SubTrack. Por isso, podem ocorrer atrasos, falhas ou ausência de notificação. A pessoa usuária continua responsável por acompanhar suas assinaturas e datas de renovação.

## 5. Uso permitido e proibições

É permitido usar o SubTrack para organizar as próprias assinaturas, de acordo com estes termos e com a legislação aplicável.

Não é permitido:

- tentar acessar conta, dados ou recursos de outra pessoa;
- contornar mecanismos de autenticação, segurança ou limites técnicos;
- utilizar o serviço para atividade ilícita, fraudulenta ou abusiva;
- enviar dados de terceiros sem autorização; ou
- interferir no funcionamento do aplicativo ou da infraestrutura associada.

## 6. Disponibilidade e atualizações

O SubTrack pode receber correções, atualizações ou alterações necessárias para manutenção, segurança e evolução do produto. A disponibilidade pode ser afetada por manutenção, falhas técnicas, conexão do aparelho ou serviços de infraestrutura.

Não há promessa de funcionamento ininterrupto, mas eventuais limitações não afastam direitos que sejam obrigatórios pela legislação aplicável.

## 7. Exclusão de conta

A exclusão pode ser solicitada no aplicativo em **Perfil → Excluir minha conta**. A ação exige confirmação explícita e é permanente para a conta e as assinaturas associadas no ambiente principal do aplicativo.

A exclusão da conta no Supabase Auth remove as assinaturas relacionadas por `ON DELETE CASCADE` documentado no projeto. O aplicativo também tenta cancelar os lembretes locais sob sua gestão, remove o mapa local de identificadores e encerra a sessão.

Para uma futura página pública de instruções, consulte [ACCOUNT_DELETION_PAGE_DRAFT.md](ACCOUNT_DELETION_PAGE_DRAFT.md). [PENDENTE: definir canal público alternativo para solicitação de exclusão.]

## 8. Propriedade intelectual

O código, a marca, os elementos visuais e os conteúdos próprios do SubTrack são protegidos pelas normas aplicáveis. Estes termos não transferem direitos de propriedade intelectual à pessoa usuária além do uso regular do aplicativo.

[PENDENTE: definir titularidade jurídica, licença de uso e política de marca antes da publicação pública.]

## 9. Limitação responsável

O SubTrack é fornecido como ferramenta de organização. Não garante que os dados manualmente inseridos estejam corretos, que uma assinatura seja cancelada automaticamente, que todo lembrete seja entregue ou que terceiros mantenham suas próprias condições comerciais.

Nada nestes termos pretende excluir ou limitar direitos, garantias ou responsabilidades que não possam ser excluídos pela legislação aplicável.

## 10. Privacidade

O tratamento de dados é descrito no rascunho de [Política de Privacidade](PRIVACY_POLICY_DRAFT.md). O SubTrack usa o Supabase como provedor técnico de autenticação, banco de dados e Edge Function; a política pública deverá descrever essa relação de forma compatível com a configuração de produção.

## 11. Alterações e contato

Estes termos poderão ser atualizados quando houver mudanças relevantes no serviço ou na legislação aplicável. A versão pública deverá indicar sua data de atualização e forma de comunicação.

**Contato:** [PENDENTE: definir e-mail público de contato para suporte e assuntos legais.]
