const mongoose = require("mongoose");
const recipeSchema = {
  id1: {
    type: Number,
  },
  name: {
    type: String,
    requite: [true, "length not more than 20"],
  },
  ingredients: {
    type: Array,
  },
  instructions: {
    type: Array,
  },

  prepTimeMinutes: {
    type: Number,
  },
  cookTimeMinutes: {
    type: Number,
  },
  servings: {
    type: Number,
  },
  difficulty: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  reviewCount: {
    type: Number,
  },
  mealType: {
    type: Array,
  },
};
const schema1 = mongoose.Schema(recipeSchema);
const recipeModel = mongoose.model("Recipes", schema1);

module.exports = recipeModel;
