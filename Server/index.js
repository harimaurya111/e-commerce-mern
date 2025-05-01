const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connectDb = require("./config/db.js");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const userRoute = require("./routes/userRoute.js")
const productRoute = require("./routes/productRoute.js")


//middleware setup
app.use(express.json({limit:"25mb"}))
app.use(express.urlencoded({limit:"25mb"}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit:"25mb"}))
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["GET","POST","DELETE","PUT","PATCH"]
}))

app.get("/", (req, res) => {
  res.send("Hello Deepak");
});

app.use("/api/auth",userRoute)
app.use("/api/products",productRoute)


connectDb().then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
})


