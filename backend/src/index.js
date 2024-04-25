import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import app from './app.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT;

connectDB()
    .then((connectionInstance) => {
        app.listen(PORT, () => {
            console.log(`Taskify Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Taskify Server unable to start!");
        console.log(error);
    });