import GoogleUser from '../models/googleUsers.js';

export const addGoogleUserInDb = async (req, res) => {
    console.log('Google User Controller');
    const { name, email } = req.body;

    console.log(email + ' ' + name);

    try {
        // Check if the user already exists
        const existingUser = await GoogleUser.findOne({ email });

        if (existingUser) {
            // If user already exists, you may want to update or handle this case
            return res.status(400).json({ message: 'User already exists' });
        }

        // If the user doesn't exist, create a new user entry
        const newUser = new GoogleUser({
            fullName : name,
            email : email
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding Google user:', error);
        res.status(500).json({ message: 'Error adding Google user' });
    }
};