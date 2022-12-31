require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const usersRouter = require('./users/usersRouter');
const reviewsRouter = require('./reviews/reviewsRouter');
const commentsRouter = require('./comments/commentsRouter');
const ratingRouter = require('./rating/ratingRouter');
const uploadRouter = require('./upload/uploadRouter')
const categoryRouter = require('./category/categoryRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
mongoose.connect(process.env.MONGODB_URL);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/comments', commentsRouter);
app.use('/rating', ratingRouter);
app.use('/upload', uploadRouter);
app.use('/categories', categoryRouter);
app.get('/', (req, res) => {
    return res.json({message: 'Server works correctly!'})
});
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
