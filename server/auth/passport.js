require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../db/models").User;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({
        where: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      })
        .then((user) => {
          return done(null, {
            id: user[0].id,
            email: user[0].email,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePic: profile.photos[0].value,
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
