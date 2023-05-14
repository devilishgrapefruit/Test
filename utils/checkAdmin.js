import jwt from 'jsonwebtoken';
import { Role } from '../models/Role.js';
import UserModel from '../models/User.js';

export default (req, res, next) => {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        if (token){
            const decoded = jwt.verify(token, 'hash');
            req.userId = decoded._id;
            UserModel.findOne({
                _id: req.userId}).then((user) => {
                    if (!user) {
                        return res.status(404).json({
                            message: 'Пользователь не найден',
                                });
                    }
                    if (user.role !== Role.ADMIN) {
                        return res.status(403).json({
                            message: 'Нет доступа',
                                });
                    }
                    next();
                })
            } 
        }

        