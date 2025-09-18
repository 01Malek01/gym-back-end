import asyncHandler from "express-async-handler";
import TrainingLog from "../models/TrainingLog.js";
import AppError from "../utils/AppError.js";

// Create a new training log entry
export const createTrainingLog = asyncHandler(async (req, res, next) => {
  const trainingLog = await TrainingLog.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: trainingLog,
  });
});

// Get all training logs for a user
export const getUserTrainingLogs = asyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    workoutType,
    category,
    startDate,
    endDate,
  } = req.query;

  const query = { user: req.user._id };

  // Add filters
  if (workoutType) query.workoutType = workoutType;
  if (category) query["workouts.category"] = category;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const trainingLogs = await TrainingLog.find(query)
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("user", "username email");

  const total = await TrainingLog.countDocuments(query);

  res.status(200).json({
    status: "success",
    results: trainingLogs.length,
    total,
    data: trainingLogs,
  });
});

// Get a specific training log
export const getTrainingLog = asyncHandler(async (req, res, next) => {
  const trainingLog = await TrainingLog.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("user", "username email");

  if (!trainingLog) {
    return next(new AppError("Training log not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: trainingLog,
  });
});

// Update a training log
export const updateTrainingLog = asyncHandler(async (req, res, next) => {
  const trainingLog = await TrainingLog.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!trainingLog) {
    return next(new AppError("Training log not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: trainingLog,
  });
});

// Delete a training log
export const deleteTrainingLog = asyncHandler(async (req, res, next) => {
  const trainingLog = await TrainingLog.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!trainingLog) {
    return next(new AppError("Training log not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get user's training statistics
export const getTrainingStats = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const stats = await TrainingLog.getUserStats(
    req.user._id,
    startDate,
    endDate
  );

  res.status(200).json({
    status: "success",
    data: stats[0] || {
      totalWorkouts: 0,
      totalVolume: 0,
      totalDuration: 0,
      averageRPE: 0,
      workoutTypes: [],
      totalCalories: 0,
    },
  });
});

// Get workout progress over time
export const getWorkoutProgress = asyncHandler(async (req, res, next) => {
  const { exerciseName, category, days = 30 } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));

  const matchStage = {
    user: req.user._id,
    date: { $gte: startDate },
  };

  if (exerciseName) matchStage["workouts.name"] = new RegExp(exerciseName, "i");
  if (category) matchStage["workouts.category"] = category;

  const progress = await TrainingLog.aggregate([
    { $match: matchStage },
    { $unwind: "$workouts" },
    {
      $match: exerciseName
        ? { "workouts.name": new RegExp(exerciseName, "i") }
        : {},
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          exercise: "$workouts.name",
        },
        maxWeight: { $max: "$workouts.maxWeight" },
        totalVolume: { $sum: "$workouts.totalVolume" },
        totalSets: { $sum: { $size: "$workouts.sets" } },
        averageRPE: { $avg: "$averageRPE" },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: progress,
  });
});

// Get personal records
export const getPersonalRecords = asyncHandler(async (req, res, next) => {
  const personalRecords = await TrainingLog.aggregate([
    { $match: { user: req.user._id } },
    { $unwind: "$workouts" },
    { $unwind: "$workouts.sets" },
    {
      $group: {
        _id: "$workouts.name",
        maxWeight: { $max: "$workouts.sets.weight" },
        maxReps: { $max: "$workouts.sets.reps" },
        maxVolume: {
          $max: { $multiply: ["$workouts.sets.weight", "$workouts.sets.reps"] },
        },
        lastAchieved: { $max: "$date" },
      },
    },
    { $sort: { maxWeight: -1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: personalRecords,
  });
});

// Get workout categories distribution
export const getWorkoutCategories = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const matchStage = { user: req.user._id };
  if (startDate || endDate) {
    matchStage.date = {};
    if (startDate) matchStage.date.$gte = new Date(startDate);
    if (endDate) matchStage.date.$lte = new Date(endDate);
  }

  const categories = await TrainingLog.aggregate([
    { $match: matchStage },
    { $unwind: "$workouts" },
    {
      $group: {
        _id: "$workouts.category",
        count: { $sum: 1 },
        totalVolume: { $sum: "$workouts.totalVolume" },
        averageRPE: { $avg: "$averageRPE" },
      },
    },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

// Get recent workouts
export const getRecentWorkouts = asyncHandler(async (req, res, next) => {
  const { limit = 5 } = req.query;

  const recentWorkouts = await TrainingLog.find({ user: req.user._id })
    .sort({ date: -1 })
    .limit(parseInt(limit))
    .select(
      "date workoutType duration totalVolume averageRPE mood energy workouts.name workouts.category"
    );

  res.status(200).json({
    status: "success",
    data: recentWorkouts,
  });
});

// Get workout summary for a specific date range
export const getWorkoutSummary = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(new AppError("Start date and end date are required", 400));
  }

  const trainingLogs = await TrainingLog.find({
    user: req.user._id,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });

  const summary = trainingLogs.map((log) => log.getWorkoutSummary());

  res.status(200).json({
    status: "success",
    data: summary,
  });
});
