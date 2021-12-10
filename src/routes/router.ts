import { Router } from "express";
import Exam from "../models/Exam";
import Question from "../models/Question";
import User from "../models/User";

const router = Router();

router.route("/")
    .get((req, res) => res.json({message: "XD"}))

router.route("/exam")
    .get(async ({query}, res) => {
        const exams = await Exam.find(query);
        res.json(exams);
    })
    .post(async ({body}, res) => {
        const newExam = new Exam(body);
        newExam.questions = [];
        for(let question of body.questions){
            const newQuestion = new Question(question);
            await newQuestion.save();
            newExam.questions.push(newQuestion._id);
        }
        await newExam.save();
        res.json(newExam);
    })
    .delete(async ({query}, res) => {
        await Exam.findByIdAndDelete(query.id as string)
        res.json("borrado");
    })

router.route("/profile/:id")
    .get(async ({params}, res) => {
        const user = await User.findById(params.id);
        res.json(user);
    })

export default router;