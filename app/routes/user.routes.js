import authJwt from '../middlewares/authJwt.js'
import userController from '../controllers/user.controller.js'

export default app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/all', userController.getAllController);
  app.get('/api/user', authJwt.verifyToken, userController.getUserController);
}
