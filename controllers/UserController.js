import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find().exec();
        res.json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить всех пользователей',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const userId = req.params.id;

        await UserModel.findOne({
            _id: userId}).then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Пользователь не найден',
                            });
                }
                res.json(user);
            }).catch((error) => {
                console.log(error);
                return res.status(404).json({
                    message: 'Пользователь не найден',
                });
            });
            
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить игру',
        });
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.params.id;

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await UserModel.updateOne({
            _id: userId,
        },
        {
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            role: req.body.role,
            avatarUrl: req.body.avatarUrl,
        }
        );

        res.json({
            success: true,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить пользователя',
        });
    }
}

export const remove = async(req, res) => {
    try{
        const userId = req.params.id;

        await UserModel.findOneAndDelete({
            _id: userId}).then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Пользователь не найден',
                            });
                }
                res.json(user);
            }).catch((err) => {
                console.log(err);
                return res.status(404).json({
                    message: 'Пользователь не найден',
                });
            });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить пользователя',
        });
    }
}


export const register = async (req, res) => {
    try {
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (userExist) {
        res.status(500).json({
            message: 'Данный пользователь уже существует',
        });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        role: req.body.role,
        avatarUrl: req.body.avatarUrl,
    })
    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    }, 
    'hash',
    {
        expiresIn: '30d',
    }
    );

    const {passwordHash, ... userData } = user._doc;

    res.json({
        ... userData, 
        token,
    });

} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось зарегистрироваться',
    });
}

}

export const login = async (req, res) => {
    try{
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 
        'hash',
        {
            expiresIn: '30d',
        }
        );

        const {passwordHash, ... userData } = user._doc;

    res.json({
        ... userData, 
        token,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const {passwordHash, ... userData } = user._doc;

    res.json(userData);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}

