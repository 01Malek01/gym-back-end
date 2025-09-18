import { body } from "express-validator";

export const createTrainingLogValidation = [
  body("workoutType")
    .isIn(["strength", "cardio", "flexibility", "sports", "other"])
    .withMessage(
      "Workout type must be one of: strength, cardio, flexibility, sports, other"
    ),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number")
    .isFloat({ min: 0 })
    .withMessage("Duration must be positive"),

  body("caloriesBurned")
    .optional()
    .isNumeric()
    .withMessage("Calories burned must be a number")
    .isFloat({ min: 0 })
    .withMessage("Calories burned must be positive"),

  body("difficulty")
    .optional()
    .isIn(["easy", "moderate", "hard", "extreme"])
    .withMessage("Difficulty must be one of: easy, moderate, hard, extreme"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),

  body("mood")
    .optional()
    .isIn(["excellent", "good", "okay", "poor", "terrible"])
    .withMessage("Mood must be one of: excellent, good, okay, poor, terrible"),

  body("energy")
    .optional()
    .isIn(["high", "medium", "low"])
    .withMessage("Energy must be one of: high, medium, low"),

  body("location")
    .optional()
    .isIn(["gym", "home", "outdoor", "studio", "other"])
    .withMessage("Location must be one of: gym, home, outdoor, studio, other"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Each tag must be a string between 1-50 characters"),

  body("workouts")
    .isArray({ min: 1 })
    .withMessage("At least one workout is required"),

  body("workouts.*.name")
    .notEmpty()
    .withMessage("Workout name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Workout name must be between 1-100 characters"),

  body("workouts.*.category")
    .isIn([
      "chest",
      "back",
      "shoulders",
      "arms",
      "legs",
      "core",
      "cardio",
      "flexibility",
      "other",
    ])
    .withMessage(
      "Workout category must be one of: chest, back, shoulders, arms, legs, core, cardio, flexibility, other"
    ),

  body("workouts.*.sets")
    .isArray({ min: 1 })
    .withMessage("At least one set is required for each workout"),

  body("workouts.*.sets.*.setNumber")
    .isInt({ min: 1 })
    .withMessage("Set number must be a positive integer"),

  body("workouts.*.sets.*.reps")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Reps must be a non-negative integer"),

  body("workouts.*.sets.*.weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a non-negative number"),

  body("workouts.*.sets.*.duration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Duration must be a non-negative integer (in seconds)"),

  body("workouts.*.sets.*.distance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Distance must be a non-negative number (in meters)"),

  body("workouts.*.sets.*.restTime")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Rest time must be a non-negative integer (in seconds)"),

  body("workouts.*.sets.*.rpe")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("RPE must be between 1-10"),

  body("workouts.*.sets.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  body("workouts.*.personalRecord")
    .optional()
    .isBoolean()
    .withMessage("Personal record must be a boolean"),
];

export const updateTrainingLogValidation = [
  body("workoutType")
    .optional()
    .isIn(["strength", "cardio", "flexibility", "sports", "other"])
    .withMessage(
      "Workout type must be one of: strength, cardio, flexibility, sports, other"
    ),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number")
    .isFloat({ min: 0 })
    .withMessage("Duration must be positive"),

  body("caloriesBurned")
    .optional()
    .isNumeric()
    .withMessage("Calories burned must be a number")
    .isFloat({ min: 0 })
    .withMessage("Calories burned must be positive"),

  body("difficulty")
    .optional()
    .isIn(["easy", "moderate", "hard", "extreme"])
    .withMessage("Difficulty must be one of: easy, moderate, hard, extreme"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),

  body("mood")
    .optional()
    .isIn(["excellent", "good", "okay", "poor", "terrible"])
    .withMessage("Mood must be one of: excellent, good, okay, poor, terrible"),

  body("energy")
    .optional()
    .isIn(["high", "medium", "low"])
    .withMessage("Energy must be one of: high, medium, low"),

  body("location")
    .optional()
    .isIn(["gym", "home", "outdoor", "studio", "other"])
    .withMessage("Location must be one of: gym, home, outdoor, studio, other"),

  body("tags").optional().isArray().withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Each tag must be a string between 1-50 characters"),

  body("workouts")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one workout is required"),

  body("workouts.*.name")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("Workout name must be between 1-100 characters"),

  body("workouts.*.category")
    .optional()
    .isIn([
      "chest",
      "back",
      "shoulders",
      "arms",
      "legs",
      "core",
      "cardio",
      "flexibility",
      "other",
    ])
    .withMessage(
      "Workout category must be one of: chest, back, shoulders, arms, legs, core, cardio, flexibility, other"
    ),

  body("workouts.*.sets")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one set is required for each workout"),

  body("workouts.*.sets.*.setNumber")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Set number must be a positive integer"),

  body("workouts.*.sets.*.reps")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Reps must be a non-negative integer"),

  body("workouts.*.sets.*.weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a non-negative number"),

  body("workouts.*.sets.*.duration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Duration must be a non-negative integer (in seconds)"),

  body("workouts.*.sets.*.distance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Distance must be a non-negative number (in meters)"),

  body("workouts.*.sets.*.restTime")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Rest time must be a non-negative integer (in seconds)"),

  body("workouts.*.sets.*.rpe")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("RPE must be between 1-10"),

  body("workouts.*.sets.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  body("workouts.*.personalRecord")
    .optional()
    .isBoolean()
    .withMessage("Personal record must be a boolean"),
];
