# Site oficial do SubTrack

Esta pasta contém a landing page estática e as páginas legais para futura publicação do
SubTrack. Todo o site usa HTML, CSS e JavaScript puro, sem framework, backend ou
acesso direto ao Supabase.

## Estrutura

```text
site/
├── index.html
├── privacidade.html
├── termos.html
├── exclusao-de-conta.html
├── styles.css
├── script.js
└── assets/
```

## Visualização local

Abra `index.html` diretamente no navegador. Como alternativa, com Python já
disponível, execute dentro da pasta `site/`:

```powershell
python -m http.server 8000
```

Depois, abra no navegador o endereço local informado pelo comando. Nenhuma
instalação adicional é necessária para visualizar os arquivos.

## Publicação futura na Hostinger

Envie **o conteúdo de `site/`** para a pasta `public_html` da hospedagem, mantendo
a mesma estrutura de arquivos e a pasta `assets/`. O domínio preparado para o
site é `subtrackbr.com.br`.

Antes da publicação oficial, atualizar:

- canal oficial de contato;
- revisão jurídica;
- textos legais definitivos;
- link público da Google Play;
- eventuais screenshots finais do aplicativo.

Não coloque neste diretório arquivos `.env`, chaves, tokens, credenciais ou
qualquer outro segredo. O site não precisa dessas informações.
