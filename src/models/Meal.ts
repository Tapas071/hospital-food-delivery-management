import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    mealName: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    mealType: {
        type: String,
        enum: ["Morning", "Evening", "Dinner"],
        required: true
    }
    ,
    instructions: {
        type: String,
        required: false,
    },  
})
export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);