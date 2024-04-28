import {AGENT, APP, PORT, ROOT} from './const.mjs'
import routerData from './newsdataRouter.mjs'

APP.get("/", (req, res) => {
    res.send('Hello World!')
})

APP.use('/newsAPI/', routerData)

APP.listen(PORT, () => {
    console.log(`newsAPI listening on port ${PORT}`)
})