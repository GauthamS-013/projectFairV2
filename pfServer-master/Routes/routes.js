const express = require("express");
const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const jwt = require("../Middlewares/jwtMiddleware");
const multer = require("../Middlewares/multerConfigMiddleware");
const passport = require("../Config/googleStrategy");

const router = express.Router();

router.post("/reg", userController.userRegister);
router.post("/login", userController.userLogin);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  userController.googleLogin,
);

router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  userController.githubLogin
);
router.put(
  "/updateprofile",
  jwt,
  multer.single("profile"),
  userController.profileUpdate,
);

router.post(
  "/addproject",
  jwt,
  multer.single("image"),
  projectController.addProject,
);
router.get("/userproject", jwt, projectController.getUserProjects);
router.get("/allproject", jwt, projectController.getAllProjects);
router.get("/project-technologies", jwt, projectController.getProjectTechnologies);
router.delete("/deleteproject/:id", jwt, projectController.deleteProject);
router.put(
  "/editproject/:id",
  jwt,
  multer.single("image"),
  projectController.updateProject,
);
router.get("/randomprojects", projectController.randomProjects);

module.exports = router;
