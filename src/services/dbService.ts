import { connect } from "mongoose";

export const initDb = async () => {
    await connect(process.env.MONGO_URI as string);
}