import express from 'express';
import cors from 'cors';
import { CONFIGS } from './config.js';

const app = express();
app.use(cors({
    origin: CONFIGS.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send('sample response send here');
})

app.listen(CONFIGS.PORT, () => {
    console.log(`Server is Running http://localhost:${CONFIGS.PORT}`);
})
