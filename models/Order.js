import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
            required: true,
        }
    ],
    totalCost: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
    }
},
{
    timestamps: true,
}
);

export default mongoose.model('Order', OrderSchema);