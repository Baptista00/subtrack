export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export const legalLastUpdated = "06/08/2026";

export const privacyPolicySections = [
  {
    title: "Status do documento",
    paragraphs: [
      "Este é um rascunho técnico interno. Não publicar sem revisão jurídica profissional e sem preencher as definições pendentes antes da publicação oficial.",
      "Esta política descreve o comportamento identificado no código e na documentação técnica do projeto em 06/08/2026. Ela ainda não é uma política pública definitiva.",
    ],
  },
  {
    title: "1. Quem é o SubTrack e para que serve",
    paragraphs: [
      "O SubTrack é um aplicativo para organizar e acompanhar assinaturas recorrentes informadas manualmente pela pessoa usuária. Ele permite criar uma conta, registrar assinaturas, consultar valores e datas de renovação e, quando habilitado no aplicativo móvel, agendar lembretes locais.",
      "A identificação jurídica da pessoa responsável pelo SubTrack ainda está em definição antes da publicação oficial.",
      "Canal oficial de contato em definição.",
    ],
  },
  {
    title: "2. Dados tratados",
    paragraphs: [
      "O SubTrack trata os dados abaixo para disponibilizar suas funcionalidades.",
      "O detalhamento de origem, local de armazenamento, retenção e exclusão está no inventário técnico do projeto.",
    ],
    items: [
      "Conta — endereço de e-mail, nome informado no cadastro, identificador de usuário e senha. Esses dados são usados para criar e autenticar a conta, exibir nome e e-mail no Perfil e viabilizar recuperação de senha. A senha é enviada ao Supabase Auth e não é armazenada nem exibida pelo código do aplicativo.",
      "Assinaturas — nome do serviço, preço, categoria, ciclo de cobrança, próxima data de renovação, cor do serviço, identificador da assinatura e timestamps de criação e atualização. Esses dados são usados para registrar, listar, editar e excluir assinaturas e calcular informações exibidas pelo aplicativo.",
      "Sessão e recuperação — sessão de autenticação, tokens de acesso e renovação tratados pelo Supabase e estado local de recuperação de senha. Esses dados são usados para manter a sessão, restaurá-la ao abrir o aplicativo e concluir a recuperação de senha.",
      "Lembretes locais — identificadores locais de notificações e conteúdo do lembrete com nome, preço e identificador da assinatura. Esses dados são usados para agendar, atualizar e cancelar lembretes locais de renovação no aplicativo móvel.",
    ],
  },
  {
    title: "3. Dados que não foram identificados no escopo atual",
    paragraphs: [
      "Na auditoria de código realizada para este rascunho, não foram identificados recursos do SubTrack para coleta de localização, contatos, câmera, microfone, biometria, dados bancários, dados de cartão, pagamentos, Open Finance, leitura de faturas, anúncios ou analytics comportamental.",
      "Também não foi identificado código de push remoto, token de push ou serviço em nuvem para envio de lembretes. Os lembretes implementados são locais ao aparelho. Essa constatação é limitada ao código e às configurações versionadas auditadas; a revisão de SDKs e configurações de produção continua necessária antes de qualquer declaração pública definitiva.",
    ],
  },
  {
    title: "4. Como os dados são usados",
    paragraphs: [
      "Os dados são usados para:",
      "O código auditado não usa os dados das assinaturas para publicidade direcionada, venda de dados ou perfilamento de marketing.",
    ],
    items: [
      "Criar e manter a conta de acesso.",
      "Autenticar a pessoa usuária, recuperar senha e proteger as rotas autenticadas.",
      "Associar cada assinatura à respectiva conta.",
      "Exibir, organizar, editar e excluir assinaturas.",
      "Calcular valores mensais e indicar renovações próximas.",
      "Agendar lembretes locais quando a pessoa usuária escolher ativá-los.",
      "Atender à solicitação de exclusão de conta.",
    ],
  },
  {
    title: "5. Autenticação e armazenamento no Supabase",
    paragraphs: [
      "O SubTrack usa o Supabase Auth para cadastro por e-mail e senha, login, recuperação de senha e gerenciamento da conta. Os dados das assinaturas são armazenados na tabela public.subscriptions em projeto Supabase, associada ao identificador de autenticação da pessoa usuária.",
      "O aplicativo usa um cliente público do Supabase configurado por variáveis EXPO_PUBLIC_. Nenhuma chave administrativa é incluída no aplicativo. A chave administrativa necessária para excluir uma conta existe somente no ambiente server-side da Edge Function delete-account.",
      "O Supabase atua como provedor de infraestrutura e operador técnico de autenticação, banco de dados e Edge Function para o SubTrack. Por isso, os dados necessários para essas funções são enviados do aparelho ao Supabase. Isto não significa venda de dados nem compartilhamento para fins de anúncios; a classificação jurídica e a resposta final sobre compartilhamento na Google Play dependem de revisão do contrato, da configuração e da definição aplicável da plataforma.",
    ],
  },
  {
    title: "6. Sessão, recuperação e dados mantidos no aparelho",
    paragraphs: [
      "O cliente do Supabase está configurado para persistir a sessão no AsyncStorage do aplicativo. O SubTrack também mantém um indicador local de recuperação de senha no AsyncStorage. Os tokens de sessão e os dados temporários de recuperação são usados para autenticação; os prazos exatos de expiração e rotação são definidos pelo serviço de autenticação e não estão documentados neste repositório.",
      "O aplicativo não usa SecureStore no código auditado. A proteção em repouso aplicável à sessão em cada plataforma será avaliada e registrada antes da publicação pública.",
    ],
  },
  {
    title: "7. Lembretes locais",
    paragraphs: [
      "Quando a pessoa usuária ativa um lembrete ao salvar uma assinatura no aplicativo móvel, o SubTrack solicita a permissão de notificações ao sistema operacional e agenda um lembrete local para o dia anterior à renovação, às 09:00 no horário local. O conteúdo programado pode incluir o nome e o preço da assinatura.",
      "Os identificadores das notificações gerenciadas pelo SubTrack são mantidos em um mapa no AsyncStorage, associado ao identificador da assinatura. Esse mapa não é sincronizado com o Supabase. Na web, o aplicativo não agenda lembretes locais.",
    ],
  },
  {
    title: "8. Segurança e transmissão",
    paragraphs: [
      "O SubTrack separa o cliente público usado pelo aplicativo do cliente administrativo usado apenas na Edge Function de exclusão de conta. A Edge Function obtém a identidade exclusivamente pelo JWT enviado no cabeçalho de autorização e exclui apenas o usuário resolvido por esse token.",
      "Medidas técnicas reduzem riscos, mas nenhum sistema pode prometer segurança absoluta. Antes da publicação, ainda é necessário confirmar e documentar a evidência de HTTPS/TLS do endpoint Supabase de produção, a configuração remota de autenticação, os controles de acesso administrativos e a política de logs e backups do provedor.",
    ],
  },
  {
    title: "9. Retenção",
    paragraphs: [
      "Os dados de conta e assinaturas permanecem no ambiente principal do SubTrack enquanto a conta estiver ativa, salvo exclusão individual de uma assinatura. Os identificadores de lembrete e o estado de sessão permanecem no aparelho conforme a sessão, os lembretes e o armazenamento local existirem.",
      "O código implementa exclusão de conta e limpeza local, mas não documenta prazos de retenção de backups, logs de infraestrutura, registros de segurança ou exigências legais. Portanto, nenhum prazo numérico adicional é afirmado neste rascunho.",
    ],
  },
  {
    title: "10. Exclusão de conta",
    paragraphs: [
      "A pessoa usuária pode solicitar a exclusão dentro do aplicativo em Perfil → Excluir minha conta. Após a confirmação explícita:",
      "As instruções para uma futura página pública de exclusão ainda são um rascunho técnico interno.",
    ],
    items: [
      "O aplicativo chama a Edge Function autenticada delete-account.",
      "A função valida o JWT e identifica o usuário por auth.getUser().",
      "A função exclui somente esse usuário do Supabase Auth.",
      "As assinaturas relacionadas são removidas pela relação subscriptions.user_id com ON DELETE CASCADE documentada no projeto.",
      "O aplicativo tenta cancelar os lembretes locais gerenciados pelo SubTrack, remove o mapa de identificadores, limpa a sessão e retorna à tela de Login.",
      "O resultado da exclusão remota é confirmado antes da limpeza local. Se o cancelamento local de algum lembrete falhar, a conta permanece excluída e o aplicativo informa o resultado de forma segura.",
    ],
  },
  {
    title: "11. Direitos do titular",
    paragraphs: [
      "Dependendo da legislação aplicável, a pessoa titular pode ter direitos de confirmação, acesso, correção, anonimização, bloqueio, eliminação, informação e revisão sobre seus dados. O SubTrack disponibiliza a exclusão de conta no aplicativo.",
      "Antes da publicação pública, ainda é necessário definir o procedimento operacional, o prazo de resposta e a identificação da pessoa responsável pelas solicitações que não possam ser atendidas diretamente no aplicativo.",
      "Canal oficial de contato em definição.",
    ],
  },
  {
    title: "12. Crianças e adolescentes",
    paragraphs: [
      "O projeto não documenta atualmente uma faixa etária de público, fluxo de consentimento específico ou procedimento de atendimento para crianças e adolescentes.",
      "Antes da publicação pública, ainda é necessário definir a política de público, a base legal e o procedimento para solicitações de responsáveis.",
    ],
  },
  {
    title: "13. Alterações desta política",
    paragraphs: [
      "Mudanças relevantes neste documento deverão ser refletidas em versão atualizada da política pública, com nova data de atualização e comunicação adequada no aplicativo ou no canal público definido.",
    ],
  },
  {
    title: "14. Contato",
    paragraphs: ["Canal oficial de contato em definição."],
  },
] satisfies LegalSection[];

