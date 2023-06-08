import Router from 'express'
const router = Router()
import express from 'express';
import {registerValidation, loginValidation, updateValidation} from './validations/authValidation.js';
import {handleValidationErrors, checkAuth, checkAdmin} from './utils/index.js';
import {gameCreateValidation } from './validations/gameValidation.js';
import {UserController, GameController, CategoryController, OrderController} from './controllers/index.js';


router.get('/users', checkAuth, UserController.getAll);
router.get('/users/:id', checkAuth, UserController.getOne);
router.patch('/users/:id/edit', checkAuth, updateValidation, handleValidationErrors, UserController.update);
router.delete('/users/:id', checkAuth, UserController.remove);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/registration', registerValidation, handleValidationErrors, UserController.register);
router.get('/profile', checkAuth, UserController.getMe);

router.get('/games', GameController.getAll);
router.get('/games/:id', GameController.getOne);
router.post('/games', checkAuth, gameCreateValidation, handleValidationErrors,  GameController.create);
router.patch('/games/:id', checkAuth, gameCreateValidation, handleValidationErrors, GameController.update);
router.delete('/games/:id', checkAuth, checkAdmin, GameController.remove);
router.get('/games/category/:categoryid', GameController.sortByCategory);

router.get('/categories', CategoryController.getAll);
router.get('/categories/:id', CategoryController.getOne);
router.post('/categories', checkAuth, handleValidationErrors, CategoryController.create);
router.patch('/categories/:id', checkAuth, checkAdmin, handleValidationErrors, CategoryController.update);
router.delete('/categories/:id', checkAuth, checkAdmin, CategoryController.remove);

router.get('/basket', checkAuth, OrderController.getAll)
router.delete('/basket/:id', checkAuth, OrderController.remove)
router.post('/basket/:id', checkAuth, OrderController.addToOrder)

router.get('/', function (req, res) {
    res.send('Server is working...');
  })

  import multer from 'multer';
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});
router.use('/uploads', express.static('uploads'));

router.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/server/uploads/${req.file.originalname}`,
    })
});
export default router