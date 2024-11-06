import AppError from "../utils/AppError.js";

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req?.user) return next(new AppError("Not authorized", 401));
    console.log(req.user);
    if (!roles.includes(req?.user?.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
export default restrictTo;