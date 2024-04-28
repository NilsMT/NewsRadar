import { userController } from "./controllers/userController.mjs";
import { User } from "./model/User.mjs";
import { Article } from "./model/Article.mjs";


await userController.deleteUsers()


const user1 = new User({ email : "test1@gmail", password : "test2"})
const user2 = new User({ email : "test2@gmail", password : "test2"})
const user3 = new User({ email : "test3@gmail", password : "test2"})
const user4 = new User({ email : "test4@gmail", password : "test2"})
const user5 = new User({ email : "test5@gmail", password : "test2"})
const user6 = new User({ email : "test6@gmail", password : "test2"})
const user7 = new User({ email : "test7@gmail", password : "test2"})
const user8 = new User({ email : "test8@gmail", password : "test2"})
const user9 = new User({ email : "test9@gmail", password : "test2"})
const user10 = new User({ email : "test10@gmail", password : "test2"})

await userController.addUser(user1)
await userController.addUser(user2)
await userController.addUser(user3)
await userController.addUser(user4)
await userController.addUser(user5)

user1.savedArticles.push(new Article({ id_new : 5, title : "test", description : "Bonjour"}))
await userController.updateUser(user1.email, { savedArticles : user1.savedArticles})
console.log(await userController.getAllUsers())