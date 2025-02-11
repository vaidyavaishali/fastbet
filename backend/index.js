// const JWT_SECRET = 'bunneybet'
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const User = require('./models/UserSignUp');
// const bcrypt = require('bcrypt');
// const ScraperRouter = require('./Matka.js');
// const { default: mongoose } = require('mongoose');
// const User_Wallet = require('./models/Wallet.js');
// const jwt = require('jsonwebtoken');
// app.use(express.json()); 
// app.use(
//   cors({
//     origin: "https://www.98fastbet.com", // Front-end origin
//     methods: ['GET', 'POST'], // Allowed methods
//     credentials: true, // Allow cookies or credentials
//   })
// );
// mongoose.connect('mongodb+srv://infusion:oxPmrqHhXOdsBLPk@cluster0.rnz0y.mongodb.net/laxhmibook?retryWrites=true&w=majority&appName=Cluster0')
// .then(() => console.log(" MongoDB Connected Successfully!"))
// .catch(err => console.error(" MongoDB Connection Error:", err));
// // app.use(cors());

// // mongoose.connect('mongodb://localhost:27017/fastbet')
// // .then(() => console.log(" MongoDB Connected Successfully!"))
// // .catch(err => console.error(" MongoDB Connection Error:", err));



// app.get('/api/name/:id', async (req, res) => {
//   const { id } = req.params; // Access the 'id' from the URL parameter

//   try {
//     // Find the user by the provided ID from MongoDB
//     const user = await User.findById(id);
//     const Wallet = await User_Wallet.findOne({ user: id });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Respond with the username
//     res.json({ username: user.username ,walletBalance: Wallet.balance, email:user.email});
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // app.get('/api/name/:id', async (req, res) => {
// //   const { id } = req.params; // Access the 'id' from the URL parameter

// //   try {
// //     // Find the user by the provided ID from MongoDB
// //     const user = await User.findById(id);
// //     const Wallet = await User_Wallet.findOne({ user: id });

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Respond with the username
// //     res.json({ username: user.username ,walletBalance: Wallet.balance});
// //   } catch (error) {
// //     console.error('Error fetching user:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });




// app.post('/api/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Ensure all fields are provided
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     // Create a wallet for the new user
//     const wallet = new User_Wallet({
//       user: savedUser._id,
//       balance: 15000, // Set an initial wallet balance if desired
//     });
//     await wallet.save();

//     // Link the wallet to the user
//     savedUser.wallet = wallet._id;
//     await savedUser.save();
//     // Respond with success
//     res.status(201).json({
//       message: 'User registered successfully',
//       user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     const user = await User.findOne({ username }).populate('wallet');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         walletBalance: user.wallet?.balance || 0,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// app.use('/', ScraperRouter);

// app.listen(4000, () => {
//   console.log('Server started on port 4000');
// });



const JWT_SECRET = 'bunneybet';
const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/UserSignUp');
const bcrypt = require('bcrypt');
const ScraperRouter = require('./Matka.js');
const mongoose = require('mongoose');
const User_Wallet = require('./models/Wallet.js');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const playerRouter = require("./Routes/cricket/playerRoutes");
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "https://fastbetfrontend.vercel.app", // Local frontend
  "https://www.98fastbet.com" // Vercel frontend
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
    credentials: true // Allow cookies/auth headers if needed
  })
);

// app.use(
//   cors({
//     origin: "https://www.98fastbet.com", // Front-end origin
//     methods: ['GET', 'POST'], // Allowed methods
//     credentials: true, // Allow cookies or credentials
//   })
// );

// MongoDB connection
mongoose.connect(process.env.mongodb_url)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Get User and Wallet Info
app.get('/api/name/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user and wallet by ID
    const user = await User.findById(id);
    const wallet = await User_Wallet.findOne({ user: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with username, wallet balance, and email
    res.json({ username: user.username, walletBalance: wallet.balance, email: user.email });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Ensure all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Create a wallet for the new user
    const wallet = new User_Wallet({
      user: savedUser._id,
      balance: 15000, // Set an initial wallet balance if desired
    });
    await wallet.save();

    // Link the wallet to the user
    savedUser.wallet = wallet._id;
    await savedUser.save();

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username }).populate('wallet');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletBalance: user.wallet?.balance || 0,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Scraper Routes
app.use('/', ScraperRouter);
app.use("/", playerRouter)

// Start server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port 4000');
});

