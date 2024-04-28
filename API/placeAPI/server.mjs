import {AGENT, APP, PORT, ROOT} from './const.mjs'
import routerData from './opencageRouter.mjs'

APP.get("/", (req, res) => {
    res.send('Hello World!')
})

APP.use('/placeAPI/', routerData)

APP.listen(PORT, () => {
    console.log(`placeAPI listening on port ${PORT}`)
})