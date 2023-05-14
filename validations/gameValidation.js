import {body} from 'express-validator';

export const gameCreateValidation = [
    body('name', 'Введите название игры').isLength({min:2}),
    body('cost', 'Введите стоимость игры').isLength({min: 2}).isFloat(),
    body('category', 'Некорректная категория').optional().isObject(),
    body('imageUrl', 'Некорректная ссылка на изображение').optional(),
];
 