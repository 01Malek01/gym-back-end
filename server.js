import mongoose from "mongoose";
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import handelSocketConnection from "./SocketEvents.js";
import checkMembershipExpiry from "./cron/CheckMembershipExpiry.js";
import sendEncourageMessageCron from "./cron/SendEncourageMessage.js";
//Each gym has it's own db for more scalability
const connectToGymDB = (gymId) => {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster.mongodb.net/${gymId}`;
  const connection = mongoose.connect(uri);
  return connection;
};

const db = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    credentials: true,
  },
});

// Initialize socket.io
handelSocketConnection(io);

// Start the server
server.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  // Initialize membership expiry checks with the io instance
  checkMembershipExpiry(io);
  sendEncourageMessageCron(io);
});
