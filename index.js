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
const searchRouter = require('./search/searchRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
const commentsController = require("./comments/commentsController");
mongoose.connect(process.env.MONGODB_URL);
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true

}));
app.ws('/comments', (ws, req) => {
    ws.on('message', (msg) => commentsController.messageHandler(ws,msg));
});
app.ws('/comments', commentsRouter);
app.use(express.json());
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/comments', commentsRouter);
app.use('/rating', ratingRouter);
app.use('/upload', uploadRouter);
app.use('/categories', categoryRouter);
app.use('/search', searchRouter);
app.get('/', (req, res) => {
    return res.json({message: 'Server works correctly!'})
});
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
