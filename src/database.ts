import mongoose from "mongoose";
import keys from "./keys";

mongoose.connect(keys.uri as string)
    .then(e => console.log(`Database is connected`))
    .catch(e => console.log({error: "error", e}))