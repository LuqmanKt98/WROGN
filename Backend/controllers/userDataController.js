import { userDataModel } from "../models/UserModel.js";
import bcrypt from  "bcrypt"


// Function to handle user registration
export const postUserData = async (req, res) => {
  try {
    // Extract fullName, email, and password from the request body
    const { fullName, email, password } = req.body;

    console.log("Post Application reached : ", fullName, email, password);

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new instance of userDataModel with the hashed password
    const newUser = new userDataModel({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the newly created user data
    res.json(newUser);
  } catch (error) {
    // Handle any errors during user registration
    console.error("Error saving new applicant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    console.log("email : ",email);

    // Check if the user exists in the database
    const userData = await userDataModel.findOne({ email: email });

    if (!userData) {
      // User not found
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      // Invalid password
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If everything is valid, return the user data
    res.status(200).json(userData);
  } catch (error) {
    // Handle any errors during login
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
