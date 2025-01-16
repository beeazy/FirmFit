import express from 'express';
import usersRouter from './routes/auth/index.js';
import classRoutes from './routes/classes/index.js';
import gymRoutes from './routes/gyms/index.js';
import serverless from 'serverless-http';

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/auth', usersRouter);
app.use('/classes', classRoutes);
app.use('/gym', gymRoutes);


if (process.env.NODE_ENV === 'dev') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

export const handler = serverless(app);