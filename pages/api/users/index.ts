import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { User, IUserModel } from '../../../models/User'
import mongoDBCloud from '../../../database/MongoDBCloud'
import heatUpDB from '../../../database/heatUpDB'

heatUpDB(mongoDBCloud)

const endpoint = nextConnect()

endpoint.get(async (req: NextApiRequest, res: NextApiResponse) => {
    // em development, não use cache; em production, use cache e tente revalidar a cada 60s; deixe cache public nas CDNs da vercel
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate, public')

    try {
        const users = await User.find()

        return res.status(200).json({ sucess: true, qnt: users.length, data: users })
    } catch (error) {
        return res.status(400).json({ sucess: false })
    }
})

export default endpoint