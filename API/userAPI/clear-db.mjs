import { userController } from "./controllers/userController.mjs";

await userController.deleteUsers()

console.log("Base de données vidée")