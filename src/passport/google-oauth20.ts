import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/User";

const GoogleStrategy = Strategy;

passport.serializeUser(async (user: any, done: any) => {
    done(null, user._id)
})

passport.deserializeUser(async(user: any, done: any) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID as string,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL:process.env.CALLBACK_URL,
    passReqToCallback: false
}, async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    const validateUser = await User.findOne({ email: profile.emails[0].value })
    if(validateUser) {
        validateUser.profilePic = profile.photos[0].value
        await validateUser.save()
        return done(null, validateUser._id)
    } {
        const newUser = new User();
        newUser.email = profile.emails[0].value
        newUser.username = profile.displayName
        newUser.profilePic = profile.photos[0].value
        newUser.budget = 0
        await newUser.save()
        console.log(newUser)
        return done(null, newUser._id)
    }
}));