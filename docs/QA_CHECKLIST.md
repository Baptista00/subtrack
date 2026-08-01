# Checklist de QA pré-build

## Verificações automáticas executadas

- [x] `npm run lint` executado sem erros.
- [x] `npx tsc --noEmit` executado sem erros.
- [x] `npx expo-doctor` executado com 18 de 18 verificações aprovadas.
- [x] `npx expo install --check` confirmou dependências compatíveis com o Expo SDK 54.
- [x] `git diff --check` executado sem erros de espaçamento.

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

## Assinaturas e dados

- [ ] Cadastrar nomes com espaços extras, 80 caracteres e mais de 80 caracteres.
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
