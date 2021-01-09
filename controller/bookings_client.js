const { User } = require("../models/user");
const { Employment } = require("../models/employment");
const { Loan } = require("../models/loan");
const { Bank } = require("../models/bank");
const querystring = require("query-string");
const { encryptor } = require("../services/encryptor");


exports.bookingsCall = async (req, res) => {
  const bookedStatus = req.body.bookedStatus;
  const uniqueID = parseInt(req.body.uniqueID);

  const booked = bookedStatus === "true" ? true : bookedStatus === "false" ? false : null;

  try {
    if (!req.body.uniqueID) return res.status(400).json({ error: "uniqueID not provided" });

    if (booked !== true && booked !== false ) return res.status(403).json({ error: "Invalid booking status" });
    
    if (booked !== true) return res.status(400).json({ error: "You currently do not have any active bookings" });
  
    const userDetails = exports.bookingUserDetails(uniqueID);

    // check if the user already exists in gare finance
    let user =  await User.findOne({ email: userDetails[0].email });
    console.log(user, " the user user from db")

    if (user) {
      const userId = { user_id: user._id}
      if (!user.bvn) return res.status(400).json({ error: "User does not have BVN" });
      // Make a call to Credit Registry to get credit score of the user
      const userAccountDetails = exports.getCreditScore(user.bvn);
      console.log(userAccountDetails)
      const { score } = userAccountDetails[0];
      // Redirect to the client app to enter bank details
      if (score >= 60) return res.json({ score: score, userId: userId });
      // Redirect to the client app to notify the customer they are not eligible
      if (score < 60) return res.status(400).json({ error: "Credit score is poor" });
    } else {
      // If the user does not exist, create a new user account
      let newUser = new User({
        email: userDetails[0].email,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        phoneNumber: userDetails[0].phone,
        password: userDetails[0].firstName + userDetails[0].lastName,
        bvn: userDetails[0].bvn,
      });

      newUser = await newUser.save();

      if (newUser) {
        const userId = { user_id: newUser._id}
        if (!newUser.bvn) return res.status(404).json({ errorr: "User has no BVN" });
        // Make a call to Credit Registry to get credit score of the user
        const userAccountDetails = exports.getCreditScore(newUser.bvn);
        console.log(userAccountDetails, " for the new user")
        const { score } = userAccountDetails[0];
        // Send response to the client application with the score and user ID
        if (score >= 60) return res.json({ score: score, userId: userId });
        // Respond with error message to the client
        if (score < 60) return res.status(400).json({ error: "Credit score is poor" });
      } else {
        return res.status(400).json({ error: "Request failed. Please try again" });
      }
    }

    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// A modelled call to bookings Africa to get user details
exports.bookingUserDetails = (id) => {
  const users = [
    {
      uniqueID: 1,
      firstName: "Matthew",
      lastName: "Onoja",
      email: "matthew@gmail.com",
      phone: "09012345648",
      bvn: 12345678901,
      state: "Lagos",
      city: "Lekki",
      passport: "http://user_passport.png",
      booked: true
    },
    {
      uniqueID: 2,
      firstName: "Lionel",
      lastName: "Moses",
      email: "lionel@gmail.com",
      phone: "09012345678",
      bvn: 12345678902,
      state: "Lagos",
      city: "surulere",
      passport: "http://user_passport.png",
      booked: false
    },
  ]

  const userDetails = users.filter(user => user.uniqueID === id);
  // console.log(userDetails, " from bookings detail controller")
  return userDetails;
}

// A modelled call to creditRegistry to get the credit score of a user
exports.getCreditScore = (bvn) => {
  const users = [
    {
      firstName: "Matthew",
      lastName: "Onoja",
      email: "matthew@gmail.com",
      phone: "09012345678",
      bvn: 12345678901,
      state: "Lagos",
      city: "Lekki",
      score: 100
    },
    {
      firstName: "Lionel",
      lastName: "Moses",
      email: "lionel@gmail.com",
      phone: "09012345678",
      bvn: 12345678902,
      state: "Lagos",
      city: "surulere",
      score: 67
    },
    {
      firstName: "Lionel",
      lastName: "Moses",
      email: "lionel@gmail.com",
      phone: "09012345678",
      bvn: 12345678902,
      state: "Lagos",
      city: "Lekki",
      score: 10
    },
  ];
  const userDetails = users.filter(user => user.bvn === bvn);
  return userDetails;
}