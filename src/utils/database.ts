import mongoose from "mongoose";

export const connect_to_db = () => {
    mongoose
        .connect(db_url(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex : true,
            autoIndex: true,
            useFindAndModify : false
        })
        .then(() => {
            console.log("Connected to DB...");
        })
        .catch(err => {
            console.error("Cannot connect to the database!", err);
            // process.exit();
        });
}

export const db_url = () : string => {
    const {
        DB_USER,
        DB_PASSWORD,
        // DB_HOST,
        // DB_PORT,
        DB_NAME,
    } = process.env;
    return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.cgan3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
}
