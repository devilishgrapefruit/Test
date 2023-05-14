import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password').isLength({min: 8}),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный пароль').isLength({min: 8}),
    body('fullName', 'Неверное имя').optional().isByteLength({min:3}),
    body('avatarUrl').optional().isURL(),
];

export const updateValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль слишком слабый').optional().isLength({min: 8}),
    body('fullName', 'Неверное имя').optional().isByteLength({min:3}),
    body('role', 'Такой роли не существует').optional().isString().isUppercase(),
    body('avatarUrl').optional().isURL(),
];