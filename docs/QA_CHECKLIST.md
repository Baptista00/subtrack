# Checklist de QA pré-build

## Verificações automáticas executadas

- [x] `npm run lint` executado sem erros.
- [x] `npx tsc --noEmit` executado sem erros.
- [x] `npx expo-doctor` executado com 18 de 18 verificações aprovadas.
- [x] `npx expo install --check` confirmou dependências compatíveis com o Expo SDK 54.
- [x] `git diff --check` executado sem erros de espaçamento.

## Development build Android

- [ ] APK gerado com sucesso.
- [ ] APK instalado.
- [ ] Aplicativo abre sem Expo Go.
- [ ] Servidor de desenvolvimento conecta.
- [ ] Autenticação funciona.
- [ ] Sessão persiste.
- [ ] CRUD funciona.
- [x] Notificações locais funcionam.
- [ ] Link de recuperação abre o aplicativo.
- [ ] Senha pode ser redefinida.
- [ ] Login com a nova senha funciona.

### Teste de notificações locais concluído

- [x] Solicitação de permissão de notificações.
- [x] Permissão concedida.
- [x] Agendamento de notificação local.
- [x] Recebimento da notificação com o app fechado.
- [x] Canal Android funcionando.
- [x] Título exibido corretamente.
- [x] Mensagem exibida corretamente.
- [x] Ausência de push remoto.
- [x] Notificação de teste separada das notificações reais.
- [x] Regra oficial preservada:
  - [x] Lembrete um dia antes da renovação.
  - [x] Lembrete às 09:00 no horário local.
  - [x] Edição cancela e reagenda.
  - [x] Exclusão cancela.
  - [x] IDs reais continuam no AsyncStorage.

#### Observação do teste

- Ambiente: SubTrack Dev.
- Plataforma: Android.
- Tipo de teste: notificação local temporária em 1 minuto.
- Resultado: aprovado.
- Data: 05/08/2026.

### Teste de autenticação e assinaturas concluído

#### Autenticação

- [x] Login com senha incorreta mostra erro.
- [x] Login com senha correta funciona.
- [x] Sessão permanece após fechar e abrir o app.
- [x] Logout funciona.
- [x] Recuperação de senha abre o app.
- [x] Redefinição de senha funciona.
- [x] Senha antiga deixa de funcionar.
- [x] Senha nova funciona.
- [x] Sessão temporária de recuperação não libera a Home.

#### CRUD de assinaturas

- [x] Criação de assinatura.
- [x] Exibição na Home.
- [x] Exibição na tela Assinaturas.
- [x] Edição atualiza nome e valor.
- [x] Edição não cria duplicata.
- [x] Exclusão exige confirmação.
- [x] Exclusão remove da Home e da lista.
- [x] Exclusão atualiza o total mensal.

#### Validações

- [x] Nomes duplicados são bloqueados.
- [x] Duplicidade ignora maiúsculas e minúsculas.
- [x] Duplicidade ignora espaços extras.
- [x] Duplicidade ignora acentos.
- [x] Mensagem exibida: “Você já possui uma assinatura com este nome.”

#### Cálculos

- [x] Assinatura mensal usa o valor integral.
- [x] Assinatura anual é dividida por 12.
- [x] Exemplo validado: R$ 1.200,00 anual = R$ 100,00 por mês.
- [x] Total mensal atualiza após criar, editar e excluir.
- [x] Próximas renovações funcionam para datas dentro de 30 dias.

#### Pesquisa

- [x] Pesquisa por nome funciona.
- [x] Pesquisa ignora maiúsculas e minúsculas.
- [x] Pesquisa ignora acentos.
- [x] Limpeza da busca restaura a lista.

#### Observação do teste

- Ambiente: SubTrack Dev.
- Plataforma: Android (aparelho físico).
- Tipo de teste: autenticação e CRUD.
- Resultado: aprovado.
- Data: 05/08/2026.

### Teste de conexão, erros e ações duplicadas concluído

#### Conexão e estados de erro

- [x] Aplicativo abre sem internet sem fechar.
- [x] Tela de abertura encerra normalmente.
- [x] Não ocorre loading infinito.
- [x] Erro ao carregar assinaturas é tratado.
- [x] Tentar novamente funciona após restabelecer a internet.
- [x] Erro ao cadastrar assinatura sem internet é tratado.
- [x] Formulário preserva os dados após falha.
- [x] Nova tentativa funciona após restabelecer a conexão.
- [x] Erro ao editar assinatura sem internet é tratado.
- [x] Dados anteriores permanecem intactos após falha.
- [x] Erro ao excluir assinatura sem internet é tratado.
- [x] Assinatura não desaparece indevidamente.
- [x] Loading encerra após erro.
- [x] Mensagens não exibem detalhes técnicos indevidos.

#### Proteção contra ações duplicadas

- [x] Login não executa duas vezes.
- [x] Cadastro de assinatura não cria duplicatas por toque duplo.
- [x] Edição não executa duas vezes.
- [x] Exclusão não executa duas vezes.
- [x] Recuperação de senha não envia múltiplas solicitações.
- [x] Botões ficam desabilitados durante processamento.
- [x] Não ocorre navegação duplicada.
- [x] Não ocorre loading infinito durante o processamento.

#### Observação do teste

- Ambiente: SubTrack Dev.
- Plataforma: Android (aparelho físico).
- Tipo de teste: conexão, erros e ações duplicadas.
- Resultado: aprovado.
- Data: 05/08/2026.

## Android

