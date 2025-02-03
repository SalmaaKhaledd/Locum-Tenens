
const app= require('./app');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


connectDB(); // Connect to MongoDB 