import http from "http";
import express from "express";
import prisma from "./prisma/index.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(router);

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
  }
};

start();
