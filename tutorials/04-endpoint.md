## Criando endpoint para User

- Em `pages/api/`, delete o endpoint `hello.ts`, pois não precisamos mais dele
- Crie uma pasta `users` em `pages/api/` e depois crie o arquivo `index.ts` dentro
- Crie um novo arquivo chamado `dbConnect.ts` em `database` (`database/dbConnect.ts`)

Importe os módulos necessários em `users/index.ts`:

```ts
import nextConnect from 'next-connect'
import dbConnect from '../../../database/dbConnect'
```

Agora vamos importar nosso modelo com:

```ts
import { User, IUserModel } from '../../../models/User'
```

Vamos criar o nosso *handler* do *endpoint* e definir o uso da conexão com o banco de dados:

```ts
const endpoint = nextConnect()

endpoint.use(dbConnect)
``` 

Agora criaremos o *middleware* para requisiçõs HTTP do tipo GET e por final exportamos o *endpoint*.

```ts
endpoint.get(async (req: RequestDBProps, res: NextApiResponse) => {
    // em development, não use cache; em production, use cache e tente revalidar a cada 60s; deixe o cache public nas CDNs da vercel
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate, public')

    try {
        const users = await User.find()

        return res.status(200).json({ sucess: true, qnt: users.length, data: users })
    } catch (error) {
        return res.status(400).json({ sucess: false })
    }
})

export default endpoint
```

Ou seja, para toda requisição GET, tente pegar todos os User no banco de dados e depois retorne-os como resposta da requisição.

Vamos testar?

Execute:

- `yarn dev` ou
- `npm run dev`

E acesse:

[http://localhost:3000/api/users](http://localhost:3000/api/users)

Caso nenhum erro aconteça, você conseguiu! `mission passed! respect +`