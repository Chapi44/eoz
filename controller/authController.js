const { StatusCodes } = require("http-status-codes" );
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const baseURL = process.env.BASE_URL;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const baseURL1 = process.env.BASE_URL1;
const Stripe = require("stripe");
const TransactionHistory = require('../model/transactionHistory');
const Payment = require("../model/amount");
const cron = require("node-cron");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});


const register = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      username,
      bio,
      pictures,
      profession,
      phoneNumber,
      role,
      type,
      organazationnumber,
      employeetype
    } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email already exists" });
    }

    const organizationNumberExists = await User.findOne({ organazationnumber });
    if (organizationNumberExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Organization number already exists" });
    }

    if (!username) username = null;
    if (!bio) bio = "";
    if (!profession) profession = "";

    // Determine if adminId should be attached
    let adminId = null;
    if (req.user && req.user.role === 'admin') {
      adminId = req.adminId; // Attach the admin ID if the registering user is an admin
    }

    // Create the user with adminId attached if applicable
    const user = await User.create({
      name,
      email,
      password,
      role,
      username,
      bio,
      pictures,
      profession,
      phoneNumber,
      organazationnumber,
      type,
      employeetype,
      adminId
    });

    const secretKey = process.env.JWT_SECRET;
    const tokenExpiration = process.env.JWT_LIFETIME;

    if (!secretKey || !tokenExpiration) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "JWT secret key or expiration is not configured.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        adminId: req.adminId || null, // Pass adminId into token if available
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully registered",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};




const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const secretKey = process.env.JWT_SECRET;
  const tokenExpiration = process.env.JWT_LIFETIME;

  if (!secretKey || !tokenExpiration) {
    return res.status(500).json({ message: "JWT secret key or token expiration not configured" });
  }

  // Generate JWT with user.adminId from the database
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
      bio: user.bio,
      pictures: user.pictures,
      profession: user.profession,
      type: user.type,
      adminId: user.adminId || null, // Use user.adminId from database
    },
    secretKey,
    { expiresIn: tokenExpiration }
  );

  res.status(StatusCodes.OK).json({
    token,
    user
  });
};





