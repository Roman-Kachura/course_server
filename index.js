require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    return res.json({message: 'Server works correctly!'})
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
