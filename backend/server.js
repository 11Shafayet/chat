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
const server = app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('user joined room' + room);
  });
});
