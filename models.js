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
  userId: {
    type: Number,
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

const userSchema = {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
};

const schema1 = mongoose.Schema(recipeSchema);
const recipeModel = mongoose.model("Recipes", schema1);

const schema2 = mongoose.Schema(userSchema);
const userModel = mongoose.model("User", schema2);
module.exports = { recipeModel, userModel };
