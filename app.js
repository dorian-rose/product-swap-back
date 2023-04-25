const express = require("express")
const app = express();

//dotenv to access .env
require("dotenv").config();

const port = process.env.PORT || 3000

//to parse JSON and URLENCODED req.bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//configure routers
app.use("/entries", require("./routers/entriesRouters"))
//app.use("/users", require("./routers/userRouters"))

//let app to listen to port 
app.listen(port, () => {
    console.log(`App listening to ${port}`)
})