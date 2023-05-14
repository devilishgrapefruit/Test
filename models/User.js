import mongoose from 'mongoose';

import {Role} from './Role.js';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String
    }, 
    email: {
        type: String,
        required: true,
        unigue: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: Role.USER,
    },
    avatarUrl: String,
},
{
    timestamps: true,
}
);

export default mongoose.model('User', UserSchema);