- [ ] Abrir o app no Expo Go em aparelho Android e confirmar a splash, a safe area e a orientação vertical.
- [ ] Criar uma conta, entrar, fechar e reabrir o app para validar a restauração da sessão.
- [ ] Validar Home vazia, cadastro de assinatura, Home com dados e total mensal para ciclos mensal e anual.
- [ ] Validar lista de assinaturas, busca com maiúsculas, minúsculas, acentos e espaços no início/fim.
- [ ] Validar edição, confirmação de exclusão, cancelamento da exclusão e atualização das listas ao voltar.
- [ ] Salvar com lembrete ativo, permitir a notificação e confirmar o canal “Lembretes de assinaturas”.
- [ ] Salvar com lembrete ativo e negar a permissão, confirmando que a assinatura continua salva com aviso inline.
- [ ] Editar uma assinatura com lembrete e confirmar que não há duas notificações agendadas.
- [ ] Desativar o lembrete e excluir uma assinatura, verificando o cancelamento em melhor esforço do lembrete local.
- [ ] Abrir os formulários com o teclado e confirmar acesso aos campos finais e aos botões.

## iOS

- [ ] Abrir o app em dispositivo ou simulador iOS e confirmar notch, indicador de início e barra inferior sem sobreposição.
- [ ] Validar login, cadastro, restauração de sessão, logout e bloqueio do retorno pelo histórico após sair.
- [ ] Validar cadastro, edição e exclusão de assinatura com os campos e mensagens inline.
- [ ] Permitir e negar a permissão de lembretes locais em cenários separados, confirmando que negar não bloqueia o salvamento.
- [ ] Confirmar lembrete para uma data futura e verificar o horário local de 09:00 no dia anterior.
- [ ] Validar KeyboardAvoidingView no Login, Cadastro, Adicionar e Editar.

## Web

- [ ] Abrir a versão web e validar Login, Cadastro, Home, Assinaturas, Adicionar, Editar e Perfil.
- [ ] Confirmar que o lembrete apresenta o aviso de disponibilidade apenas no aplicativo móvel e não solicita permissão do navegador.
- [ ] Validar confirmações nativas do navegador para logout e exclusão, inclusive a opção Cancelar.
- [ ] Redimensionar a janela e confirmar que cards, cabeçalhos, botões e BottomNav não se sobrepõem.

## Autenticação e sessão

- [ ] Validar e-mails inválidos, senhas curtas, senhas diferentes e mensagens de autenticação em português.
- [ ] Confirmar a mensagem de verificação de e-mail quando o Supabase não retornar sessão no cadastro.
- [ ] Tentar abrir uma rota protegida sem sessão e confirmar redirecionamento seguro para Login.
- [ ] Fazer logout, cancelar e confirmar em tentativas separadas; confirmar que somente a confirmação remove a sessão.
- [ ] Solicitar recuperação com e-mail válido e confirmar a mensagem neutra de envio.
- [ ] Solicitar recuperação com e-mail não cadastrado e confirmar a mesma mensagem neutra.
- [ ] Informar e-mail inválido na recuperação e confirmar a validação inline.
- [ ] Repetir a solicitação de recuperação e validar o bloqueio durante o envio e a mensagem amigável para rate limit.
- [ ] Abrir um link de recuperação válido com o aplicativo fechado e com o aplicativo já aberto.
- [ ] Abrir um link de recuperação expirado e confirmar as ações para solicitar novo link ou voltar ao login.
- [ ] Reutilizar um link de recuperação já consumido e confirmar que o formulário não é exibido.
- [ ] Informar senhas diferentes na redefinição e confirmar a mensagem inline.
- [ ] Informar nova senha com menos de 6 caracteres e confirmar a mensagem inline.
- [ ] Concluir a troca de senha e confirmar a mensagem de sucesso, o encerramento da sessão temporária e o retorno ao Login.
- [ ] Confirmar que o login com a senha antiga falha após a troca.
- [ ] Confirmar que o login com a nova senha funciona após a troca.
- [ ] Confirmar que a sessão temporária de recuperação não abre a Home antes da troca de senha.

## Assinaturas e dados

- [ ] Cadastrar nomes com espaços extras, 80 caracteres e mais de 80 caracteres.
- [ ] Cadastrar uma assinatura com o nome `Netflix`.
- [ ] Tentar cadastrar uma segunda assinatura com o nome `netflix` e confirmar a mensagem de duplicidade.
- [ ] Tentar cadastrar uma segunda assinatura com o nome `Nétflix` e confirmar a mensagem de duplicidade.
- [ ] Tentar cadastrar uma segunda assinatura com espaços extras no nome e confirmar a mensagem de duplicidade.
- [ ] Tentar renomear outra assinatura para `Netflix` e confirmar a mensagem de duplicidade.
- [ ] Validar valores `55,90`, `1.234,56`, `0`, texto inválido e um toque repetido em Salvar.
- [ ] Validar datas reais, incluindo `31/02` inválida e ano bissexto; confirmar persistência sem deslocamento de fuso.
- [ ] Confirmar que data passada não entra em próximas renovações e que hoje até 30 dias entra no contador.
- [ ] Confirmar os estados de carregamento, erro com “Tentar novamente”, vazio e busca sem resultados.
- [ ] Desconectar a rede durante leitura, cadastro, edição e exclusão para validar mensagens e preservação de dados exibidos.

## Navegação, perfil e acessibilidade

- [ ] Navegar pela BottomNav entre Início, Assinaturas e Perfil e confirmar a aba ativa correta.
- [ ] Confirmar que cards abrem exatamente a assinatura selecionada e que um registro inexistente mostra a ação Voltar.
- [ ] Validar nome, e-mail longo, iniciais do avatar, moeda BRL (R$) e a mensagem “Em breve” no Perfil.
- [ ] Usar leitor de tela para conferir rótulos de campos, erros, FAB, cards, botões, alternador de lembrete e abas.
- [ ] Aumentar a fonte do sistema e confirmar legibilidade, alvos de toque e ausência de sobreposição.
