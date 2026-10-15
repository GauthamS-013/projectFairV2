const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const users = require("../Models/userModel");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("GitHub profile:", profile);

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
            profile.displayName ||
            profile.username ||
            "GitHub User",

          email,

          password: null,

          authProvider: "github",

          providerId: profile.id,

          github: profile.profileUrl || "",

          linkdin: "",

          profile: profile.photos?.[0]?.value || "",
        });

        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;