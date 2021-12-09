import { Schema, model, Document, SchemaTypes } from "mongoose";

const ExamSchema = new Schema({
    title: String,
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    questions: [{
        type: SchemaTypes.ObjectId,
        ref: "Question"
    }],
    testers: [{
        type: SchemaTypes.ObjectId,
        ref: "User"
    }]
}, {
    versionKey: false,
    timestamps: true
})