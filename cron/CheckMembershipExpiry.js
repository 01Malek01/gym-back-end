import cron from "node-cron";
import User from "../models/User.js";
import NotificationService from "../services/NotificationService.js";

let notificationService;

const initializeNotificationService = (io) => {
  notificationService = new NotificationService(io);
};

/**
 * Check for memberships that will expire soon (within 5 days)
 */
const checkExpiringMemberships = async (io) => {
  try {
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

    const membersAboutToExpire = await User.find({
      membershipExpirationDate: {
        $gt: new Date(),
        $lte: fiveDaysFromNow,
      },
      membershipStatus: "active",
      expiryNotificationSent: { $ne: true },
    });

    await Promise.all(
      membersAboutToExpire.map(async (member) => {
        const daysRemaining = Math.ceil(
          (member.membershipExpirationDate - new Date()) / (1000 * 60 * 60 * 24)
        );

        await notificationService.sendNotification(
          member._id,
          `Your membership will expire in ${daysRemaining} day${
            daysRemaining === 1 ? "" : "s"
          }.`,
          io
        );

        // Mark as notified to prevent duplicate notifications
        member.expiryNotificationSent = true;
        await member.save();
      })
    );
  } catch (error) {
    console.error("Error checking expiring memberships:", error);
  }
};

/**
 * Check for and handle expired memberships
 */
const checkExpiredMemberships = async (io) => {
  try {
    const expiredMembers = await User.find({
      membershipExpirationDate: { $lte: new Date() },
      membershipStatus: "active",
    });

    await Promise.all(
      expiredMembers.map(async (member) => {
        // Send expiration notification
        await notificationService.sendNotification(
          member._id,
          "Your membership has expired. Please renew to continue using our services.",
          io
        );

        // Update membership status to expired
        member.membershipStatus = "expired";
        member.expiryNotificationSent = true;
        await member.save({ validateBeforeSave: false });
      })
    );
  } catch (error) {
    console.error("Error checking expired memberships:", error);
  }
};

/**
 * Initialize the membership expiry checks
 */
const checkMembershipExpiry = (io) => {
  // Initialize notification service with the provided io instance
  initializeNotificationService(io);

  // Initial check on startup
  checkExpiringMemberships(io);
  checkExpiredMemberships(io);

  // Schedule regular checks
  cron.schedule("0 * * * *", async () => {
    await checkExpiringMemberships(io);
    await checkExpiredMemberships(io);
  });
};

export default checkMembershipExpiry;
