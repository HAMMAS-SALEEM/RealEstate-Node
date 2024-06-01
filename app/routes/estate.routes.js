import estateController from '../controllers/estate.controller.js'

export default app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.get('/api/estates', estateController.getAllEstates)
  app.post('/api/estate/create', estateController.createEstate)
  app.get('/api/estate', estateController.getEstateById)
  app.put('/api/estate/:id', estateController.updateEstate)
  app.delete('/api/estate', estateController.deleteEstate)
}
