const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const users = require("../Models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false);
        }

        let existingUser = await users.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await users.create({
          username:
            profile.displayName || profile.name?.givenName || "Google User",

          email,

          password: null,

          authProvider: "google",

          providerId: profile.id,

          github: "",

          linkdin: "",

          profile: profile.photos?.[0]?.value || "",
        });

        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    },
  ),
);

module.exports = passport;
