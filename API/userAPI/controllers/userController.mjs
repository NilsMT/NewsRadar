"use strict"

import userDao from '../dao/userDAO.mjs'

export const userController = {
    getAllUsers : async () => userDao.getAllUsers(),
    findUserFromEmail : async (email) => userDao.findUserFromEmail(email),
    deleteUsers : async () => userDao.deleteUsers(),
    deleteByEmail : async (email) => userDao.deleteByEmail(email),
    addUser : async (user) => userDao.addUser(user),
    updateUser : async (email, args = { password : null, remainingSearchNews : null,remainingSearchPlace : null, savedArticles : null}) => userDao.updateUser(email, args),
    resetLimitSearchRequest: async ( limitNews, limitPlaces ) => userDao.resetLimitSearchRequest(limitNews, limitPlaces),
}