import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/userRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';


dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const app = express()

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Carbon Cell Api Documents',
        version: '1.0.0',
        description: 'API documentation for Carbon Cell Assignment',
      },
      servers: [
        {
            url: process.env.SERVER_URL
        }
      ]
    },
    apis: ['src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

//Api Routes
app.use("/api", router)

app.listen(4000)