import{ assert } from 'chai';
import { userController } from './controllers/userController.mjs'; 
import { MongoMemoryServer } from 'mongodb-memory-server'; 
import userDao from './dao/userDAO.mjs'; 
import { User } from './model/User.mjs' 

describe('userController Tests', function(){
    describe('Tests de addUser()', function(){
        it('CT1( DT1 ( User(pas dans la base de données)), UserObject, nouveau User dans la base de données )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user1.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            const new_user = await userController.addUser(user1)
            assert.isNotNull(userDao.findUserFromEmail('user1.com'))
            assert.equal(new_user.email,"user1.com")
            assert.equal(new_user.password,"password123")
            assert.equal(new_user.remainingSearchNews,5)
            assert.equal(new_user.remainingSearchPlace,3)
            await mongodb.stop()
        })
        it('CT2( DT2 ( User(déjà dans la base de données)), Promise.reject : “duplicate name” )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            const user2 = new User({
                email: 'user.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            try {
                const new_user = await userController.addUser(user2)
                assert.fail('Une erreur est attendue');
            } catch (error) {
                assert.equal(typeof error, "string")
                assert.equal(error, 'duplicate name');
            }
            await mongodb.stop()
        })
    });
    describe('Tests de findUserFromEmail()', function(){
        it('CT1( DT1 ( email (dans la base de données)), UserObject )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            const find_user = await userController.findUserFromEmail("user.com")
            assert.equal(find_user.email,"user.com")
            assert.equal(find_user.password,"password123")
            assert.equal(find_user.remainingSearchNews,5)
            assert.equal(find_user.remainingSearchPlace,3)
            await mongodb.stop()
        })
        it('CT2( DT2 ( email (pas dans la base de données)), null )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const find_user = await userController.findUserFromEmail("user.com")
            assert.isNull(find_user)
            await mongodb.stop()
        })
    });
    describe('Tests de getAllUsers()', function(){
        it('CT1( DT1 ( ), Array of UserObjects )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user1.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            const user2 = new User({
                email: 'user2.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            await userController.addUser(user2)
            const users = await userController.getAllUsers()
            assert.isArray(users)
            assert.isObject(users[0])
            assert.equal(users[0].email, user1.email)
            assert.equal(users[1].email, user2.email)
            await mongodb.stop()
        })
    });
    describe('Tests de deleteByEmail()', function(){
        it('CT1( DT1 ( email ), user plus dans la base de données )', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            const find_user1 = await userController.findUserFromEmail("user.com")
            assert.isNotNull(find_user1)
            userController.deleteByEmail("user.com")
            const find_user2 = await userController.findUserFromEmail("user.com")
            assert.isNull(find_user2)
            await mongodb.stop()
        })
    });
    describe('Tests de deleteUsers()', function(){
        it('CT1( DT1 ( ), plus d’users dans la base de données)', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user1.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            const user2 = new User({
                email: 'user2.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            await userController.addUser(user2)
            const find_users1 = await userController.getAllUsers()
            assert.isNotNull(find_users1)
            userController.deleteUsers()
            const find_users2 = await userController.getAllUsers()
            assert.isEmpty(find_users2)
            console.log(find_users2)
            await mongodb.stop()
        })
    });
    describe('Tests de updateUser()', function(){
        it('CT1( DT1 ( email (d’user dans la base de données), args={}), UserObject)', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user1.com',
                password: 'password123',
                remainingSearchNews: 5,
                remainingSearchPlace: 3,
                savedArticles: []
            })
            await userController.addUser(user1)
            const changes = await userController.updateUser("user1.com", {password : "mdptest", remainingSearchNews : 1, remainingSearchPlace : 2, savedArticles :[ "test1", "test2"] })
            assert.equal(changes.email, user1.email)
            assert.equal(changes.password, "mdptest")
            assert.equal(changes.remainingSearchNews, 1)
            assert.equal(changes.remainingSearchPlace, 2)
            assert.equal(changes.savedArticles[0], "test1")
            assert.equal(changes.savedArticles[1], "test2")
            await mongodb.stop()
        })
        it('CT2( DT2 ( email (d’user pas dans la base de données), args={}), “utilisateur inconnu”)', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            try {
                await userController.updateUser("user1.com",{})
                assert.fail('Une erreur est attendue');
            } catch (error) {
                assert.equal(error, 'utilisateur inconnu');
            }
            await mongodb.stop()
        });
    });
    describe('Tests de resetLimitSearchRequest()', function(){
        it('CT1( DT1 (5, 8), remainingSearchNews = 5 et remainingSearchPlace = 8)', async function(){
            const mongodb = await MongoMemoryServer.create();
            const uri = mongodb.getUri()
            userDao.uri = uri
            const user1 = new User({
                email: 'user1.com',
                password: 'password123',
                remainingSearchNews: 10,
                remainingSearchPlace: 10,
            })
            await userController.addUser(user1)
            await userController.resetLimitSearchRequest(5, 8)
            const updated = await userController.findUserFromEmail('user1.com')
            assert.equal(updated.remainingSearchNews, 5)
            assert.equal(updated.remainingSearchPlace, 8)
            await mongodb.stop()
        })
    });
})    