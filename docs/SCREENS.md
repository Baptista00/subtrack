# Telas e rotas — SubTrack

## Convenções de rota

- As telas abaixo estão aprovadas para o MVP.
- `/` é a Home e exige sessão autenticada.
- `/adicionar` exige sessão autenticada.
- `/login` e `/cadastro` estão disponíveis somente para usuários não autenticados.
- Enquanto a sessão inicial é restaurada, o aplicativo mostra uma tela de carregamento antes de decidir a rota.


## Login

- Permite login por e-mail e senha.
- Campos: e-mail e senha.
- Validações: e-mail obrigatório com formato simples; senha obrigatória com mínimo de 6 caracteres.
- Exibe erros de validação e autenticação inline.
- Oferece a ação visual para criar uma conta.
- A recuperação de senha não faz parte desta etapa.

## Cadastro

- Permite cadastro por e-mail e senha.
- Campos: nome, e-mail, senha e confirmar senha.
- Validações: nome obrigatório com mínimo de 2 caracteres após trim; e-mail obrigatório com formato simples; senha obrigatória com mínimo de 6 caracteres; confirmação igual à senha.
- Exibe erros inline e a mensagem de confirmação de e-mail quando o Supabase não retornar sessão.
- Oferece a ação visual para entrar em uma conta existente.

## Esqueci minha senha

- Permite a recuperação de senha.
- Fluxo, mensagens e layout: PENDENTE: preencher com informação aprovada.

## Home

- Usa a mesma rota para o estado vazio e o estado com assinaturas.
- Não criar uma tela separada para a Home vazia.
- Consulta somente as assinaturas do usuário autenticado em `public.subscriptions`.
- Possui estados de carregamento, erro, vazio e lista com dados.
- Exibe um resumo com total mensal, assinaturas ativas e renovações dos próximos 30 dias quando houver dados.
- Atualiza a consulta ao receber foco, incluindo após salvar uma assinatura.

## Adicionar assinatura

- Permite adicionar uma assinatura.
- Campos: nome do serviço, categoria, valor, ciclo de cobrança e próxima renovação.
- Categorias: Streaming, Música, Produtividade, Saúde, Educação e Outros.
- Ciclos: Mensal e Anual.
- A próxima renovação é informada como `DD/MM/AAAA` e salva como `YYYY-MM-DD`.
- Exibe um lembrete apenas visual; notificações e persistência desse estado não fazem parte desta etapa.
- Após salvar com sucesso, retorna para a Home.

## Detalhes ou edição de assinatura

- Permite visualizar os dados de uma assinatura e editá-la conforme o fluxo aprovado.
- A definição entre uma tela de detalhes, uma tela de edição ou um fluxo combinado: PENDENTE: preencher com informação aprovada.
- Dados exibidos, campos, validações e layout: PENDENTE: preencher com informação aprovada.

## Dashboard

- Exibe somente os indicadores financeiros aprovados.
- Indicadores, dados apresentados e layout: PENDENTE: preencher com informação aprovada.

## Perfil

- Exibe os dados aprovados e permite logout.
- Dados exibidos e layout: PENDENTE: preencher com informação aprovada.

## Splash e notificações locais

- A splash deve seguir somente a configuração e o design aprovados.
- Não criar onboarding sem aprovação.
- Lembretes locais de renovação não exigem tela própria de configurações no MVP.
- Configuração visual e comportamento dos lembretes: PENDENTE: preencher com informação aprovada.

## Fluxos de navegação

PENDENTE: preencher com informação aprovada.

