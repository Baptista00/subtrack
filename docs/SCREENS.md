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

## Editar assinatura

- Rota: `/assinatura/[id]`, disponível somente para usuários autenticados.
- É aberta ao tocar em um card de assinatura na Home.
- Carrega somente a assinatura cujo `id` e `user_id` correspondem ao usuário autenticado.
- Enquanto o registro é carregado, exibe o estado “Carregando assinatura...”; caso não seja encontrado ou ocorra erro, exibe uma mensagem segura e a ação “Voltar”.
- Reutiliza o layout e os campos de Adicionar assinatura: nome do serviço, categoria, valor, ciclo de cobrança, próxima renovação e lembrete apenas visual.
- Preenche o formulário com os dados atuais, preservando valores em BRL e a data no formato `DD/MM/AAAA`.
- Salva a edição no Supabase e retorna para a Home, que atualiza a listagem ao receber foco.
- Exibe abaixo de “Salvar alterações” a ação destrutiva “Excluir assinatura”.
- A exclusão exige confirmação explícita antes de remover, é filtrada por `id` e `user_id` e retorna para a Home após o sucesso.
- Não há restauração, lixeira ou soft delete nesta etapa.

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

