import { connect } from "mongoose"
import env from "dotenv"

env.config()

const dbConnect = async() => {
    try {
        const {connection} = await connect(process.env.MONGO_DB, {
            dbName: "divine_db"
        })
        const db = connection.db.databaseName
        console.log("connected:", db)
    } catch (error) {
        
    }
}
export default dbConnect
