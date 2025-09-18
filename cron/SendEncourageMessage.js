import User from "../models/User.js";
import NotificationService from "../services/NotificationService.js";
import cron from "node-cron";

const sendEncourageMessage = async (io) => {
  const users = await User.find({ membershipStatus: "active" });
  for (const user of users) {
    const message = `Hey ${user.username}, you are doing great! Keep up the good work.`;
    const notificationService = new NotificationService(io);
    await notificationService.sendNotification(user._id, message);
  }
};

// every day at 10:00 AM
cron.schedule("0 10 * * *", async () => {
  await sendEncourageMessage(io);
});

export default sendEncourageMessage;
