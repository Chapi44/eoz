const express = require("express");
const router = express.Router();
const multer= require("multer");
const path = require ('path')
const {
  register,
  signin,
logout,
forgotPassword,
ResetPassword,
signinWithEmail,
registercompanyowner,
createPaymentIntent,
handleWebhook,
createCheckoutSession,
successUpdate,
registertenant
} = require("../controller/authController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profilepic/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const { authMiddleware } = require("../middelware/authMiddleware");



router.post("/register", authMiddleware, register);
router.post("/registertenant", registertenant);


router.post("/login", signin);
router.post("/signin", signinWithEmail);
router.post("/registerasacompanyowner", registercompanyowner);


router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", ResetPassword);
router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.get("/webhook", express.raw({ type: "application/json" }), handleWebhook);
router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.get("/success-update", successUpdate);
module.exports = router;
