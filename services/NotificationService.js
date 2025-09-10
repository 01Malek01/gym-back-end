import Notification from "../models/Notification.js";
class NotificationService {
  constructor(io) {
    if (!io) {
      throw new Error("Socket.IO instance is required for NotificationService");
    }
    this.io = io;
  }

  /**
   * Send a notification to a user
   * @param {string|ObjectId} userId - The ID of the user to notify
   * @param {string} message - The notification message
   * @param {Object} [metadata={}] - Additional metadata for the notification
   * @returns {Promise<Object>} The created notification
   */
  async sendNotification(userId, message, metadata = {}) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      if (!message) {
        throw new Error("Message is required");
      }

      const notification = await Notification.create({
        user: userId,
        message,
        metadata,
        isRead: false,
      });

      // Emit the notification to the specific user's room
      this.io.to(`${userId}`).emit("newNotification", notification);

      return notification;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  }
}

export default NotificationService;
