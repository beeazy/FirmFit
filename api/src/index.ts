import express from 'express';
import usersRouter from './routes/users/index';
const port = 3000;


const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', usersRouter)


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