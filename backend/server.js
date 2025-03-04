import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./database/connection.js";
import router from "./router/route.js";
import fetch from 'node-fetch';
import swaggerDocs from "./docs/swagger.js";  


// Set up global .env access
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || "8080";

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*", // allow all origins for testing
    }),
);

// app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Route API
app.use("/api", router);

swaggerDocs(app);

app.get("/", (req, res) => {
    res.status(201).json("HOME GET REQUEST");
}); 

// Start server only when we have valid connection
connect()
    .then(() => {
        try {
            app.listen(PORT, async () => {
                console.log(`Server is listening on http://localhost:${PORT}`);

                // 🔹 Call the archive API automatically after the server starts
                try {
                    const response = await fetch(`http://localhost:${PORT}/api/archivePastCampaigns`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await response.json();
                    console.log("Archive API Response:", data);
                } catch (error) {
                    console.error("Error calling archivePastCampaigns API:", error);
                }
            });
        } catch (error) {
            console.error("Cannot start the server...!", error);
        }
    })
    .catch((error) => {
        console.error("Invalid database connection...!", error);
    });