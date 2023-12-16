//variables || import || require
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const cors = require("cors");

app.use(
    cors({
        origin: process.env.V_CLIENT,
        methods: ["GET", "POST"],
    })
);

const port = process.env.PORT || 9000;

mongoose
    .connect(`mongodb+srv://${process.env.V_DB}@database.4wfi2ky.mongodb.net/booking`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MONGO DB Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
const routesUser = require("./routes/user");
app.use("/user", routesUser);

const routesWeather = require("./routes/weather");
app.use("/api", routesWeather);

//END ROUTES

app.get("/", (req, res) => {
    res.send("<style>body { background-color:rgb(10,40,10)}</style>");
});

server.listen(port);
