import CategoryModel from '../models/Category.js';

export const getAll = async (req, res) => {
    try {
        const categories = await CategoryModel.find().exec();

        res.json(categories);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все категории',
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await CategoryModel.findOne({
            _id: categoryId}).then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Категория не найдена',
                            });
                }
                res.json(category);
            }).catch((error) => {
                console.log(error);
                return res.status(404).json({
                    message: 'Категория не найдена',
                });
            });
            
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить категорию',
        });
    }
}


export const create = async (req, res) => {
    try {
        const doc = new CategoryModel({
            title: req.body.title,
            user: req.userId,

        });

        const category = await doc.save();

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать категорию',
        });
    }
}

export const remove = async(req, res) => {
    try{
        const categoryId = req.params.id;

        await CategoryModel.findOneAndDelete({
            _id: categoryId}).then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Категория не найдена',
                            });
                }
                res.json(category);
            }).catch((err) => {
                console.log(err);
                return res.status(404).json({
                    message: 'Категория не найдена',
                });
            });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить категорию',
        });
    }
}

export const update = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await CategoryModel.updateOne({
            _id: categoryId,
        },
        {
            title: req.body.title,
            user: req.userId,
        }
        );

        res.json({
            success: true,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить категорию',
        });
    }
}
