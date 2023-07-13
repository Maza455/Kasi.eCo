const db = require("../models")
const User = db.user


// CREATE 1 USER
exports.create = async (req, res)=>{
    if(!req.body){
            res.status(400).send("Cannot add without info")
            return;   
    }
    // let results;

    // await fetch('https://randomuser.me/api/')
    //         .then(res=>res.json())
    //         .then(data=>{
    //         console.log(results=data.results[0].email)})

    const user = new User ({
           fname: req.body.fname,
           email: req.body.email,
           password: req.body.password
    })
   
    try{
        user.save()
        .then(user=>{

            console.log(user)
            res.send(user)  
        })
        return
    }catch (err){
        res.status(500).send('Could not create new user')
        console.log(`Some err occured : ${err.message}`)
    }
}     

// GET A USER
exports.getOne = (req, res)=>{
    
    const id = req.params.id
  
    User.findById(id, { useFindAndModify: false})
           .then(data=>{
            res.send(data)
            console.log(data) })
            .catch((error) => {
             res.status(500).send("Could not find user", error);
             console.log("Could not find user", error);
          });
  }
  

// GET ALL USERS 
exports.getAll = (req, res)=>{


       User.find()
           .then(data=>{
               res.send(data)
               console.log(data)
           })
           .catch(error=>{
            res.status(500).send("Could not find user", error)
            console.log("Could not find user", error)
           })
}


// UPDATE A USER
exports.update = (req, res)=>{
    if(!req.body){
        res.status(400).send("Cannot update user")
        return
    }
    const id = req.params.id

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data =>{
        if(!data) {
           res.status(404).send({
             msg: `Cannot update User with id=${id}. Maybe it was not found`
           })
        } else res.status(201).send({ msg: "User was updated successfully"})
    })
    .catch(err => {
        res.status(500).send({ msg: `Error updating User with id=${id} ${err}`})
    })
}


// DELETE A USER
exports.deleteOne = (req, res)=>{
    
    const id = req.params.id

    User.findByIdAndRemove(id, { useFindAndModify: false})
        .then(data =>{
            if(!data) {
               res.status(404).send({
                msg: `Cannot delete User with id=${id}. Maybe it was not exit/existing`
               })
            } else res.status(201).send({ msg: "User was deleted successfully"})
        })
        .catch(err => {
            res.status(500).send({ msg: `Error deleting User with id=${id}, Error:  ${err}`})
        })
}


// CLEAR ALL
exports.deleteAll = (req, res)=>{

    User.deleteMany()
        .then(data=>{
            res.send(data)
            console.log(data)
        })
        .catch(error=>{
            res.status(500).send("Could not delete all users ", error)
            console.log("Could not delete all", error)
        })
}

