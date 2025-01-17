import 'reflect-metadata';
import express from 'express';
import usersRouter from './routes/auth/index.js';
import classRoutes from './routes/classes/index.js';
import gymRoutes from './routes/gyms/index.js';
import serverless from 'serverless-http';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', usersRouter);
app.use('/classes', classRoutes);
app.use('/gyms', gymRoutes);

if (process.env.NODE_ENV === 'dev') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export const handler = serverless(app);