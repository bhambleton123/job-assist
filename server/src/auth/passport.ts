import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Board } from "../models/board/board";
import { IUser } from "../models/user/user.interface";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile: any, done) => {
      const count = await Board.countDocuments({ userId: profile.id });

      if (count === 0) {
        const board = new Board({ title: "Default", userId: profile.id });
        await board.save();
      }

      return done(null, {
        id: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePic: profile.photos[0].value,
      } as IUser);
    }
  )
);

passport.serializeUser((user: IUser, done) => done(null, user));
passport.deserializeUser((user: IUser, done) => done(null, user));

export default passport;
