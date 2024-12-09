import express from 'express';
import { env } from 'process';
import router from './routes/index';

const app = express();
const port = env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on PORT:', port);
});

export default app;