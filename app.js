require("express-async-errors");

const cors = require("cors");
const express = require("express");

const { app, server } = require("./socket/socket.js");

const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});



const morgan = require("morgan");
const cookieParser = require("cookie-parser");



const connectDB = require("./db/connect.js");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userroutes.js");
const chatRoutes = require("./routes/chatRoutes");
const notificationsRoutes = require("./routes/notificationRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const patientRoutes = require('./routes/patientRoutes');
const taskRoutes = require('./routes/taskRoutes');
const oasisAssessment = require('./routes/oasisRoutes')
const nurseshiftRoutes = require('./routes/nurseshiftRoutes.js')
const therapistsRoutes = require('./routes/therapyVisitRoutes.js')
const mswRoutes = require('./routes/mswVisitRoutes.js')
const healthMetricRoutes = require('./routes/healthMetricsRoutes.js')
const pocRoutes = require('./routes/planOfCareRoutes.js')
const hrRoutes = require('./routes/hrRoutes.js')
const contactUs = require("./routes/contactusRoutes.js")
const cronJob = require("./config/cron.js");
const caremanagementRoutes = require('./routes/caremanagementRoutes.js')
const endocrineRoutes = require("./routes/endocrineRoutes.js")
const functionalAbilitiesGoalsRoutes = require('./routes/functionalAbilitiesGoalsRoutes.js')  
const aidRoutes = require("./routes/aidecareRoutes.js")
const communicationNoteRoutes = require("./routes/commRoutes.js") 
const doctororderRoutes = require("./routes/doctorRoutes")
const infectionreportRoutes = require("./routes/infectionRoutes.js")
const LPNSupervisoryRoutes = require("./routes/lpnsupervisorsRoutes.js")
const ottelehealthAssessmentRoutes = require("./routes/ottelehealthRoutes.js")
const prnnursingRoutes = require("./routes/prnnursingRoutes.js")
const speechtherapyvisitorRoutes = require("./routes/speechtherapyRoutes.js")
const nursepschatristRoutes = require("./routes/nursepsychatristRoutes.js")
const BillingClaim = require("./routes/billingClaimRoutes.js")
// Middleware
const notFoundMiddleware = require("./middelware/not-found.js");
const errorHandlerMiddleware = require("./middelware/error-handler.js");
const amountRoutes = require("./routes/amountRoutes")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.JWT_SECRET));

cronJob();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/notifications", notificationsRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/oasis', oasisAssessment);
// app.use('/api/v1/nurseshift', nurseshiftRoutes)
app.use('/api/v1/therapy',therapistsRoutes)
app.use('/api/v1/msw', mswRoutes)
app.use('/api/v1/health', healthMetricRoutes)
app.use('/api/v1/poc', pocRoutes)
app.use('/api/v1/humanresource', hrRoutes)
app.use('/api/v1/contact',contactUs);
app.use('/api/v1/care', caremanagementRoutes )
app.use('/api/v1/endo', endocrineRoutes)
app.use('/api/v1/funability', functionalAbilitiesGoalsRoutes)
app.use('/api/v1/aide', aidRoutes)
app.use('/api/v1/comm', communicationNoteRoutes)
app.use('/api/v1/doctor', doctororderRoutes)
app.use('/api/v1/infection', infectionreportRoutes)
app.use('/api/v1/lpn', LPNSupervisoryRoutes)
app.use('/api/v1/ottele', ottelehealthAssessmentRoutes)
app.use('/api/v1/prn', prnnursingRoutes)
app.use('/api/v1/speech', speechtherapyvisitorRoutes)
app.use('/api/v1/nursepsy', nursepschatristRoutes)
app.use("/api/v1/amount", amountRoutes)
app.use("/api/v1/billing", BillingClaim)




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};


start();
