import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(process.env.DB).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        throw err;
    })
}
export default connect;