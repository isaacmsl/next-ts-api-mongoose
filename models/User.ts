import mongoose, { Schema } from 'mongoose'
import { ObjectID } from 'mongodb'

export interface IUserModel {
    _id: ObjectID;
    name: String;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema<IUserModel> = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    }
}, {
    timestamps: { createdAt: 'created_at' },
    versionKey: false
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)