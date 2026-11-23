import { configDotenv } from 'dotenv';
import { createServer } from 'node:http';
import app from './scr/app.js';
import { connect } from 'mongoose';
import { Server } from 'socket.io';
import { registerChatSocket } from './socket/chatSocket.js';


configDotenv({
  path: './.env',
});

connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log(`Local DB connected successfully`);
  })
  .catch((err) => {
    console.error(`Error Connecting DB: ${err}`);
  });

const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:(origin, callback) => callback(null, true),
    credentials: true,
  }
});

registerChatSocket(io);

httpServer.listen(process.env.PORT, '127.0.0.1', () => {
  console.log(`App Listening on PORT ${process.env.PORT}`);
});
