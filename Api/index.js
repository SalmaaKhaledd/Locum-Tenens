import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
// Responsible for starting the server and connecting to the database.


dotenv.config();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
connectDB(); // Connect to MongoDB 
