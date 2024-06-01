import estateController from '../controllers/estate.controller'

export default app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.get('/api/estates', estateController.getAllEstates)
  app.post('/api/estates', estateController.createEstate)
  app.get('/api/estates/:id', estateController.getEstateById)
  app.put('/api/estates/:id', estateController.updateEstate)
  app.delete('/api/estates/:id', estateController.deleteEstate)
  app.get('/api/estates/search/price', estateController.searchEstateByPrice)
  app.get(
    '/api/estates/search/location',
    estateController.searchEstateByLocation
  )
  app.get('/api/estates/search/type', estateController.searchEstateByType)
}
