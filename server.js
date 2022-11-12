const express = require("express");
const dotenv = require("dotenv").config();
const cors=require("cors")

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();
// used to data  from body we need following middlewares 2 
app.use(cors())

app.use(cors({
    origin: ["http://localhost:3000"],
        credentials: true,
}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));