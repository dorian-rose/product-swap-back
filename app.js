const express = require("express")
const cors = require("cors");
const app = express();

//dotenv to access .env
require("dotenv").config();

const port = process.env.PORT || 3000

app.use(cors());

//to parse JSON and URLENCODED req.bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//set ejs folders virtually in public
app.use(express.static(__dirname + "/public"));

//configure routers
app.use("/entries", require("./routers/entriesRouters"))
app.use("/users", require("./routers/userRouters"))
app.use("/mail", require("./routers/mailRouters"))

//let app to listen to port 
app.listen(port, () => {
    console.log(`App listening to ${port}`)
})