import moongose from 'mongoose'

async function connect() {
    return await moongose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

export default {
    connect
} 