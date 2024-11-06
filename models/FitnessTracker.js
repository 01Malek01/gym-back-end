import mongoose from "mongoose";
const FitnessTrackerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  weightLogs: [{ date: Date, weight: Number }], // track weight over time
  workoutLogs: [
    {
      date: Date,
      workoutType: String, // e.g., "Cardio", "Strength"
      durationInMinutes: Number,
    },
  ],
  caloriesBurned: [{ date: Date, calories: Number }],
  createdAt: { type: Date, default: Date.now },
});

const FitnessTracker = mongoose.model("FitnessTracker", FitnessTrackerSchema);
export default FitnessTracker;
