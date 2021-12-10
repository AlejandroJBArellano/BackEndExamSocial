import { Router } from "express";
import passport from "passport";
import Exam from "../models/Exam";
import Question from "../models/Question";
import User from "../models/User";

const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()){
        return next();
    } res.redirect("/google")
};

const router = Router();

// SESSIONS ROUTES

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "/profile",
    failureRedirect: '/home',
    passReqToCallback: true 
}),
    (req, res) => {
        return res.redirect('/home');
    }
);

router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/")
    next();
})

// API ROUTES

router.get("/", (req, res) => {
        console.log(req.user)
        res.json(req.user)
    })

router.route("/exam")
    .get(isAuthenticated, async ({query}, res) => {
        const exams = await Exam.find(query);
        res.json(exams);
    })
    .post(isAuthenticated, async ({body, user}, res) => {
        const newExam = new Exam(body);
        newExam.questions = [];
        newExam.author = await User.findById(user as Express.User);
        for(let question of body.questions){
            const newQuestion = new Question(question);
            console.log(newQuestion)
            await newQuestion.save();
            newExam.questions.push(newQuestion._id);
        }
        await newExam.save();
        res.json(newExam);
    })
    .delete(isAuthenticated, async ({query}, res) => {
        await Exam.findByIdAndDelete(query.id as string)
        res.json("borrado");
    })

router.route("/profile")
    .get(isAuthenticated, async ({user}, res) => {
        const userGoogle = await User.findById(user);
        res.json(userGoogle);
    })

export default router;