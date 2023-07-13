module.exports = userBridge => {
    const router = require("express").Router();
    const controller = require("../controller/user.controller")

  // User endpoints

    router.post('/signup', controller.create); // ADD USER

    router.get('/get-all-users', controller.getAll); // GET ALL USERS

    router.get('/:id', controller.getOne); // GET 1 USER

    router.put('/:id', controller.update)// UPDATE 1 USER

    router.delete('/delete-all', controller.deleteAll); // DELETE ALL USERS

    router.delete('/:id', controller.deleteOne); // DELETE 1 USERS
  
  userBridge.use('/v1/users',router)  
}