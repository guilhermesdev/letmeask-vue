![Logo do letmeask](.github/logo.svg)



# ![letmeask](.github/cover.svg)

## O que é o Letmeask?

O Letmeask é uma aplicação web criada para auxiliar criadores de conteúdo a organizar melhor as perguntas em seus vídeos ou lives, por meio de salas que podem ser compartilhadas com sua comunidade.

Este projeto foi desenvolvido durante a **[Next Level Week Together](https://nextlevelweek.com/)**, apresentada dos dias 20 a 27 de Junho de 2021, com base na missão React, embora esta versão tenha sido desenvolvida utilizando o Vue, uma alternativa à biblioteca JavaScript reativa do Facebook

## Tecnologias utilizadas

- [Vue](https://vuejs.org/)
	- [Vue CLI](https://cli.vuejs.org/)
	- [Vue Router](https://router.vuejs.org/)
	- [Vuex](https://vuex.vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [Sass](https://sass-lang.com/) (SCSS)



## Executando o projeto

Primeiramente, crie um novo projeto no [Firebase](https://firebase.google.com/) (basta ter uma conta Google para iniciar).

Clone o projeto e acesse sua respectiva pasta.

```bash
git clone https://github.com/guilhermesdev/letmeask-vue
cd letmeask-vue
```

 Então, crie um arquivo `.env.local` para adicionar suas variáveis de ambiente. O arquivo `.env.example` mostra os nomes das variáveis utilizadas no projeto.

```
VUE_APP_API_KEY=
VUE_APP_AUTH_DOMAIN=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MESSAGING_SENDER_ID=
VUE_APP_APP_ID=
```



Para iniciar o projeto, siga os passos a seguir:

```bash
# Instalar as dependências
yarn

# Iniciar o servidor de desenvolvimento
yarn serve
```

### Deixando o projeto pronto para produção
```bash
yarn build
```
