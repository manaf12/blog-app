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
  'IK_PRIVATE_KEY',
  'CLERK_WEBHOOK_SECRET',

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
    origin: (origin, callback) => {
      console.log("Incoming origin:", origin);
      if (!origin) 
        {
          console.log("Empty Origin")
          return callback(null, true);
        }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "svix-id",        
      "svix-timestamp", 
      "svix-signature",
      "Clerk-Auth",
      "X-Requested-With",
      "Origin" 
    ],
    credentials: true,
    maxAge: 86400,
  })
);
app.options("*", cors());



app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  });
});

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

