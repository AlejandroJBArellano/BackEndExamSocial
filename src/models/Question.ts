import { Schema, model, Document, SchemaTypes } from "mongoose";

const AnswerSchema = new Schema({
    answer: String,
    correct: SchemaTypes.Boolean
}, {
    timestamps: false,
    versionKey: false,
    _id: false
})

const QuestionSchema = new Schema({
    question: String,
    answers: [AnswerSchema]
}, {
    timestamps: false,
    versionKey: false
})

export default model("Question", QuestionSchema)