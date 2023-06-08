import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import router from './appRouter.js';
import cors from 'cors';
const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
mongoose.connect(process.env.MY_MONGO_URI)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB error', err));

app.use('/server', router)

// import multer from 'multer';
// import {checkAuth} from './utils/index.js';
// const storage = multer.diskStorage({
//     destination: (_, __, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (_, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({storage});
// app.use('/uploads', express.static('uploads'));

// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`,
//     })
// });
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port ${PORT}`);
});
