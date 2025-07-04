const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/userAuth')
const protectedRoutes = require('./routes/protected')
const eventRoutes = require('./routes/events');


const app = express();

app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api', protectedRoutes); 
app.use('/api/events', eventRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ msg: err.msg || 'Internal Server Error' });
});

module.exports = app;
