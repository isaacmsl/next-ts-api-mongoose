## Criando aplicação

Inicie um novo projeto Next.js com o comando:

`npx create-next-app next-ts-api-mongoose`

## Configurando Typescript

Instale os pacotes necessários para utilizar o Typescript com:

- `yarn add --dev typescript @types/react @types/node` ou
- `npm install --dev typescript @types/react @types/node`

Crie o arquivo de configuração do Typescript na raiz da aplicação com o comando:

- `touch tsconfig.json`

Depois execute o script de desenvolvimento do Next.js com:

- `yarn dev` ou
- `npm run dev`

Você deve notar que o Next.js gerou o `tsconfig.json` prontinho para você.

## Preparando arquivos

Os seguintes arquivos não são necessários, delete-os, pois.

- `index.js`
- `_app.js`

Vá no diretório `pages/api/` e renomei `hello.js` para `hello.ts`. Pronto.

## Testando simples endpoint

Utilizando o Typescript, inicialmente você vai notar que os parâmetros `req` e `res` estão com *warning*. O Typescript está avisando que os dois parâmetros não possuem tipagem. Para isso, o Next.js nativamente possui os dois tipos para os parâmetros:

- `req` do tipo `NextApiRequest`
- `res` do tipo `NextApiResponse`

Seu arquivo pode se parecer com:

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}

```

Para testar o endpoint, execute:

- `yarn dev` ou
- `npm run dev`

Acesse [http://localhost:3000/api/hello](https://localhost:3000/api/hello)

Você pode obter a resposta como:

```json
{
  "name": "John Doe"
}
```