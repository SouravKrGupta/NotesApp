const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const UserRouter = require("./routes/userRouter");
const NoteRouter = require("./routes/noteRouter");


//mongodb connection
connectDB();
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/users", UserRouter);
app.use("/api/notes", NoteRouter);


// app.get('/',(req,res) =>{
//     res.json("Hello Everyone,This Notes Application")
// })

//Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
