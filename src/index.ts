import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connection from "./db";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import handleSocketIO from "./sockets/socketHandler";

const app: Express = express();
const PORT = process.env.PORT || 4001;

// middlewares
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
connection();

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

// start server
const server = app.listen(PORT, () => {
  console.log("server running on http://localhost:" + PORT);
});

// Handle Socket.io
handleSocketIO(server);
