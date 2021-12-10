import { Schema, model, Document, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    exams: [{
        type: SchemaTypes.ObjectId,
        ref: "Exam"
    }],
    username: SchemaTypes.String,
    profilePic: SchemaTypes.String
}, {
    versionKey: false, 
    timestamps: true
});

export default model("User", UserSchema)