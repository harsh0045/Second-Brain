// userModel.js
import mongoose from 'mongoose';

// Define the schema for the User with firstName, lastName, email, and password
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from the start and end
    },
    lastname: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from the start and end
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique in the database
      lowercase: true, // Converts email to lowercase
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Validates email format
    },
    password: {
      type: String,
      required: true,
      select:false,
      minlength: [6, 'Password must be at least 6 characters long'], // Validates password length
    },
  },
  // lastTokenVersion: { type: Number, default: 0 }, // Token version is used for when we want user to not logedin in multiple device
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the User model using the schema
export const UserModel = mongoose.model('Users', userSchema);

// Export the User model



