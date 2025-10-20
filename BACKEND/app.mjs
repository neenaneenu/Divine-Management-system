import express from "express"
import env from "dotenv"
import cors from "cors"
import dbConnect from "./config/db.config.mjs"
import userRoute from "./routes/user.route.mjs"
import applicationRoutes from "./routes/applcation.route.mjs"
import  billRoutes from "./routes/bill.route.mjs"
import saveroute from "./routes/saved.route.mjs"


env.config() 

await dbConnect()

const app = express()

app.use(express.json())

app.use(cors())


app.use("/api/users", userRoute)
app.use("/uploads", express.static("uploads"));
app.use("/application", applicationRoutes);
app.use("/bills", billRoutes);
app.use("/saved", saveroute);



app.listen(process.env.PORT || 3000, err => {
    if (err) {
        return process.exit(1)
    }
    console.log("Port running on 3000...")

})

