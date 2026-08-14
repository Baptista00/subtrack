# Site oficial do SubTrack

Esta pasta contém a landing page estática e as páginas legais publicadas do SubTrack.
Todo o site usa HTML, CSS e JavaScript puro, sem framework, backend ou acesso direto
ao Supabase.

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

## Publicação na Hostinger

O site está publicado em `https://subtrackbr.com.br` com HTTPS. Para futuras
atualizações, envie **o conteúdo de `site/`** para a pasta `public_html` da Hostinger,
mantendo a mesma estrutura de arquivos e a pasta `assets/`.

O canal oficial de contato é `suporte@subtrackbr.com.br`.

Antes da publicação oficial, atualizar:

- revisão jurídica;
- textos legais definitivos;
- link público da Google Play;
- eventuais screenshots finais do aplicativo.

Não coloque neste diretório arquivos `.env`, chaves, tokens, credenciais ou
qualquer outro segredo. O site não precisa dessas informações.
