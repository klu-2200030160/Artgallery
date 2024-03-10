const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser'); // Middleware for parsing request data

const app = express();
const port = 5001;

// MongoDB connection URL
const uri = 'mongodb+srv://admin:admin123@cluster2.ses0zhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use bodyParser middleware to parse request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Close the MongoDB connection
async function closeConnection() {
  await client.close();
  console.log('MongoDB connection closed');
}

// Function to insert a new user and redirect to the login page
async function createUserAndRedirect(user, res) {
  try {
    const usersCollection = client.db('rdgallerydb').collection('users');
    const result = await usersCollection.insertOne(user);
    console.log('User added:', result.ops[0]);

    // Redirect to the login page after successful user creation
    res.redirect('/login');
  } catch (err) {
    console.error('Error adding user:', err);
    res.redirect('/signup'); // Redirect back to the signup page on error
  }
}

// Handle GET request for the signup page
app.get('/signup', (req, res) => {
  res.send('Signup Page'); // You can render an HTML form here
});

// Handle POST request for user registration
app.post('/signup', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // Add other user data here
  };

  createUserAndRedirect(newUser, res);
});

// Handle GET request for the login page
app.get('/login', (req, res) => {
  res.send('Login Page'); // You can render an HTML login form here
});

// Start the server and listen on the specified port
(async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();