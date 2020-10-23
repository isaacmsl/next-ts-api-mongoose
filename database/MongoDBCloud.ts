import moongose, { Mongoose } from 'mongoose'
import { MONGO_READY_STATES } from './mongoStates'

export class MongoDBCloud {
    #uri: string;
    #client: Mongoose;

    constructor(uri: string) {
        this.#uri = uri
    }

    async connect() {
        try {
            if (this.isConnected()) {
                return
            }
            
            this.#client = await moongose.connect(this.#uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        } catch (error) {
            return new Error('Não foi possível conectar com o banco de dados.')
        }
        
    }

    isConnected() {
        return this.#client && this.#client.connection.readyState == MONGO_READY_STATES.connected
    }
}

export default new MongoDBCloud(process.env.MONGO_DB_URI)