import expressAsyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";

/**
 * @desc    Delete all notifications for the current user
 * @route   DELETE /api/v1/notification/delete-all
 * @access  Private
 */
export const deleteAllNotifications = expressAsyncHandler(async (req, res, next) => {
  const result = await Notification.deleteMany({ user: req.user.id });
  
  res.status(200).json({
    status: 'success',
    message: 'All notifications have been deleted',
    data: {
      deletedCount: result.deletedCount
    }
  });
});

/**
 * @desc    Get all notifications for the current user
 * @route   GET /api/v1/notification/my-notifications
 * @access  Private
 */
export const getMyNotifications = expressAsyncHandler(
  async (req, res, next) => {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(notifications);
  }
);
