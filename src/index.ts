import express from 'express';
import { setReadabilityRoutes } from './routes/rssRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
setReadabilityRoutes(app);

app.get('/health', async (req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});