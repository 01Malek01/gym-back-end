import mongoose from "mongoose";
import app from "./app.js";

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
