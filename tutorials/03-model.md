## Criando model User

- Crie a pasta `models` na raiz da sua aplicação
- Crie um novo arquivo chamado `User.ts` em `models` (`models/User.ts`)

Importe os módulos necessários:

```ts
import mongoose, { Schema } from 'mongoose'
import { ObjectID } from 'mongodb'
```

Primeiro criaremos uma interface que defenindo o que o nosso model possui:

```ts
export interface IUserModel {
    _id: ObjectID;
    name: String;
    created_at: Date;
    updated_at: Date;
}
```

Exportaremos a interface para utilizarmos mais na frente nos endpoints.

Agora criaremos nosso *Schema* de modelo com:

```ts
const UserSchema: Schema<IUserModel> = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    }
}, {
    timestamps: { createdAt: 'created_at' },
    versionKey: false
})
```

Basicamente, criamos um *schema* e definimos o tipo como sendo `IUserModel`. Passamos como parâmetro de opções: `timestamps` para que todo documento inserido tenha o momento de sua criação no campo `created_at`. Por último, não utilizaremos `versionKey` nesse tutorial.

Agora precisamos exportar nosso modelo. Para tal:

```ts
export const User = mongoose.models.User || mongoose.model('User', UserSchema)
```

Em outras palavras: se em tempo de execução já existir um modelo User instanciado, exporte o modelo existente. Se não existir, crie e exporte-o.