const signinWithEmail = async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist and name is provided, register a new user
    if (!user && name) {
      // Create a new user with name and email
      user = new User({
        name,
        email
      });
      await user.save();
    } else if (!user && !name) {
      return res.status(400).json({ message: "User not registered, please provide a name" });
    }

    // Use the secret key and token expiration from environment variables
    const secretKey = process.env.JWT_SECRET;
    const tokenExpiration = process.env.JWT_LIFETIME;

    if (!secretKey || !tokenExpiration) {
      return res.status(500).json({ message: "JWT secret key or token expiration not configured" });
    }

    // Generate a JSON Web Token (JWT) with specific user fields
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        bio: user.bio,
        pictures: user.pictures,
        profession: user.profession // Include profession field in the token payload
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );

    res.status(StatusCodes.OK).json({
      token
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};


// Logout endpoint
const logout = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    // Extract the token value from the 'Bearer ' string
    const authToken = token.split(' ')[1];

    // Add any necessary validation here (e.g., token format, signature verification)

    // Respond with a success message
    return res.status(StatusCodes.OK).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    var email = req.body.email;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User Not found");
      return res.status(404).json({ error: "User Not found" });
    }

    console.log("forget password");
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "enterct35i@gmail.com",
        pass: "eivj sueg qdqg zmsl",
      },
    });
    const forgotPasswordToken = jwt.sign(
      { userEmail: email },
      "Wintu-Yoni@2022",
      {
        expiresIn: "1h",
      }
    );

    // var forgotPasswordLink =
    //   "http://localhost:3000/login/?token=" + forgotPasswordToken;
    console.log("hello", email);
    if (email) {
      console.log(email);

      var forgotPasswordLink = `http://localhost:5173/?token=${forgotPasswordToken}`;
      var mailOptions = {
        from: "Saradaplay.in@gmail.com",
        to: email,
        subject: "Reset Password",
        html:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
          '<html xmlns="http://www.w3.org/1999/xhtml"><head>' +
          '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
          "<title>Forgot Password</title>" +
          "<style> body {background-color: #FFFFFF; padding: 0; margin: 0;}</style></head>" +
          '<body style="background-color: #FFFFFF; padding: 0; margin: 0;">' +
          '<table style="max-width: 650px; background-color: #2F6296; color: #ffffff;" id="bodyTable">' +
          '<tr><td align="center" valign="top">' +
          '<table id="emailContainer" style="font-family: Arial; color: #FFFFFF; text-align: center; background-color: #FFFFFF;">' +
          '<tr><td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-bottom: 10px;">' +
          "</td></tr><tr>" +
          '<td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #FFFFFF; padding: 20px 0 10px 0;">' +
          '<span style="font-size: 24px; font-weight: normal;color: #121481">FORGOT PASSWORD</span></td></tr><tr>' +
          '<td align="left" valign="top" colspan="2" style="padding-top: 10px;">' +
          '<span style="font-size: 18px; line-height: 1.5; color: #333333;">' +
          " We have sent you this email in response to your request to reset your password on <a href='https://sarada.vercel.app/'>Sarada app</a><br/><br/>" +
          'To reset your password for, please follow the link below: <button style="font:inherit; cursor: pointer; border: #272727 2px solid; background-color: transparent; border-radius: 5px;"><a href="' +
          forgotPasswordLink +
          '"style="color: #272727; text-decoration: none;">Reset Password</a></button><br/><br/>' +
          "We recommend that you keep your password secure and not share it with anyone.If you didn't request to this message, simply ignore this message.<br/><br/>" +
          "Sarada Management System </span> </td> </tr> </table> </td> </tr> </table> </body></html>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({
            ErrorMessage: error,
          });
        } else {
          console.log("succcesssss");
          return res.json({
            SuccessMessage: "email successfully sent!",
          });
        }
      });
    } else {
      return res.json({
        ErrorMessage: "Email can't be none!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const ResetPassword = async (req, res) => {
  console.log(req.body);
  try {
    const { newPassword, email } = req.body;
    console.log(newPassword, email);
    const encreptedPassword = await bcrypt.hash(newPassword, 10);
    console.log(encreptedPassword);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Use the updateOne method with async/await
    const result = await User.updateOne(
      { email: email },
      { $set: { password: encreptedPassword } }
    );
    console.log(result);

    // Check the result and handle it accordingly
    if (result.modifiedCount === 1) {
      return res.json({ message: "Password reset successful" });
    } else {
      return res
        .status(404)
        .json({ message: "User not found or password not modified" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const registercompanyowner = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const role = "admin";
    const emailAlreadyExists = await User.findOne({ email });
    
    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email already exists" });
    }

    // Create the user in the database
    const user = await User.create({
      name,
      email,
      password,
      role,
      
    });

    // Generate JWT token for the user
    const secretKey = process.env.JWT_SECRET;
    const tokenExpiration = process.env.JWT_LIFETIME;

    if (!secretKey || !tokenExpiration) {
      throw new Error("JWT secret key or token expiration is not configured.");
    }

    const token = jwt.sign(
      { 
        // userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );

    // Send email to the company owner with login credentials
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Registration Successful - Login Credentials',
      html: `<p>Hello ${name},</p>
             <p>Your registration as a company admin is successful.</p>
             <p>Please use the following credentials to log in:</p>
             <p>Email: ${email}</p>
             <p>Password: ${password}</p>
             <p>Thank you!</p>
             <p>Click <a href="https://eaz.letsgotnt.com">here</a> to login.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // Return success response with token and user details
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully registered",
      token,
      user
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const userId = req.userId
    console.log(userId)
    const {  amount, currency } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "User ID and amount are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: currency || "usd",
      payment_method_types: ["card"],
      metadata: { userId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const handleWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Set this in Stripe Dashboard

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "payment_intent.succeeded") {
//     const paymentIntent = event.data.object;
//     const userId = paymentIntent.metadata.userId;

//     if (userId) {
//       await User.findByIdAndUpdate(userId, { isActive: true });
//     }

//     console.log(`Payment succeeded for user ${userId}`);
//   }

//   res.json({ received: true });
// };


const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    // ✅ Stripe needs RAW body to verify signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(req.body)
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // 🛠 Ensure metadata contains userId
    if (!session.metadata || !session.metadata.userId) {
      console.error("❌ Metadata userId is missing!");
      return res.status(400).json({ message: "Missing userId in metadata" });
    }

    const userId = session.metadata.userId;

    try {
      await User.findByIdAndUpdate(userId, { isActive: true });
      console.log(`✅ User ${userId} activated.`);
    } catch (error) {
      console.error("❌ Failed to update user:", error);
    }
  }

  res.json({ received: true });
};



const createCheckoutSession = async (req, res) => {
  try {
    const { amountId, currency, redirectUrl } = req.body; // Get redirectUrl from body
    const userId = req.userId; // Ensure this is correctly set from authentication middleware

    if (!userId || !amountId || !redirectUrl) {
      return res.status(400).json({ message: "User ID, amount ID, and redirect URL are required" });
    }

    // Retrieve the amount from the database
    const paymentRecord = await Payment.findById(amountId);
    if (!paymentRecord) {
      return res.status(404).json({ message: "Invalid amount ID" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "usd",
            product_data: {
              name: paymentRecord.title, // Use title from the Payment schema
            },
            unit_amount: paymentRecord.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:4500/api/v1/auth/success-update?session_id={CHECKOUT_SESSION_ID}`, // Keep it fixed for backend processing
      cancel_url: `http://localhost:3000/payment-failed`,
      metadata: {
        userId,
        amountId, // Store the amount ID in metadata to use in successUpdate
        redirectUrl, // Store redirect URL in metadata
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




  
const successUpdate = async (req, res) => {
  console.log("✅ Payment Success Callback Triggered");
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || !session.metadata.userId || !session.metadata.amountId || !session.metadata.redirectUrl) {
      return res.status(400).json({ message: "Invalid session or missing required metadata" });
    }

    const userId = session.metadata.userId;
    const amountId = session.metadata.amountId;
    const redirectUrl = session.metadata.redirectUrl; // Retrieve redirect URL
    const amount = session.amount_total / 100; // Convert cents to dollars

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Activate user & update payment details
    user.isActive = true;
    user.paymentDate = new Date();
    user.expiryDate = new Date();
    user.expiryDate.setMonth(user.expiryDate.getMonth() + 1);
    await user.save();

    // ✅ Save the transaction record
    const newTransaction = new TransactionHistory({
      txnId: generateTransactionId(),
      txnType: "user_registration",
      userId: userId,
      amountId: amountId,
      amount: amount,
      status: "completed",
      txnMadeThrough: "Stripe",
    });

    await newTransaction.save();

    console.log(`✅ User ${userId} activated & Transaction recorded. Redirecting to: ${redirectUrl}`);

    // Redirect to the dynamic URL provided during checkout
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("❌ Error updating user & recording transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// ✅ Cron job to check expired users every midnight
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running subscription expiration check...");
  const currentDate = new Date();

  try {
    const expiredUsers = await User.find({ expiryDate: { $lt: currentDate }, isActive: true });

    for (const user of expiredUsers) {
      user.isActive = false;
      await user.save();
      console.log(`❌ User ${user._id} subscription expired.`);
    }
  } catch (error) {
    console.error("❌ Error checking expired users:", error);
  }
});




// Function to generate a random transaction ID
const generateTransactionId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


module.exports = {
  register,
  signin,
  logout,
  forgotPassword,
  ResetPassword,
  signinWithEmail,
  registercompanyowner,
  handleWebhook,
  createPaymentIntent,
  createCheckoutSession,
  successUpdate
  
};
