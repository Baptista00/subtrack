# Telas e rotas — SubTrack

## Convenções de rota

- As telas abaixo estão aprovadas para o MVP.
- `/` é a Home e exige sessão autenticada.
- `/assinaturas` exige sessão autenticada.
- `/adicionar` exige sessão autenticada.
- `/login`, `/cadastro` e `/esqueci-senha` estão disponíveis somente para usuários sem uma sessão autenticada normal.
- `/redefinir-senha` é uma rota especial de recuperação e permanece registrada enquanto o deep link é processado.
- `/redefinir-senha` não libera as rotas autenticadas até que a senha seja alterada e a sessão temporária seja encerrada.
- Enquanto a sessão inicial é restaurada, o aplicativo mostra uma tela de carregamento antes de decidir a rota.


## Login

- Permite login por e-mail e senha.
- Campos: e-mail e senha.
- Validações: e-mail obrigatório com formato simples; senha obrigatória com mínimo de 6 caracteres.
- Exibe erros de validação e autenticação inline.
- Oferece a ação visual para criar uma conta.
- Oferece a ação visual “Esqueci minha senha?” abaixo do campo Senha e antes da ação Entrar.

## Cadastro

- Permite cadastro por e-mail e senha.
- Campos: nome, e-mail, senha e confirmar senha.
- Validações: nome obrigatório com mínimo de 2 caracteres após trim; e-mail obrigatório com formato simples; senha obrigatória com mínimo de 6 caracteres; confirmação igual à senha.
- Exibe erros inline e a mensagem de confirmação de e-mail quando o Supabase não retornar sessão.
- Oferece a ação visual para entrar em uma conta existente.

## Esqueci minha senha

- Rota: `/esqueci-senha`, disponível sem sessão autenticada normal.
- Possui botão voltar, título “Esqueci minha senha”, descrição orientativa, campo E-mail e ação “Enviar link”.
- Valida e-mail obrigatório, após trim, com formato simples e mensagens inline.
- Durante o envio, bloqueia novos envios e mostra loading no botão.
- Após uma solicitação sem erro técnico, exibe a mensagem neutra “Se existir uma conta com este e-mail, enviaremos um link de recuperação.”, sem informar se o e-mail está cadastrado.
- Em erro técnico ou limite de envio, permanece na tela e mostra uma mensagem amigável inline.
- Oferece a ação “Voltar para o login” sem navegação automática após o envio.

## Redefinir senha

- Rota: `/redefinir-senha`, destinada exclusivamente ao callback de recuperação de senha.
- Processa a URL inicial e URLs recebidas com o aplicativo aberto, aceitando callback por código ou por tokens quando o Supabase confirma o fluxo de recuperação.
- Enquanto o link é validado, exibe “Validando link de recuperação...” com indicador de carregamento.
- Com link válido, exibe o título “Crie uma nova senha”, os campos Nova senha e Confirmar nova senha e a ação “Alterar senha”.
- Valida senha obrigatória com mínimo de 6 caracteres e confirmação igual à nova senha, sempre com mensagens inline.
- Durante a atualização, bloqueia campos e novo envio; em erro, mantém o formulário e exibe a mensagem amigável inline.
- Após o sucesso, encerra a sessão temporária, mostra “Senha alterada com sucesso.” e oferece “Ir para o login”.
- Com link inválido, expirado ou já utilizado, não exibe o formulário; mostra “Link inválido ou expirado” com as ações “Solicitar novo link” e “Voltar para o login”.

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
- O toggle de lembrete agenda uma notificação local para 1 dia antes da renovação, às 09:00 no fuso local do dispositivo.
- A permissão é solicitada somente quando o usuário salva com o lembrete ativado.
- Quando a permissão, a data ou o agendamento impedirem o lembrete, a assinatura continua salva e a tela mostra um aviso inline com a ação “Continuar”.
- Na web, o lembrete não é agendado e a tela informa que ele está disponível apenas no aplicativo móvel.
- Após salvar com sucesso, retorna para a Home.

## Assinaturas

