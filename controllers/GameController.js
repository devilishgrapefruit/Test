import GameModel from '../models/Game.js';

export const getAll = async (req, res) => {
    try {
        const games = await GameModel.find().populate('user').populate('category').exec();

        res.json(games);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все игры',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const gameId = req.params.id;

        await GameModel.findOne({
            _id: gameId}).then((game) => {
                if (!game) {
                    return res.status(404).json({
                        message: 'Игра не найдена',
                            });
                }
                res.json(game);
            }).catch((error) => {
                console.log(error);
                return res.status(404).json({
                    message: 'Игра не найдена',
                });
            });
            
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить игру',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new GameModel({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const game = await doc.save();

        res.json(game);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать игру',
        });
    }
}

export const remove = async(req, res) => {
    try{
        const gameId = req.params.id;

        await GameModel.findOneAndDelete({
            _id: gameId}).then((game) => {
                if (!game) {
                    return res.status(404).json({
                        message: 'Игра не найдена',
                            });
                }
                res.json(game);
            }).catch((err) => {
                console.log(err);
                return res.status(404).json({
                    message: 'Игра не найдена',
                });
            });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить игру',
        });
    }
}

export const update = async (req, res) => {
    try {
        const gameId = req.params.id;

        await GameModel.updateOne({
            _id: gameId,
        },
        {
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        }
        );

        res.json({
            success: true,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить игру',
        });
    }
}
export const sortByCategory = async(req, res) => {
    try {
        const categoryId = req.params.categoryid;
        await GameModel.find({
            category: categoryId}).then((games) => {
                if (!games) {
                    return res.status(404).json({
                        message: 'Игры не найдены',
                            });
                }
                res.json(games);
            })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить игры',
        });
    }
}
export const addToBasket = async (req, res) => {
    try {
        const gameId = req.params.id;

        await GameModel.findOneAndUpdate({
            _id: gameId,
        },
        {
            $inc: {
                countOnBasket: 1,
            }
        }
        );

        res.json({
            success: true,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить в корзину',
        });
    }
}