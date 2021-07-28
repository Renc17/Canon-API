const express = require('express')
const userController = require('../Controllers/users')

const router = express.Router()

// ROUTES
router.route('/users')
    .delete(userController.DeleteAll)
    .get(userController.GetALL)

router.route('/users/:id')
    .get(userController.GetById)
    .delete(userController.DeleteById)
    .patch(userController.UpdateById)

router.post('/login', userController.Login)
router.post('/register', userController.Register)

module.exports = router;
