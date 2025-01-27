import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import 'dotenv/config'

const requiredEnvVars = [
  'MONGO',
  'CLERK_SECRET_KEY',
  'CLIENT_URL',
  'IK_URL_ENDPOINT',
  'IK_PUBLIC_KEY',
  'IK_PRIVATE_KEY'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});
const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL, 
  "http://localhost:5173",
  "https://blog-app-manafs-projects-7a962bb5.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Clerk-Auth",
      "X-Requested-With",
      "Origin" 
    ],
    credentials: true,
    maxAge: 86400,
  })
);
app.use(express.json());
// app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000,"0.0.0.0", () => {
  connectDB();
  console.log("Server is running!");
});