- Rota: `/assinaturas`, disponível somente para usuários autenticados.
- Exibe o cabeçalho “Assinaturas” e o subtítulo “Gerencie seus serviços recorrentes.”.
- Consulta somente as assinaturas do usuário autenticado em `public.subscriptions`, ordenadas pela próxima renovação e, em seguida, pela criação.
- Atualiza a lista ao receber foco, refletindo inclusões, edições e exclusões recentes sem reiniciar o aplicativo.
- Possui busca local por nome, sem diferenciação entre maiúsculas, minúsculas ou acentos, e apresenta o contador de assinaturas ou resultados filtrados.
- Reutiliza os cards de assinatura; ao tocar em um card, abre `/assinatura/[id]` para edição.
- Exibe estados de carregamento, erro com “Tentar novamente”, vazio com CTA de adicionar e busca sem correspondências.
- Mantém o FloatingActionButton para abrir `/adicionar` e a BottomNav com Assinaturas ativa.
- Não possui filtros avançados, ordenação manual, paginação, edição inline ou exclusão pela lista nesta etapa.

## Editar assinatura

- Rota: `/assinatura/[id]`, disponível somente para usuários autenticados.
- É aberta ao tocar em um card de assinatura na Home.
- Carrega somente a assinatura cujo `id` e `user_id` correspondem ao usuário autenticado.
- Enquanto o registro é carregado, exibe o estado “Carregando assinatura...”; caso não seja encontrado ou ocorra erro, exibe uma mensagem segura e a ação “Voltar”.
- Reutiliza o layout e os campos de Adicionar assinatura: nome do serviço, categoria, valor, ciclo de cobrança, próxima renovação e toggle de lembrete funcional.
- Preenche o formulário com os dados atuais, preservando valores em BRL e a data no formato `DD/MM/AAAA`.
- Carrega o estado inicial do lembrete a partir do identificador local associado à assinatura.
- Salva a edição no Supabase, cancela o lembrete anterior e agenda um novo quando o toggle está ativo; se o toggle estiver desligado, mantém o lembrete cancelado.
- Quando o reagendamento não for possível, a atualização no banco permanece válida e a tela mostra um aviso inline com a ação “Continuar”.
- Exibe abaixo de “Salvar alterações” a ação destrutiva “Excluir assinatura”.
- A exclusão exige confirmação explícita antes de remover, é filtrada por `id` e `user_id`, cancela o lembrete local em melhor esforço e retorna para a Home após o sucesso.
- Não há restauração, lixeira ou soft delete nesta etapa.

## Dashboard

- Exibe somente os indicadores financeiros aprovados.
- Indicadores, dados apresentados e layout: PENDENTE: preencher com informação aprovada.

## Perfil

- Rota: `/perfil`, disponível somente para usuários autenticados.
- Exibe um cabeçalho verde com avatar textual central, nome e e-mail do usuário autenticado.
- Nome e e-mail são obtidos diretamente do Supabase Auth, sem consulta a uma tabela `profiles`.
- A seção “CONTA” possui as ações visuais Editar perfil e Notificações; ambas mostram “Em breve” e não abrem novas telas.
- A seção “PREFERÊNCIAS” mostra a moeda fixa `BRL (R$)` e a ação visual Configurações, que também mostra “Em breve”.
- O logout funcional fica abaixo dos cards e exige confirmação explícita; durante o envio, o botão mostra loading e, em caso de falha, a mensagem é exibida inline.
- A BottomNav mantém Perfil ativo e permite navegar para Início e Assinaturas.
- Não há edição de perfil, alteração de senha ou exclusão de conta nesta etapa.

## Splash e notificações locais

- A splash deve seguir somente a configuração e o design aprovados.
- Não criar onboarding sem aprovação.
- Lembretes locais de renovação não exigem tela própria de configurações no MVP.
- Com o aplicativo aberto, a notificação local exibe banner e lista, sem reproduzir som ou alterar o badge.
- O Android usa o canal “Lembretes de assinaturas”; não há notificações recorrentes, push remoto ou navegação ao tocar na notificação.

## Fluxos de navegação

PENDENTE: preencher com informação aprovada.

