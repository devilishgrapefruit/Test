import OrderModel from '../models/Order.js';
import GameModel from '../models/Game.js';
export const getAll = async (req, res) => {
    try {
        const games = await OrderModel.find({user: req.userId}).populate('items').exec();

        res.json(games);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все игры из корзины',
        });
    }
}

export const addToOrder = async (req, res) => {
    try {
        const game = await GameModel.findById(req.params.id)
        const flag = await OrderModel.exists({user: req.userId})
        if (!flag) {
            const doc = new OrderModel({
                items: [],
                totalCost: 0,
                user: req.userId,
    
            });
    
            const order = await doc.save();
        } 
        
        const order = await OrderModel.findOneAndUpdate(
            {user: req.userId}, 
            {$push: {items: req.params.id}})

        await order.updateOne({$inc: {totalCost: game.cost}})
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить в заказ',
        });
    }
}

export const remove = async(req, res) => {
    try{
        const game = await GameModel.findById(req.params.id);
        await OrderModel.findOneAndDelete({
            items: game}).then((el) => {
                if (!el) {
                    return res.status(404).json({
                        message: 'Игра не найдена',
                            });
                }
                res.json(el);
            }).catch((err) => {
                console.log(err);
                return res.status(404).json({
                    message: 'Игра не найдена',
                });
            });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить игру из заказа',
        });
    }
}