export const termsOfUseSections = [
  {
    title: "Status do documento",
    paragraphs: [
      "Este é um rascunho técnico interno. Não publicar sem revisão jurídica profissional e sem preencher as definições pendentes antes da publicação oficial.",
    ],
  },
  {
    title: "1. Objeto do SubTrack",
    paragraphs: [
      "O SubTrack é uma ferramenta de organização para acompanhar assinaturas recorrentes inseridas manualmente pela pessoa usuária. O aplicativo permite registrar dados de assinaturas, visualizar valores e datas de renovação e, quando ativado, receber lembretes locais.",
      "O SubTrack não é uma instituição financeira, não oferece aconselhamento financeiro e não substitui a conferência das condições de cada serviço contratado pela pessoa usuária.",
    ],
  },
  {
    title: "2. Conta e responsabilidade pelos dados inseridos",
    paragraphs: [
      "Para usar as funcionalidades autenticadas, a pessoa usuária cria uma conta com e-mail e senha e informa um nome. Ela é responsável pela correção, atualização e legitimidade dos dados de assinaturas que inserir, bem como por manter a confidencialidade de suas credenciais.",
      "O SubTrack não deve ser usado para inserir conteúdo ilícito, dados de terceiros sem autorização ou informações que a pessoa usuária não tenha direito de tratar.",
    ],
  },
  {
    title: "3. Sem integração bancária ou pagamentos",
    paragraphs: [
      "No comportamento atual auditado, o SubTrack não possui integração bancária, Open Finance, cartão, leitura de faturas ou intermediação de pagamentos. Preços e datas são informados manualmente pela pessoa usuária para organização pessoal.",
      "O aplicativo não efetua pagamentos, não cancela cobranças e não altera contratos mantidos entre a pessoa usuária e os serviços de assinatura.",
    ],
  },
  {
    title: "4. Lembretes",
    paragraphs: [
      "Os lembretes são um recurso auxiliar. No aplicativo móvel, eles podem ser agendados localmente para o dia anterior à data de renovação, às 09:00 no horário local, se a permissão de notificações for concedida.",
      "O recebimento do lembrete pode depender de permissões, configurações do aparelho, sistema operacional, energia, conectividade e outros fatores fora do controle do SubTrack. Por isso, podem ocorrer atrasos, falhas ou ausência de notificação. A pessoa usuária continua responsável por acompanhar suas assinaturas e datas de renovação.",
    ],
  },
  {
    title: "5. Uso permitido e proibições",
    paragraphs: ["É permitido usar o SubTrack para organizar as próprias assinaturas, de acordo com estes termos e com a legislação aplicável.", "Não é permitido:"],
    items: [
      "Tentar acessar conta, dados ou recursos de outra pessoa.",
      "Contornar mecanismos de autenticação, segurança ou limites técnicos.",
      "Utilizar o serviço para atividade ilícita, fraudulenta ou abusiva.",
      "Enviar dados de terceiros sem autorização.",
      "Interferir no funcionamento do aplicativo ou da infraestrutura associada.",
    ],
  },
  {
    title: "6. Disponibilidade e atualizações",
    paragraphs: [
      "O SubTrack pode receber correções, atualizações ou alterações necessárias para manutenção, segurança e evolução do produto. A disponibilidade pode ser afetada por manutenção, falhas técnicas, conexão do aparelho ou serviços de infraestrutura.",
      "Não há promessa de funcionamento ininterrupto, mas eventuais limitações não afastam direitos que sejam obrigatórios pela legislação aplicável.",
    ],
  },
  {
    title: "7. Exclusão de conta",
    paragraphs: [
      "A exclusão pode ser solicitada no aplicativo em Perfil → Excluir minha conta. A ação exige confirmação explícita e é permanente para a conta e as assinaturas associadas no ambiente principal do aplicativo.",
      "A exclusão da conta no Supabase Auth remove as assinaturas relacionadas por ON DELETE CASCADE documentado no projeto. O aplicativo também tenta cancelar os lembretes locais sob sua gestão, remove o mapa local de identificadores e encerra a sessão.",
      "As instruções para uma futura página pública de exclusão ainda são um rascunho técnico interno.",
      "Canal oficial de contato em definição.",
    ],
  },
  {
    title: "8. Propriedade intelectual",
    paragraphs: [
      "O código, a marca, os elementos visuais e os conteúdos próprios do SubTrack são protegidos pelas normas aplicáveis. Estes termos não transferem direitos de propriedade intelectual à pessoa usuária além do uso regular do aplicativo.",
      "A titularidade jurídica, a licença de uso e a política de marca ainda precisam ser definidas antes da publicação pública.",
    ],
  },
  {
    title: "9. Limitação responsável",
    paragraphs: [
      "O SubTrack é fornecido como ferramenta de organização. Não garante que os dados manualmente inseridos estejam corretos, que uma assinatura seja cancelada automaticamente, que todo lembrete seja entregue ou que terceiros mantenham suas próprias condições comerciais.",
      "Nada nestes termos pretende excluir ou limitar direitos, garantias ou responsabilidades que não possam ser excluídos pela legislação aplicável.",
    ],
  },
  {
    title: "10. Privacidade",
    paragraphs: [
      "O tratamento de dados é descrito no rascunho de Política de Privacidade. O SubTrack usa o Supabase como provedor técnico de autenticação, banco de dados e Edge Function; a política pública deverá descrever essa relação de forma compatível com a configuração de produção.",
    ],
  },
  {
    title: "11. Alterações e contato",
    paragraphs: [
      "Estes termos poderão ser atualizados quando houver mudanças relevantes no serviço ou na legislação aplicável. A versão pública deverá indicar sua data de atualização e forma de comunicação.",
      "Canal oficial de contato em definição.",
    ],
  },
] satisfies LegalSection[];
