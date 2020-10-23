import { MongoDBCloud } from './MongoDBCloud'

const HOT_DELAY_SECONDS = 120

export default function heatUpDB(mongoDBCloud: MongoDBCloud) {
    try {
        setInterval(async () => {
            await mongoDBCloud.connect()
        }, HOT_DELAY_SECONDS)
    } catch (error) {
        return new Error('Algo inesperado aconteceu com o HeatUpDB')
    }
}