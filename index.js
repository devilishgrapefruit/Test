import express from 'express';
import mongoose from "mongoose"
import {registerValidation, loginValidation, updateValidation} from './validations/authValidation.js';
import {handleValidationErrors, checkAuth, checkAdmin} from './utils/index.js';
import multer from 'multer';
import {gameCreateValidation } from './validations/gameValidation.js';
import {UserController, GameController, CategoryController, OrderController} from './controllers/index.js';
import cors from 'cors';
mongoose.connect('mongodb+srv://admin:saz12345@cluster0.99ojmmf.mongodb.net/shop?retryWrites=true&w=majority')
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));
const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});
app.use('/uploads', express.static('uploads'));

app.get('/users', checkAuth, UserController.getAll);
app.get('/users/:id', checkAuth, UserController.getOne);
app.patch('/users/:id/edit', checkAuth, updateValidation, handleValidationErrors, UserController.update);
app.delete('/users/:id', checkAuth, UserController.remove);
app.post('/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/registration', registerValidation, handleValidationErrors, UserController.register);
app.get('/profile', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/games', GameController.getAll);
app.get('/games/:id', GameController.getOne);
app.post('/games', checkAuth, gameCreateValidation, handleValidationErrors,  GameController.create);
app.patch('/games/:id', checkAuth, gameCreateValidation, handleValidationErrors, GameController.update);
app.delete('/games/:id', checkAuth, checkAdmin, GameController.remove);
app.get('/games/category/:categoryid', GameController.sortByCategory);

app.get('/categories', CategoryController.getAll);
app.get('/categories/:id', CategoryController.getOne);
app.post('/categories', checkAuth, handleValidationErrors, CategoryController.create);
app.patch('/categories/:id', checkAuth, checkAdmin, handleValidationErrors, CategoryController.update);
app.delete('/categories/:id', checkAuth, checkAdmin, CategoryController.remove);

app.get('/basket', checkAuth, OrderController.getAll)
app.delete('/basket/:id', checkAuth, OrderController.remove)
app.post('/basket/:id', checkAuth, OrderController.addToOrder)


app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port ${PORT}`);
});
