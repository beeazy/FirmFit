import express from 'express';
import usersRouter from './routes/users/index';
import classRoutes from './routes/classes/index';

const port = 3000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', usersRouter);
app.use('/classes', classRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Authentication:
/* 
    POST /auth/login
    POST /auth/register
    User Management:
    GET /users
    POST /users
    Class Management:
    GET /classes
    POST /classes
    PUT /classes/:id
    Booking System:
    GET /bookings
    POST /bookings
    Payments:
    POST /payments
    GET /payments 
*/