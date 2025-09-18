import mongoose from "mongoose";

const trainingLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    workoutType: {
      type: String,
      enum: ["strength", "cardio", "flexibility", "sports", "other"],
      required: true,
    },
    duration: {
      type: Number, // in minutes
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "hard", "extreme"],
      default: "moderate",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    workouts: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        category: {
          type: String,
          enum: [
            "chest",
            "back",
            "shoulders",
            "arms",
            "legs",
            "core",
            "cardio",
            "flexibility",
            "other",
          ],
          required: true,
        },
        sets: [
          {
            setNumber: {
              type: Number,
              required: true,
              min: 1,
            },
            reps: {
              type: Number,
              min: 0,
            },
            weight: {
              type: Number,
              min: 0,
            },
            duration: {
              type: Number, // in seconds for time-based exercises
              min: 0,
            },
            distance: {
              type: Number, // in meters for cardio
              min: 0,
            },
            restTime: {
              type: Number, // in seconds
              min: 0,
            },
            rpe: {
              type: Number, // Rate of Perceived Exertion (1-10)
              min: 1,
              max: 10,
            },
            completed: {
              type: Boolean,
              default: true,
            },
          },
        ],
        totalVolume: {
          type: Number, // calculated: sum of (weight * reps) for all sets
          default: 0,
        },
        maxWeight: {
          type: Number,
          min: 0,
        },
        personalRecord: {
          type: Boolean,
          default: false,
        },
      },
    ],
    totalVolume: {
      type: Number,
      default: 0,
    },
    averageRPE: {
      type: Number,
      min: 1,
      max: 10,
    },
    mood: {
      type: String,
      enum: ["excellent", "good", "okay", "poor", "terrible"],
    },
    energy: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    location: {
      type: String,
      enum: ["gym", "home", "outdoor", "studio", "other"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
trainingLogSchema.index({ user: 1, date: -1 });
trainingLogSchema.index({ user: 1, workoutType: 1 });
trainingLogSchema.index({ "workouts.category": 1 });

// Virtual for workout count
trainingLogSchema.virtual("workoutCount").get(function () {
  return this.workouts.length;
});

// Pre-save middleware to calculate totals
trainingLogSchema.pre("save", function (next) {
  // Calculate total volume for each workout
  this.workouts.forEach((workout) => {
    workout.totalVolume = workout.sets.reduce((total, set) => {
      return total + set.weight * set.reps;
    }, 0);

    // Find max weight
    workout.maxWeight = Math.max(...workout.sets.map((set) => set.weight || 0));
  });

  // Calculate total volume for the entire session
  this.totalVolume = this.workouts.reduce((total, workout) => {
    return total + workout.totalVolume;
  }, 0);

  // Calculate average RPE
  const allRPEs = this.workouts.flatMap((workout) =>
    workout.sets.map((set) => set.rpe).filter((rpe) => rpe)
  );
  if (allRPEs.length > 0) {
    this.averageRPE =
      allRPEs.reduce((sum, rpe) => sum + rpe, 0) / allRPEs.length;
  }

  next();
});

// Static method for analytics
trainingLogSchema.statics.getUserStats = async function (
  userId,
  startDate,
  endDate
) {
  const matchStage = { user: new mongoose.Types.ObjectId(userId) };
  if (startDate || endDate) {
    matchStage.date = {};
    if (startDate) matchStage.date.$gte = new Date(startDate);
    if (endDate) matchStage.date.$lte = new Date(endDate);
  }

  return await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalVolume: { $sum: "$totalVolume" },
        totalDuration: { $sum: "$duration" },
        averageRPE: { $avg: "$averageRPE" },
        workoutTypes: { $addToSet: "$workoutType" },
        totalCalories: { $sum: "$caloriesBurned" },
      },
    },
  ]);
};

// Instance method to get workout summary
trainingLogSchema.methods.getWorkoutSummary = function () {
  return {
    date: this.date,
    workoutType: this.workoutType,
    duration: this.duration,
    totalWorkouts: this.workouts.length,
    totalVolume: this.totalVolume,
    averageRPE: this.averageRPE,
    caloriesBurned: this.caloriesBurned,
    mood: this.mood,
    energy: this.energy,
  };
};

const TrainingLog = mongoose.model("TrainingLog", trainingLogSchema);

export default TrainingLog;
