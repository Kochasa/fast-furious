const { Router } = require('express');
//Add user here
const User = require('../models/User.model');
const router = new Router();
//Add Bcrypt here
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
//get routes Here we will display the signup fors for users

router.get('/signup', (req,res) => res.render('auth/signup'));
//post routes
router.post('/signup',(req,res,next) =>{
  const { username, email, password } = req.body;

  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password,salt))
  .then(hashedPassword => {
    return User.create({
      username,
      email,
      passwordHash:hashedPassword
    });
  })
  .then(userFromDB => {
    console.log('Newly created user is: ', userFromDB);
  })
  .catch(error => next(error));
});

module.exports = router;