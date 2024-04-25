import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user.routes.js';
import { clientRouter } from './routes/client.routes.js';
import { processRouter } from './routes/process.routes.js';
import { taskRouter } from './routes/task.routes.js';
// import { logsRouter } from './routes/today_activity_log.routes.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/processes", processRouter);
app.use("/api/v1/tasks", taskRouter);
// app.use("/api/v1/logs", logsRouter);

export default app;