//external imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//internal imports
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

const app = express();
dotenv.config();
connectDB(); // connecting mongoDB
app.use(express.json()); //to accept json data
app.use(cors());

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

//error message
app.use(notFound);
app.use(errorHandler);

//listening port
app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
