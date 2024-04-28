import { APP, PORT } from "../externalAPI/const.mjs"
import routerExtern from "./externalRouter.mjs"

APP.get("/", (req, res) => {
    res.send('Hello World!')
})

APP.use('/externalAPI/', routerExtern)

APP.listen(PORT, () => {
    console.log(`ExternalAPI listening on port ${PORT}`)
})