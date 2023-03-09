const express = require("express")
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { traceDeprecation } = require("process");

router.post("/register", async(req, res) => {
  
    const {name , email , password} = req.body

    const newUser = new User({name , email , password})

   try {
         newUser.save()

         return res.send('User Registered successfully')

    } catch (error) {
         return res.status(400).json({ message: error });
    }

});
/*try{
    var emailExist= await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).json( {message:"email already exsit"})
    }
    //password hashing is here to encript the password 
    var hash= await bcrypt.hash(req.body.password,10)
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    })
    var data= await user.save();
    res.json({message:"Registered successfully"},data);

}
catch(err){
 res.status(400).json(err)
}
 res.json(user)
});*/
router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});


router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});
module.exports = router