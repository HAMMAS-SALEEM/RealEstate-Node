import estateController from '../controllers/estate.controller.js'
import authJwt from '../middlewares/authJwt.js'

export default app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.get('/api/estates', estateController.getAllEstates)
  app.get('/api/myestates', authJwt.verifyToken, estateController.getEstatebyUserId)
  app.post('/api/estate/create', authJwt.verifyToken, estateController.createEstate)
  app.get('/api/estate', estateController.getEstateById)
  app.put('/api/estate', authJwt.verifyToken, estateController.updateEstate)
  app.delete('/api/estate', authJwt.verifyToken, estateController.deleteEstate)
}
