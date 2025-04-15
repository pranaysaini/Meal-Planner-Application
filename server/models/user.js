const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  savedRecipes: [{
    recipeId: String,
    title: String,
    image: String
  }],
  mealPlans: [{
    weekStart: Date,
    days: [{
      date: Date,
      meals: [{
        mealType: String, // 'breakfast', 'lunch', 'dinner'
        recipeId: String,
        title: String,
        image: String
      }]
    }]
  }]
}, { timestamps: true });


// Hash password before saving
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);