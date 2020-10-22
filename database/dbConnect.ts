import nextConnect from 'next-connect'
import moongose, { Mongoose } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

let mongooseClient : Mongoose

const MONGO_READY_STATES = {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3,
}

async function database(req: NextApiRequest, res: NextApiResponse, next) {
    const isConnected = mongooseClient && mongooseClient.connection.readyState == MONGO_READY_STATES.connected

    if (isConnected) {
        return next()
    }

    mongooseClient = await moongose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware