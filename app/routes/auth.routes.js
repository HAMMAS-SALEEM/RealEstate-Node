import verifySignUp from "../middlewares/verifySignup.js";
import authController from '../controllers/auth.controller.js'

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  })
  app.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, authController.signup);
  app.post("/login", authController.signin);
}